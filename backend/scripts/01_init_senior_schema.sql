-- SUMBANDILA SENIOR DATABASE SCHEMA
-- Version: 1.0.0
-- Description: Strict relational schema with RBAC, Audit Logging, and Indexing.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- For UUID generation
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- For Fuzzy Search (Trigrams)

-- 2. ENUMS & TYPES
CREATE TYPE user_role AS ENUM ('super_admin', 'government_admin', 'issuer', 'auditor', 'public_user');
CREATE TYPE entity_status AS ENUM ('pending', 'verified', 'suspended', 'deregistered');
CREATE TYPE verification_channel AS ENUM ('mobile_app', 'web_portal', 'api', 'admin_panel');

-- 3. UTILITY FUNCTIONS
-- Function to auto-update 'updated_at' column
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. IDENTITY & ACCESS MANAGEMENT (IAM)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Argon2 hash
    full_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'public_user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER  update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- 5. REGISTRY CORE (Institutions)
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL, -- e.g., 2005/HE07/001
    type VARCHAR(50) NOT NULL, -- University, Private College, etc.
    registering_authority VARCHAR(100) NOT NULL, -- DHET, QCTO
    status entity_status NOT NULL DEFAULT 'pending',
    
    -- Contact / Location
    website VARCHAR(255),
    contact_email VARCHAR(255),
    address TEXT,
    
    -- Metadata
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id), -- Audit link
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigram Index for Fuzzy Search on Name (Fast "Did you mean?" search)
CREATE INDEX idx_inst_name_trgm ON institutions USING GIN (name gin_trgm_ops);
CREATE INDEX idx_inst_reg_num ON institutions(registration_number);

-- 6. PROFESSIONALS REGISTRY (Doctors, Lawyers)
CREATE TABLE professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL, -- MP Number, etc.
    profession VARCHAR(100) NOT NULL, -- Medical Practitioner, Advocate
    council VARCHAR(100) NOT NULL, -- HPCSA, LPC
    status entity_status NOT NULL DEFAULT 'pending',
    
    specialty VARCHAR(150),
    practice_number VARCHAR(100),
    
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prof_name_trgm ON professionals USING GIN (full_name gin_trgm_ops);
CREATE INDEX idx_prof_reg_num ON professionals(registration_number);

-- 7. DIGITAL CERTIFICATES (The "Asset")
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Links
    institution_id UUID REFERENCES institutions(id) ON DELETE RESTRICT,
    student_identity_number VARCHAR(50) NOT NULL, -- SA ID or Passport
    student_name VARCHAR(255) NOT NULL,
    
    -- Course Info
    course_name VARCHAR(255) NOT NULL,
    qualification_code VARCHAR(50),
    award_date DATE NOT NULL,
    
    -- Security
    certificate_hash VARCHAR(256) UNIQUE NOT NULL, -- SHA-256 of the content
    digital_signature TEXT, -- Cryptographic signature
    revocation_reason TEXT,
    is_revoked BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cert_hash ON certificates(certificate_hash);
CREATE INDEX idx_cert_student_id ON certificates(student_identity_number);

-- 8. IMMUTABLE AUDIT LOGS
-- This table is APPEND ONLY. No Updates/Deletes allowed ideally.
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id UUID REFERENCES users(id), -- Who did it?
    action VARCHAR(50) NOT NULL, -- 'SEARCH', 'VERIFY', 'LOGIN_FAIL'
    target_entity VARCHAR(50), -- 'institution', 'professional'
    target_id UUID, -- Specific ID affected
    details JSONB, -- Flexible payload { "query": "UCT", "ip": "1.2.3.4" }
    channel verification_channel NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optimization for time-series analysis
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);

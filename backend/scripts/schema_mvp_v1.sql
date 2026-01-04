-- Core Tables for Sumbandila MVP Phase 1 (Education & Medical)

-- 1. Institutions (Colleges, Universities, Training Providers)
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    institution_type VARCHAR(50) NOT NULL CHECK (institution_type IN ('University', 'TVET College', 'Private College', 'Training Provider')),
    registering_authority VARCHAR(50) NOT NULL CHECK (registering_authority IN ('DHET', 'QCTO', 'UMALUSI', 'SETA')),
    status VARCHAR(20) NOT NULL DEFAULT 'VERIFIED' CHECK (status IN ('VERIFIED', 'EXPIRED', 'SUSPENDED', 'DEREGISTERED')),
    accreditation_details TEXT,
    valid_from DATE,
    valid_to DATE,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    website_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Professionals (Doctors, Medical Practitioners - Phase 1)
CREATE TABLE professionals (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    profession VARCHAR(50) NOT NULL CHECK (profession IN ('Doctor', 'Nurse', 'Specialist', 'Other Medical')),
    council VARCHAR(50) NOT NULL DEFAULT 'HPCSA',
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'VERIFIED' CHECK (status IN ('VERIFIED', 'EXPIRED', 'SUSPENDED', 'DEREGISTERED')),
    specialty VARCHAR(100),
    practice_number VARCHAR(100),
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Verification Logs (Immutable Audit Trail)
CREATE TABLE verification_logs (
    id SERIAL PRIMARY KEY,
    searched_term VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('education', 'medical')),
    result_status VARCHAR(20) NOT NULL, -- 'FOUND', 'NOT_FOUND'
    matched_entity_id INTEGER, -- NULL if not found
    entity_type VARCHAR(20), -- 'institution' or 'professional'
    platform VARCHAR(20) NOT NULL, -- 'android', 'web', 'api'
    user_id INTEGER, -- Optional: verify user ID if logged in
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Admin Users (For Internal Panel)
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'data_admin' CHECK (role IN ('super_admin', 'data_admin', 'auditor')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast searching
CREATE INDEX idx_institutions_reg ON institutions(registration_number);
CREATE INDEX idx_institutions_name ON institutions(name);
CREATE INDEX idx_professionals_reg ON professionals(registration_number);
CREATE INDEX idx_professionals_name ON professionals(full_name);

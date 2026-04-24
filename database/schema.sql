-- Sumbandila Registry Sentinel
-- Production Schema v4.0.0
-- (C) 2026 Kirov Dynamics Technology

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Institutions (Universities, Colleges)
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    authority VARCHAR(50) DEFAULT 'DHET', -- DHET, CHE, SAQA
    status VARCHAR(50) DEFAULT 'Registered',
    trust_score DECIMAL(5,2),
    blockchain_hash VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Professionals (Doctors, Lawyers)
CREATE TABLE professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    authority VARCHAR(50), -- HPCSA, LPC, etc.
    profession VARCHAR(100),
    verify_status BOOLEAN DEFAULT FALSE,
    last_verified_at TIMESTAMP WITH TIME ZONE,
    blockchain_hash VARCHAR(64)
);

-- Table for Fraud Reports (Anonymous)
CREATE TABLE fraud_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_name VARCHAR(255),
    report_type VARCHAR(50), -- Institution, Professional, Website
    description TEXT,
    voice_recording_url TEXT, -- Link to Sovereign Vault
    language VARCHAR(20) DEFAULT 'en',
    ip_hash VARCHAR(64), -- SHA-256 for GDPR compliance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Audit Logs (Immutable)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action TEXT,
    change_diff JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for fast search
CREATE INDEX idx_institution_name ON institutions(name);
CREATE INDEX idx_professional_license ON professionals(license_number);

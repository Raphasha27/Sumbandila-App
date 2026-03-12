-- Sumbandila V4 — Production Database Schema
-- Compatible with PostgreSQL 15+
-- Run with: psql -U sumbandila_user -d sumbandila_db -f schema.sql

-- ============================================================
-- Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- For fast fuzzy name search

-- ============================================================
-- Institutions
-- ============================================================
CREATE TABLE IF NOT EXISTS institutions (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name                TEXT NOT NULL,
    registration_number TEXT UNIQUE,
    emis_number         TEXT,
    saqa_id             TEXT,
    nqf_level           TEXT,
    category            TEXT,               -- Education, Healthcare, Legal
    institution_type    TEXT,               -- Public University, Private HEI, TVET
    authority           TEXT,               -- DHET, CHE, QCTO, Umalusi
    status              TEXT DEFAULT 'Unverified', -- Active|Deregistered|Suspended|Pending
    risk                TEXT DEFAULT 'Medium',     -- Low|Medium|High|Critical
    physical_address    TEXT,
    province            TEXT,
    website             TEXT,
    is_flagged          BOOLEAN DEFAULT FALSE,
    warning             TEXT,
    valid_until         TEXT,
    qr_code_url         TEXT,
    blockchain_hash     TEXT,               -- V4: SHA-256 credential hash
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ,
    verified_at         TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_institutions_name_trgm ON institutions USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_institutions_reg       ON institutions (registration_number);
CREATE INDEX IF NOT EXISTS idx_institutions_status    ON institutions (status);

-- ============================================================
-- Professionals
-- ============================================================
CREATE TABLE IF NOT EXISTS professionals (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name             TEXT NOT NULL,
    profession            TEXT NOT NULL,      -- Doctor|Specialist|Attorney|Advocate|Psychologist
    registration_number   TEXT UNIQUE,
    hpcsa_number          TEXT,
    lpc_number            TEXT,
    psytech_number        TEXT,
    authority             TEXT,               -- HPCSA|LPC|GCB|SAICA
    status                TEXT,               -- Practising|Suspended|Struck off
    standing              TEXT,
    fidelity_fund_status  TEXT DEFAULT 'N/A', -- Valid|Expired|Revoked
    fidelity_fund_year    TEXT,
    practice_address      TEXT,
    province              TEXT,
    hospital_affiliation  TEXT,
    specialisation        TEXT,
    medical_aid_networks  JSONB,              -- Array of medical aid names
    is_flagged            BOOLEAN DEFAULT FALSE,
    warning               TEXT,
    risk                  TEXT DEFAULT 'Low',
    rating                TEXT,
    qr_code_url           TEXT,
    blockchain_hash       TEXT,               -- V4: tamper-proof hash
    identity_verified     BOOLEAN DEFAULT FALSE,
    trust_score           INTEGER DEFAULT 85, -- 0–100
    created_at            TIMESTAMPTZ DEFAULT NOW(),
    updated_at            TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_professionals_name_trgm ON professionals USING gin (full_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_professionals_reg       ON professionals (registration_number);
CREATE INDEX IF NOT EXISTS idx_professionals_hpcsa     ON professionals (hpcsa_number);
CREATE INDEX IF NOT EXISTS idx_professionals_lpc       ON professionals (lpc_number);

-- ============================================================
-- Verification Audit Log
-- ============================================================
CREATE TABLE IF NOT EXISTS verification_logs (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query          TEXT NOT NULL,
    result_type    TEXT,               -- institution|professional|not_found
    result_name    TEXT,
    result_status  TEXT,
    risk_level     TEXT,
    trust_score    INTEGER,
    ip_hash        TEXT,               -- SHA-256 of requester IP (privacy-safe)
    language       TEXT DEFAULT 'en',
    searched_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_searched_at ON verification_logs (searched_at DESC);

-- ============================================================
-- Scam / Fraud Reports
-- ============================================================
CREATE TABLE IF NOT EXISTS scam_reports (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_name      TEXT NOT NULL,
    entity_type      TEXT,               -- College|Doctor|Lawyer
    description      TEXT NOT NULL,
    reporter_contact TEXT,               -- Optional, kept confidential
    status           TEXT DEFAULT 'Pending Investigation',
    risk_level       TEXT,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    resolved_at      TIMESTAMPTZ
);

-- ============================================================
-- Sample seed data (deregistered institutions for demo)
-- ============================================================
INSERT INTO institutions (name, registration_number, category, institution_type, authority, status, risk, is_flagged, warning, province)
VALUES
  ('University of the Witwatersrand', 'U-1922-GP-01', 'Education', 'Public University', 'DHET', 'Active', 'Low', FALSE, NULL, 'Gauteng'),
  ('Boston City Campus', 'HE07/006', 'Education', 'Private HEI', 'CHE', 'Active', 'Low', FALSE, NULL, 'Gauteng'),
  ('Damelin', 'DEREGISTERED-2024', 'Education', 'Private HEI', 'DHET', 'Deregistered', 'Critical', TRUE, 'Recently deregistered by DHET. Do not enrol or pay fees.', NULL),
  ('City Varsity', 'DEREGISTERED-2024-CV', 'Education', 'Private HEI', 'DHET', 'Deregistered', 'Critical', TRUE, 'Deregistration notice issued 2024.', NULL),
  ('Lyceum College', 'DEREGISTERED-2024-LC', 'Education', 'Private HEI', 'DHET', 'Deregistered', 'Critical', TRUE, 'Compliance failure — DHET cancelled registration.', NULL)
ON CONFLICT (registration_number) DO NOTHING;

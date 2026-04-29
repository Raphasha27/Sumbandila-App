-- SUMBANDILA SENTINEL: Hybrid-Cached Registry Schema
-- Designed for South African National Trust Architecture (April 2026)

-- 1. INSTITUTIONS TABLE (Education & Schools)
-- Strategy: Monthly Batch Sync (Cached for Speed)
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'HEI', 'TVET', 'Independent School'
    emis_number VARCHAR(50) UNIQUE,
    dhet_reg_number VARCHAR(100),
    registration_status VARCHAR(50), -- 'Registered', 'Cancelled', 'Expired'
    registration_expiry DATE,
    site_of_delivery TEXT,
    last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(255) DEFAULT 'DHET April 2026 Register'
);

-- 2. ACCREDITED_QUALIFICATIONS (The 'Fly-By-Night' Filter)
-- Links to institutions to verify specific course accreditation
CREATE TABLE accredited_qualifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id),
    qualification_name VARCHAR(255) NOT NULL,
    nqf_level INTEGER,
    saqa_id VARCHAR(50),
    accreditation_body VARCHAR(100) -- 'CHE', 'QCTO', 'Umalusi'
);

-- 3. PRACTITIONERS TABLE (Medical & Legal)
-- Strategy: Live Scraper Cache (Short TTL)
CREATE TABLE practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    surname VARCHAR(100) NOT NULL,
    initials VARCHAR(10),
    registry_type VARCHAR(50), -- 'HPCSA', 'LPC', 'SANC'
    registration_number VARCHAR(50) UNIQUE,
    current_status VARCHAR(50), -- 'Practising', 'Suspended', 'Erased'
    fidelity_fund_certificate BOOLEAN DEFAULT FALSE, -- Specific to Legal (LPC)
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SENTINEL_ALERTS (Scam Tracker)
CREATE TABLE sentinel_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    risk_level VARCHAR(20), -- 'Critical', 'High', 'Medium'
    affected_region VARCHAR(100),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

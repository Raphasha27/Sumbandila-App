-- ============================================================
-- SUMBANDILA REGISTRY SENTINEL — PostgreSQL Schema (Supabase)
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. INSTITUTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    registration_number TEXT UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('Education', 'Healthcare', 'Legal', 'Other')),
    country TEXT NOT NULL DEFAULT 'South Africa',
    province TEXT,
    city TEXT,
    website TEXT,
    email TEXT,
    phone TEXT,
    status VARCHAR(20) CHECK (status IN ('VERIFIED', 'SUSPICIOUS', 'BLACKLISTED', 'EXPIRED', 'SUSPENDED')) DEFAULT 'SUSPICIOUS',
    risk_level VARCHAR(10) CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')) DEFAULT 'Medium',
    -- Education-specific
    emis_number TEXT,
    nqf_level TEXT,
    -- Healthcare-specific
    hpcsa_number TEXT,
    -- Legal-specific
    lpc_number TEXT,
    good_standing BOOLEAN DEFAULT FALSE,
    valid_until DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index on institution name
CREATE INDEX IF NOT EXISTS idx_institution_name_fts
    ON institutions USING GIN (to_tsvector('english', name));

-- Regular index for registration number lookups
CREATE INDEX IF NOT EXISTS idx_registration_number
    ON institutions (registration_number);

CREATE INDEX IF NOT EXISTS idx_status ON institutions (status);
CREATE INDEX IF NOT EXISTS idx_type ON institutions (type);

-- ============================================================
-- 2. ACCREDITATION BODIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS accreditation_bodies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    acronym TEXT,
    type TEXT CHECK (type IN ('Education', 'Healthcare', 'Legal', 'Cross-sector')),
    country TEXT NOT NULL DEFAULT 'South Africa',
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. INSTITUTION ACCREDITATIONS (many-to-many)
-- ============================================================
CREATE TABLE IF NOT EXISTS institution_accreditations (
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    accreditation_id UUID REFERENCES accreditation_bodies(id) ON DELETE CASCADE,
    verified_date DATE,
    expiry_date DATE,
    reference_code TEXT,
    PRIMARY KEY (institution_id, accreditation_id)
);

-- ============================================================
-- 4. REPORTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
    institution_name TEXT,           -- if not in DB yet
    institution_type TEXT,
    reporter_email TEXT,             -- anonymized/optional
    violation_type TEXT NOT NULL,
    description TEXT,
    evidence_url TEXT,
    location TEXT,
    status VARCHAR(20) CHECK (status IN ('PENDING', 'UNDER_REVIEW', 'ESCALATED', 'RESOLVED', 'DISMISSED')) DEFAULT 'PENDING',
    priority VARCHAR(10) CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')) DEFAULT 'Medium',
    assigned_to TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports (status);
CREATE INDEX IF NOT EXISTS idx_reports_institution ON reports (institution_id);

-- ============================================================
-- 5. AUDIT LOGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,             -- 'LOGIN', 'SEARCH', 'DATA_WRITE', 'REPORT_SUBMIT'
    user_email TEXT,
    action TEXT,
    collection TEXT,
    record_id TEXT,
    ip_address TEXT,
    device_info TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs (user_email);
CREATE INDEX IF NOT EXISTS idx_audit_logs_type ON audit_logs (type);

-- ============================================================
-- 6. USER SESSIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,           -- 'LOGIN', 'LOGOUT'
    device_info TEXT,
    ip_address TEXT,
    session_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. SCAM ALERTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS scam_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    department TEXT,
    risk_level VARCHAR(10) CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')) DEFAULT 'High',
    source TEXT,
    source_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_institutions_updated_at
    BEFORE UPDATE ON institutions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 9. ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE accreditation_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE scam_alerts ENABLE ROW LEVEL SECURITY;

-- Public read: anyone can read verified institutions and scam alerts
CREATE POLICY "Public can read institutions"
    ON institutions FOR SELECT USING (true);

CREATE POLICY "Public can read scam alerts"
    ON scam_alerts FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read accreditation bodies"
    ON accreditation_bodies FOR SELECT USING (true);

-- Public can insert reports (anonymous reporting)
CREATE POLICY "Public can submit reports"
    ON reports FOR INSERT WITH CHECK (true);

-- Only authenticated service role can mutate institutions
CREATE POLICY "Service role can manage institutions"
    ON institutions FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage audit logs"
    ON audit_logs FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- 10. SEED DATA — Accreditation Bodies
-- ============================================================
INSERT INTO accreditation_bodies (name, acronym, type, website) VALUES
    ('Department of Higher Education and Training', 'DHET', 'Education', 'https://www.dhet.gov.za'),
    ('South African Qualifications Authority', 'SAQA', 'Education', 'https://www.saqa.org.za'),
    ('Health Professions Council of South Africa', 'HPCSA', 'Healthcare', 'https://www.hpcsa.co.za'),
    ('Legal Practice Council', 'LPC', 'Legal', 'https://lpc.org.za'),
    ('South African Nursing Council', 'SANC', 'Healthcare', 'https://www.sanc.co.za'),
    ('Council on Higher Education', 'CHE', 'Education', 'https://www.che.ac.za')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DONE — Run this in Supabase SQL Editor
-- ============================================================

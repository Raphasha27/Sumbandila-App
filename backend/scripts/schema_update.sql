-- Extended Database Schema for Crime Prevention

-- Enable PostGIS if not already enabled (for location queries)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Enhanced Fraud Reports with Location
CREATE TABLE IF NOT EXISTS fraud_reports_extended (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  province TEXT NOT NULL,
  city TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  fraud_type TEXT CHECK (fraud_type IN ('fake_institution', 'fake_professional', 'document_forgery', 'fee_scam', 'other')),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  reporter_id UUID REFERENCES auth.users(id), -- Optional link to reporter
  verified BOOLEAN DEFAULT false,
  report_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Provincial Analytics Table
CREATE TABLE IF NOT EXISTS provincial_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  province TEXT UNIQUE NOT NULL,
  total_institutions INTEGER DEFAULT 0,
  total_professionals INTEGER DEFAULT 0,
  fraud_reports_count INTEGER DEFAULT 0,
  high_risk_score INTEGER DEFAULT 0, -- 0-100 score
  last_updated TIMESTAMP DEFAULT NOW()
);

-- 3. Add Location Columns to Professionals (if not exists)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'professionals' AND column_name = 'latitude') THEN
        ALTER TABLE professionals ADD COLUMN latitude DECIMAL(10, 8);
        ALTER TABLE professionals ADD COLUMN longitude DECIMAL(11, 8);
        ALTER TABLE professionals ADD COLUMN province TEXT;
        ALTER TABLE professionals ADD COLUMN city TEXT;
    END IF;
END $$;

-- 4. Add Location Columns to Institutions (if not exists)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'institutions' AND column_name = 'latitude') THEN
        ALTER TABLE institutions ADD COLUMN latitude DECIMAL(10, 8);
        ALTER TABLE institutions ADD COLUMN longitude DECIMAL(11, 8);
        ALTER TABLE institutions ADD COLUMN province TEXT;
        ALTER TABLE institutions ADD COLUMN city TEXT;
    END IF;
END $$;

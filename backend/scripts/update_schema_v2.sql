-- Create Safety Alerts Table
CREATE TABLE IF NOT EXISTS safety_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'scam', 'theft', 'suspicious', 'other'
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    upvotes INTEGER DEFAULT 0
);

-- Update Fraud Reports to include Evidence
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'fraud_reports' AND column_name = 'evidence_data') THEN
        ALTER TABLE fraud_reports ADD COLUMN evidence_data TEXT; -- Base64 or URL
    END IF;
END $$;

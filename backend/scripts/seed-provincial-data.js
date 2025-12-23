require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const provincialStats = [
    { province: 'Gauteng', total_institutions: 450, total_professionals: 1200, fraud_reports_count: 85, high_risk_score: 75 },
    { province: 'Western Cape', total_institutions: 320, total_professionals: 950, fraud_reports_count: 42, high_risk_score: 45 },
    { province: 'KwaZulu-Natal', total_institutions: 280, total_professionals: 780, fraud_reports_count: 65, high_risk_score: 60 },
    { province: 'Eastern Cape', total_institutions: 190, total_professionals: 450, fraud_reports_count: 35, high_risk_score: 55 },
    { province: 'Limpopo', total_institutions: 150, total_professionals: 320, fraud_reports_count: 28, high_risk_score: 40 },
    { province: 'Mpumalanga', total_institutions: 120, total_professionals: 280, fraud_reports_count: 22, high_risk_score: 45 },
    { province: 'North West', total_institutions: 130, total_professionals: 250, fraud_reports_count: 18, high_risk_score: 35 },
    { province: 'Free State', total_institutions: 140, total_professionals: 300, fraud_reports_count: 15, high_risk_score: 30 },
    { province: 'Northern Cape', total_institutions: 80, total_professionals: 150, fraud_reports_count: 8, high_risk_score: 25 },
];

const fraudReports = [
    {
        province: 'Gauteng',
        city: 'Johannesburg',
        fraud_type: 'fake_institution',
        severity: 'high',
        entity_name: 'Jozi Tech College',
        description: 'Unregistered college claiming DHET accreditation. Taking registration fees without classes.',
        verified: true,
        latitude: -26.2041,
        longitude: 28.0473
    },
    {
        province: 'KwaZulu-Natal',
        city: 'Durban',
        fraud_type: 'fake_professional',
        severity: 'high',
        entity_name: 'Dr. James Naidoo (Fake)',
        description: 'Practicing without HPCSA registration. Using stolen credentials.',
        verified: true,
        latitude: -29.8587,
        longitude: 31.0218
    },
    {
        province: 'Western Cape',
        city: 'Cape Town',
        fraud_type: 'fee_scam',
        severity: 'medium',
        entity_name: 'Study Visa Agents',
        description: 'Charging students for fake visa facilitation services.',
        verified: true,
        latitude: -33.9249,
        longitude: 18.4241
    },
    {
        province: 'Gauteng',
        city: 'Pretoria',
        fraud_type: 'document_forgery',
        severity: 'medium',
        entity_name: 'Certificates R Us',
        description: 'Selling fake matric certificates and university degrees.',
        verified: true,
        latitude: -25.7479,
        longitude: 28.2293
    },
    {
        province: 'Limpopo',
        city: 'Polokwane',
        fraud_type: 'fake_institution',
        severity: 'medium',
        entity_name: 'Limpopo Nursing School',
        description: 'Illegal nursing school operating in CBD.',
        verified: true,
        latitude: -23.9045,
        longitude: 29.4688
    }
];

async function seedProvincialData() {
    console.log('🌱 Starting provincial data seed...\n');

    try {
        // Seed Provincial Stats
        console.log('📊 Inserting provincial stats...');
        
        // Using upsert based on 'province' unique constraint
        const { data: statsData, error: statsError } = await supabase
            .from('provincial_stats')
            .upsert(provincialStats, { onConflict: 'province' });

        if (statsError) {
            console.error('❌ Error inserting stats:', statsError.message);
        } else {
            console.log(`✅ Successfully seeded data for ${provincialStats.length} provinces`);
        }

        // Seed Fraud Reports
        console.log('\n🚨 Inserting mock fraud reports...');
        const { data: reportsData, error: reportsError } = await supabase
            .from('fraud_reports')
            .insert(fraudReports);

        if (reportsError) {
            console.error('❌ Error inserting reports:', reportsError.message);
        } else {
            console.log(`✅ Successfully inserted ${fraudReports.length} mock fraud reports`);
        }

        console.log('\n🎉 Seed completed!');

    } catch (error) {
        console.error('\n❌ Seed failed:', error.message);
        process.exit(1);
    }
}

seedProvincialData();

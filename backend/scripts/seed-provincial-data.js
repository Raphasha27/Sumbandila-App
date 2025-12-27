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
        entity_name: 'Jozi Tech College',
        entity_type: 'institution',
        description: 'Unregistered college claiming DHET accreditation. Taking registration fees without classes. Location: Johannesburg, Gauteng.',
        reporter_email: 'system@sumbandila.com',
        status: 'investigating'
    },
    {
        entity_name: 'Dr. James Naidoo',
        entity_type: 'professional',
        description: 'Practicing without HPCSA registration. Using stolen credentials. Location: Durban, KwaZulu-Natal.',
        reporter_email: 'system@sumbandila.com',
        status: 'investigating'
    },
    {
        entity_name: 'Study Visa Agents',
        entity_type: 'institution',
        description: 'Charging students for fake visa facilitation services. Location: Cape Town, Western Cape.',
        reporter_email: 'system@sumbandila.com',
        status: 'pending'
    },
    {
        entity_name: 'Certificates R Us',
        entity_type: 'other',
        description: 'Selling fake matric certificates and university degrees. Location: Pretoria, Gauteng.',
        reporter_email: 'system@sumbandila.com',
        status: 'resolved'
    },
    {
        entity_name: 'Limpopo Nursing School',
        entity_type: 'institution',
        description: 'Illegal nursing school operating in CBD. Location: Polokwane, Limpopo.',
        reporter_email: 'system@sumbandila.com',
        status: 'investigating'
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

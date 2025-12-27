require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl ? 'Set ✓' : 'Missing ✗');
console.log('Key:', supabaseKey ? 'Set ✓' : 'Missing ✗');

if (!supabaseUrl || !supabaseKey) {
    console.error('\n❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        console.log('\n🔍 Testing database connection...');
        
        // Try to query the users table
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);

        if (error) {
            console.error('❌ Connection failed:', error.message);
            console.error('Full error:', error);
        } else {
            console.log('✅ Connection successful!');
            console.log('Data:', data);
        }
        
        // Test if provincial_stats table exists
        console.log('\n🔍 Checking provincial_stats table...');
        const { data: statsData, error: statsError } = await supabase
            .from('provincial_stats')
            .select('*')
            .limit(1);
            
        if (statsError) {
            console.error('❌ Provincial stats table error:', statsError.message);
        } else {
            console.log('✅ Provincial stats table accessible!');
        }
        
        // Test if fraud_reports table exists
        console.log('\n🔍 Checking fraud_reports table...');
        const { data: reportsData, error: reportsError } = await supabase
            .from('fraud_reports')
            .select('*')
            .limit(1);
            
        if (reportsError) {
            console.error('❌ Fraud reports table error:', reportsError.message);
        } else {
            console.log('✅ Fraud reports table accessible!');
        }

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
    }
}

testConnection();

/**
 * Environment Variable Validation Script
 * This script checks for required environment variables and prints warnings if missing.
 */

const fs = require('fs');
const path = require('path');

const envExamplePath = path.join(__dirname, '../.env.example');

if (!fs.existsSync(envExamplePath)) {
  console.log('✅ No .env.example found. Skipping validation.');
  process.exit(0);
}

const exampleEnv = fs.readFileSync(envExamplePath, 'utf8');
const requiredKeys = exampleEnv
  .split('\n')
  .filter(line => line && !line.startsWith('#'))
  .map(line => line.split('=')[0].trim());

const missingKeys = requiredKeys.filter(key => !process.env[key]);

if (missingKeys.length > 0) {
  console.warn('\x1b[33m%s\x1b[0m', '⚠️  MISSING ENVIRONMENT VARIABLES:');
  missingKeys.forEach(key => console.warn(`   - ${key}`));
  console.warn('\x1b[33m%s\x1b[0m', 'Ensure these are set in your deployment environment or .env file.');
} else {
  console.log('✅ All environment variables are set.');
}

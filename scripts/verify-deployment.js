#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * Verifies that all services are healthy and responding correctly
 * after deployment. Runs smoke tests and health checks.
 */

const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  environments: {
    development: {
      web: 'http://localhost:5173',
      core: 'http://localhost:8000',
      auth: 'http://localhost:8001',
      ai: 'http://localhost:8003',
      audit: 'http://localhost:8002'
    },
    staging: {
      web: 'https://staging.sumbandila.com',
      core: 'https://api-staging.sumbandila.com',
      auth: 'https://auth-staging.sumbandila.com',
      ai: 'https://ai-staging.sumbandila.com',
      audit: 'https://audit-staging.sumbandila.com'
    },
    production: {
      web: 'https://sumbandila.com',
      core: 'https://api.sumbandila.com',
      auth: 'https://auth.sumbandila.com',
      ai: 'https://ai.sumbandila.com',
      audit: 'https://audit.sumbandila.com'
    }
  },
  timeout: 10000, // 10 seconds
  retries: 3,
  retryDelay: 2000 // 2 seconds
};

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Make HTTP request with timeout
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: CONFIG.timeout
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

/**
 * Retry function with exponential backoff
 */
async function retry(fn, retries = CONFIG.retries) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay * (i + 1)));
    }
  }
}

/**
 * Check service health
 */
async function checkHealth(serviceName, url) {
  log(`  Checking ${serviceName}...`, 'cyan');
  
  try {
    const response = await retry(() => makeRequest(`${url}/health`));
    
    if (response.statusCode === 200) {
      log(`    ✅ ${serviceName} is healthy`, 'green');
      return { service: serviceName, status: 'healthy', statusCode: response.statusCode };
    } else {
      log(`    ⚠️  ${serviceName} returned ${response.statusCode}`, 'yellow');
      return { service: serviceName, status: 'unhealthy', statusCode: response.statusCode };
    }
  } catch (error) {
    log(`    ❌ ${serviceName} is unreachable: ${error.message}`, 'red');
    return { service: serviceName, status: 'unreachable', error: error.message };
  }
}

/**
 * Test verification endpoint
 */
async function testVerification(coreUrl) {
  log('  Testing verification endpoint...', 'cyan');
  
  try {
    const response = await retry(() => 
      makeRequest(`${coreUrl}/api/v1/verify/?q=test&lang=en`)
    );
    
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      log('    ✅ Verification endpoint working', 'green');
      return { test: 'verification', status: 'passed', data };
    } else {
      log(`    ⚠️  Verification endpoint returned ${response.statusCode}`, 'yellow');
      return { test: 'verification', status: 'failed', statusCode: response.statusCode };
    }
  } catch (error) {
    log(`    ❌ Verification endpoint failed: ${error.message}`, 'red');
    return { test: 'verification', status: 'error', error: error.message };
  }
}

/**
 * Test web application
 */
async function testWebApp(webUrl) {
  log('  Testing web application...', 'cyan');
  
  try {
    const response = await retry(() => makeRequest(webUrl));
    
    if (response.statusCode === 200 && response.body.includes('Sumbandila')) {
      log('    ✅ Web application is accessible', 'green');
      return { test: 'web_app', status: 'passed' };
    } else {
      log(`    ⚠️  Web application returned ${response.statusCode}`, 'yellow');
      return { test: 'web_app', status: 'failed', statusCode: response.statusCode };
    }
  } catch (error) {
    log(`    ❌ Web application failed: ${error.message}`, 'red');
    return { test: 'web_app', status: 'error', error: error.message };
  }
}

/**
 * Check SSL certificate (production only)
 */
async function checkSSL(url) {
  if (!url.startsWith('https://')) {
    return { test: 'ssl', status: 'skipped', reason: 'Not HTTPS' };
  }
  
  log('  Checking SSL certificate...', 'cyan');
  
  try {
    const response = await makeRequest(url);
    log('    ✅ SSL certificate is valid', 'green');
    return { test: 'ssl', status: 'passed' };
  } catch (error) {
    if (error.message.includes('certificate')) {
      log(`    ❌ SSL certificate error: ${error.message}`, 'red');
      return { test: 'ssl', status: 'failed', error: error.message };
    }
    return { test: 'ssl', status: 'passed' };
  }
}

/**
 * Run all verification checks
 */
async function verifyDeployment(environment) {
  const env = CONFIG.environments[environment];
  
  if (!env) {
    throw new Error(`Unknown environment: ${environment}`);
  }
  
  log(`\n🔍 Verifying ${environment.toUpperCase()} deployment...`, 'blue');
  log('━'.repeat(60), 'blue');
  
  const results = {
    environment,
    timestamp: new Date().toISOString(),
    checks: []
  };
  
  // Health checks
  log('\n📊 Health Checks:', 'blue');
  results.checks.push(await checkHealth('Core Service', env.core));
  results.checks.push(await checkHealth('Auth Service', env.auth));
  results.checks.push(await checkHealth('AI Service', env.ai));
  results.checks.push(await checkHealth('Audit Service', env.audit));
  
  // Functional tests
  log('\n🧪 Functional Tests:', 'blue');
  results.checks.push(await testWebApp(env.web));
  results.checks.push(await testVerification(env.core));
  
  // SSL check (production only)
  if (environment === 'production') {
    log('\n🔒 Security Checks:', 'blue');
    results.checks.push(await checkSSL(env.web));
    results.checks.push(await checkSSL(env.core));
  }
  
  return results;
}

/**
 * Generate report
 */
function generateReport(results) {
  log('\n━'.repeat(60), 'blue');
  log('📋 Deployment Verification Report', 'blue');
  log('━'.repeat(60), 'blue');
  
  const passed = results.checks.filter(c => c.status === 'passed' || c.status === 'healthy').length;
  const failed = results.checks.filter(c => c.status === 'failed' || c.status === 'unhealthy').length;
  const errors = results.checks.filter(c => c.status === 'error' || c.status === 'unreachable').length;
  const total = results.checks.length;
  
  log(`\nEnvironment: ${results.environment.toUpperCase()}`, 'cyan');
  log(`Timestamp: ${results.timestamp}`, 'cyan');
  log(`\nResults:`, 'cyan');
  log(`  ✅ Passed: ${passed}/${total}`, passed === total ? 'green' : 'yellow');
  log(`  ⚠️  Failed: ${failed}/${total}`, failed > 0 ? 'yellow' : 'green');
  log(`  ❌ Errors: ${errors}/${total}`, errors > 0 ? 'red' : 'green');
  
  const success = failed === 0 && errors === 0;
  
  log('\n━'.repeat(60), success ? 'green' : 'red');
  log(success ? '✅ Deployment verification PASSED' : '❌ Deployment verification FAILED', 
      success ? 'green' : 'red');
  log('━'.repeat(60), success ? 'green' : 'red');
  
  return success;
}

/**
 * Main execution
 */
async function main() {
  const environment = process.argv[2] || 'development';
  
  try {
    const results = await verifyDeployment(environment);
    const success = generateReport(results);
    
    // Exit with appropriate code
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    log(`\n❌ Verification failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { verifyDeployment, generateReport };

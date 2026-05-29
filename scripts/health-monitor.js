#!/usr/bin/env node

/**
 * Health Monitoring Script
 * 
 * Continuously monitors service health and sends alerts
 * when services become unhealthy.
 */

const https = require('https');
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  checkInterval: 60000, // 1 minute
  alertThreshold: 3, // Alert after 3 consecutive failures
  services: {
    web: process.env.WEB_URL || 'http://localhost:5173',
    core: process.env.CORE_URL || 'http://localhost:8000',
    auth: process.env.AUTH_URL || 'http://localhost:8001',
    ai: process.env.AI_URL || 'http://localhost:8003',
    audit: process.env.AUDIT_URL || 'http://localhost:8002'
  },
  logFile: path.join(process.cwd(), 'health-monitor.log')
};

// Service health state
const serviceState = {};

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  const timestamp = new Date().toISOString();
  const coloredMessage = `${colors[color]}[${timestamp}] ${message}${colors.reset}`;
  console.log(coloredMessage);
}

async function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  await fs.appendFile(CONFIG.logFile, logMessage);
}

/**
 * Make HTTP request
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: 'GET',
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Check service health
 */
async function checkServiceHealth(serviceName, url) {
  try {
    const response = await makeRequest(`${url}/health`);
    
    if (response.statusCode === 200) {
      return { healthy: true, statusCode: response.statusCode };
    } else {
      return { healthy: false, statusCode: response.statusCode };
    }
  } catch (error) {
    return { healthy: false, error: error.message };
  }
}

/**
 * Send alert
 */
async function sendAlert(serviceName, details) {
  const message = `🚨 ALERT: ${serviceName} is unhealthy!\nDetails: ${JSON.stringify(details, null, 2)}`;
  
  log(message, 'red');
  await logToFile(message);
  
  // TODO: Integrate with alerting service (Slack, PagerDuty, etc.)
  // For now, just log to console and file
}

/**
 * Monitor all services
 */
async function monitorServices() {
  log('🔍 Checking service health...', 'cyan');
  
  for (const [serviceName, url] of Object.entries(CONFIG.services)) {
    const health = await checkServiceHealth(serviceName, url);
    
    // Initialize state if needed
    if (!serviceState[serviceName]) {
      serviceState[serviceName] = {
        consecutiveFailures: 0,
        lastHealthy: null,
        lastUnhealthy: null
      };
    }
    
    if (health.healthy) {
      log(`  ✅ ${serviceName} is healthy`, 'green');
      
      // Reset failure count
      if (serviceState[serviceName].consecutiveFailures > 0) {
        log(`  🎉 ${serviceName} recovered!`, 'green');
        await logToFile(`${serviceName} recovered after ${serviceState[serviceName].consecutiveFailures} failures`);
      }
      
      serviceState[serviceName].consecutiveFailures = 0;
      serviceState[serviceName].lastHealthy = new Date().toISOString();
      
    } else {
      log(`  ❌ ${serviceName} is unhealthy: ${health.error || health.statusCode}`, 'red');
      
      serviceState[serviceName].consecutiveFailures++;
      serviceState[serviceName].lastUnhealthy = new Date().toISOString();
      
      // Send alert if threshold reached
      if (serviceState[serviceName].consecutiveFailures === CONFIG.alertThreshold) {
        await sendAlert(serviceName, {
          consecutiveFailures: serviceState[serviceName].consecutiveFailures,
          lastHealthy: serviceState[serviceName].lastHealthy,
          error: health.error,
          statusCode: health.statusCode
        });
      }
    }
  }
  
  log('━'.repeat(60), 'cyan');
}

/**
 * Main execution
 */
async function main() {
  log('🚀 Starting health monitor...', 'cyan');
  log(`📊 Monitoring ${Object.keys(CONFIG.services).length} services`, 'cyan');
  log(`⏱️  Check interval: ${CONFIG.checkInterval / 1000}s`, 'cyan');
  log(`🚨 Alert threshold: ${CONFIG.alertThreshold} consecutive failures`, 'cyan');
  log('━'.repeat(60), 'cyan');
  
  // Initial check
  await monitorServices();
  
  // Schedule periodic checks
  setInterval(async () => {
    await monitorServices();
  }, CONFIG.checkInterval);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n👋 Shutting down health monitor...', 'yellow');
  process.exit(0);
});

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    log(`❌ Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { monitorServices, checkServiceHealth };

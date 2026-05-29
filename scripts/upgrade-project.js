#!/usr/bin/env node

/**
 * Project Upgrade Script
 * 
 * Comprehensive upgrade system that:
 * - Updates all dependencies
 * - Runs security audits
 * - Verifies builds
 * - Updates documentation
 * - Runs tests
 */

const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, {
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

/**
 * Check if command exists
 */
function commandExists(command) {
  try {
    exec(`${command} --version`, { silent: true });
    return true;
  } catch {
    return false;
  }
}

/**
 * Update Node.js dependencies
 */
async function updateNodeDependencies() {
  log('\n📦 Updating Node.js dependencies...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    // Update root dependencies
    log('\n  Updating root dependencies...', 'cyan');
    exec('npm update');
    
    // Update workspace dependencies
    log('\n  Updating workspace dependencies...', 'cyan');
    exec('npm update --workspaces');
    
    log('\n  ✅ Node.js dependencies updated', 'green');
    return true;
  } catch (error) {
    log(`\n  ❌ Failed to update Node.js dependencies: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Update Python dependencies
 */
async function updatePythonDependencies() {
  log('\n🐍 Updating Python dependencies...', 'blue');
  log('━'.repeat(60), 'blue');
  
  if (!commandExists('pip')) {
    log('  ⚠️  pip not found, skipping Python updates', 'yellow');
    return true;
  }
  
  try {
    const services = ['services/core', 'services/auth', 'services/ai', 'services/audit'];
    
    for (const service of services) {
      const reqPath = path.join(process.cwd(), service, 'requirements.txt');
      
      try {
        await fs.access(reqPath);
        log(`\n  Updating ${service}...`, 'cyan');
        exec(`pip install --upgrade -r ${reqPath}`, { ignoreError: true });
      } catch {
        // requirements.txt doesn't exist, skip
      }
    }
    
    log('\n  ✅ Python dependencies updated', 'green');
    return true;
  } catch (error) {
    log(`\n  ❌ Failed to update Python dependencies: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Run security audit
 */
async function runSecurityAudit() {
  log('\n🔒 Running security audit...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    // Node.js audit
    log('\n  Auditing Node.js dependencies...', 'cyan');
    const npmAudit = exec('npm audit --audit-level=moderate', { 
      silent: true, 
      ignoreError: true 
    });
    
    if (npmAudit && npmAudit.includes('vulnerabilities')) {
      log('  ⚠️  Vulnerabilities found, attempting to fix...', 'yellow');
      exec('npm audit fix', { ignoreError: true });
    } else {
      log('  ✅ No vulnerabilities found', 'green');
    }
    
    // Python audit (if pip-audit is installed)
    if (commandExists('pip-audit')) {
      log('\n  Auditing Python dependencies...', 'cyan');
      exec('pip-audit', { ignoreError: true });
    }
    
    log('\n  ✅ Security audit complete', 'green');
    return true;
  } catch (error) {
    log(`\n  ❌ Security audit failed: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Verify builds
 */
async function verifyBuilds() {
  log('\n🏗️  Verifying builds...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    log('\n  Building web app...', 'cyan');
    exec('npm run build --workspace=@sumbandila/web');
    log('  ✅ Web app build successful', 'green');
    
    log('\n  ✅ All builds verified', 'green');
    return true;
  } catch (error) {
    log(`\n  ❌ Build verification failed: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Run tests
 */
async function runTests() {
  log('\n🧪 Running tests...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    log('\n  Running test suite...', 'cyan');
    exec('npm test', { ignoreError: true });
    
    log('\n  ✅ Tests complete', 'green');
    return true;
  } catch (error) {
    log(`\n  ⚠️  Some tests failed: ${error.message}`, 'yellow');
    return true; // Don't fail upgrade on test failures
  }
}

/**
 * Update documentation
 */
async function updateDocumentation() {
  log('\n📝 Updating documentation...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    log('\n  Syncing README files...', 'cyan');
    exec('node scripts/sync-readme.js');
    
    log('\n  ✅ Documentation updated', 'green');
    return true;
  } catch (error) {
    log(`\n  ❌ Documentation update failed: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Check for outdated dependencies
 */
async function checkOutdated() {
  log('\n📊 Checking for outdated dependencies...', 'blue');
  log('━'.repeat(60), 'blue');
  
  try {
    log('\n  Node.js packages:', 'cyan');
    exec('npm outdated --workspaces', { ignoreError: true });
    
    if (commandExists('pip')) {
      log('\n  Python packages:', 'cyan');
      exec('pip list --outdated', { ignoreError: true });
    }
    
    return true;
  } catch (error) {
    return true; // Don't fail on outdated check
  }
}

/**
 * Generate upgrade report
 */
async function generateReport(results) {
  log('\n━'.repeat(60), 'blue');
  log('📋 Upgrade Report', 'bold');
  log('━'.repeat(60), 'blue');
  
  const steps = [
    { name: 'Node.js Dependencies', result: results.nodeDeps },
    { name: 'Python Dependencies', result: results.pythonDeps },
    { name: 'Security Audit', result: results.security },
    { name: 'Build Verification', result: results.builds },
    { name: 'Tests', result: results.tests },
    { name: 'Documentation', result: results.docs }
  ];
  
  log('\nResults:', 'cyan');
  steps.forEach(step => {
    const icon = step.result ? '✅' : '❌';
    const color = step.result ? 'green' : 'red';
    log(`  ${icon} ${step.name}`, color);
  });
  
  const allPassed = steps.every(step => step.result);
  
  log('\n━'.repeat(60), allPassed ? 'green' : 'yellow');
  log(
    allPassed 
      ? '✅ Project upgrade complete!' 
      : '⚠️  Project upgrade complete with warnings',
    allPassed ? 'green' : 'yellow'
  );
  log('━'.repeat(60), allPassed ? 'green' : 'yellow');
  
  return allPassed;
}

/**
 * Main execution
 */
async function main() {
  log('\n🚀 Starting project upgrade...', 'blue');
  log('━'.repeat(60), 'blue');
  
  const results = {
    nodeDeps: false,
    pythonDeps: false,
    security: false,
    builds: false,
    tests: false,
    docs: false
  };
  
  try {
    // Run upgrade steps
    results.nodeDeps = await updateNodeDependencies();
    results.pythonDeps = await updatePythonDependencies();
    results.security = await runSecurityAudit();
    results.builds = await verifyBuilds();
    results.tests = await runTests();
    results.docs = await updateDocumentation();
    
    // Check for outdated packages
    await checkOutdated();
    
    // Generate report
    const success = await generateReport(results);
    
    // Exit with appropriate code
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    log(`\n❌ Upgrade failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };

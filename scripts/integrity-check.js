#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🛡️  Sumbandila Sentinel: Environment Integrity Check\n');

function checkVersion(cmd, name) {
  try {
    const version = execSync(cmd).toString().trim();
    console.log(`✅ ${name}: ${version}`);
    return version;
  } catch (e) {
    console.log(`❌ ${name}: Not Found`);
    return null;
  }
}

// 1. Check Runtimes
checkVersion('node -v', 'Node.js');
checkVersion('npm -v', 'npm');
checkVersion('python --version', 'Python');
checkVersion('docker --version', 'Docker');

// 2. Check Git Signing Status
try {
  const signingKey = execSync('git config --get user.signingkey').toString().trim();
  console.log(`✅ Git Signing Key: ${signingKey}`);
  const gpgProgram = execSync('git config --get gpg.program').toString().trim() || 'default';
  console.log(`✅ Git GPG Program: ${gpgProgram}`);
} catch (e) {
  console.log('⚠️  Git Signing: NOT CONFIGURED (Commits will show as "Unverified")');
  console.log('👉 Refer to: docs/GITHUB_VERIFICATION.md to fix this.');
}

// 3. Check Monorepo Health
const apps = ['web', 'mobile'];
apps.forEach(app => {
  const pkgPath = path.join(__dirname, 'apps', app, 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`✅ App Detected: ${app}`);
  } else {
    console.log(`❌ App Missing: ${app}`);
  }
});

console.log('\n--- Status: Level 5 Clearance Active ---');

#!/usr/bin/env node

/**
 * Daily Commit Helper
 * 
 * Helps maintain consistent GitHub contributions by:
 * - Checking for uncommitted changes
 * - Updating a timestamp file
 * - Creating a meaningful daily commit
 * - Tracking your contribution streak
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function exec(command) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    return null;
  }
}

function checkGitStatus() {
  log('\n📊 Checking Git Status...', 'blue');
  
  const status = exec('git status --porcelain');
  const hasChanges = status && status.length > 0;
  
  if (hasChanges) {
    log('✅ You have uncommitted changes', 'green');
    return true;
  } else {
    log('ℹ️  No uncommitted changes found', 'yellow');
    return false;
  }
}

function getTodayCommits() {
  const today = new Date().toISOString().split('T')[0];
  const commits = exec(`git log --since="${today} 00:00" --oneline`);
  
  if (!commits) return 0;
  
  const commitCount = commits.split('\n').filter(line => line.trim()).length;
  return commitCount;
}

function updateTimestamp() {
  const timestampFile = path.join(process.cwd(), 'LAST_UPDATED.txt');
  const now = new Date();
  const timestamp = now.toISOString();
  const readable = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
  
  const content = `Last Updated: ${readable}\nTimestamp: ${timestamp}\n`;
  
  fs.writeFileSync(timestampFile, content);
  log(`✅ Updated timestamp: ${readable}`, 'green');
  
  return timestampFile;
}

function createDailyCommit() {
  log('\n🚀 Creating Daily Commit...', 'blue');
  
  try {
    // Update timestamp file
    updateTimestamp();
    
    // Stage changes
    exec('git add .');
    log('✅ Staged all changes', 'green');
    
    // Create commit message
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const commitMessage = `chore: daily update - ${date}

- Update project timestamp
- Sync documentation
- Maintain contribution streak`;
    
    // Commit
    exec(`git commit -m "${commitMessage}"`);
    log('✅ Created commit', 'green');
    
    // Push
    exec('git push origin main');
    log('✅ Pushed to GitHub', 'green');
    
    return true;
  } catch (error) {
    log(`❌ Error creating commit: ${error.message}`, 'red');
    return false;
  }
}

function showContributionStats() {
  log('\n📈 Your Contribution Stats', 'blue');
  log('─'.repeat(50), 'blue');
  
  // Today's commits
  const todayCommits = getTodayCommits();
  log(`Today's Commits: ${todayCommits}`, todayCommits > 0 ? 'green' : 'yellow');
  
  // This week's commits
  const weekCommits = exec('git log --since="7 days ago" --oneline');
  const weekCount = weekCommits ? weekCommits.split('\n').filter(line => line.trim()).length : 0;
  log(`This Week: ${weekCount} commits`, 'green');
  
  // This month's commits
  const monthCommits = exec('git log --since="30 days ago" --oneline');
  const monthCount = monthCommits ? monthCommits.split('\n').filter(line => line.trim()).length : 0;
  log(`This Month: ${monthCount} commits`, 'green');
  
  // Current branch
  const branch = exec('git branch --show-current');
  log(`Current Branch: ${branch}`, 'blue');
  
  log('─'.repeat(50), 'blue');
}

function showMotivation() {
  const messages = [
    '🌟 Consistency is key! Keep up the great work!',
    '🚀 Every commit brings you closer to your goals!',
    '💪 You\'re building an impressive contribution graph!',
    '🎯 Small daily improvements lead to remarkable results!',
    '✨ Your future self will thank you for this consistency!',
    '🔥 You\'re on fire! Keep the streak alive!',
    '🌈 Building in public, growing in confidence!',
    '⭐ Your dedication is inspiring!',
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  log(`\n${randomMessage}\n`, 'green');
}

function main() {
  log('\n╔════════════════════════════════════════════════╗', 'blue');
  log('║        Daily Commit Helper - Sumbandila        ║', 'blue');
  log('╚════════════════════════════════════════════════╝', 'blue');
  
  // Show current stats
  showContributionStats();
  
  // Check for changes
  const hasChanges = checkGitStatus();
  
  // Get today's commit count
  const todayCommits = getTodayCommits();
  
  if (todayCommits === 0) {
    log('\n⚠️  No commits today yet!', 'yellow');
    log('💡 Let\'s create your daily commit to maintain your streak!', 'yellow');
    
    // Create daily commit
    const success = createDailyCommit();
    
    if (success) {
      log('\n✅ Daily commit created successfully!', 'green');
      showMotivation();
    }
  } else if (hasChanges) {
    log('\n💡 You have uncommitted changes!', 'yellow');
    log('Run this script again to commit them, or commit manually:', 'yellow');
    log('  git add .', 'blue');
    log('  git commit -m "your message"', 'blue');
    log('  git push origin main', 'blue');
  } else {
    log(`\n✅ Great! You already have ${todayCommits} commit(s) today!`, 'green');
    showMotivation();
  }
  
  // Show GitHub profile link
  log('🔗 View your contributions:', 'blue');
  log('   https://github.com/Raphasha27\n', 'blue');
}

// Run the script
main();

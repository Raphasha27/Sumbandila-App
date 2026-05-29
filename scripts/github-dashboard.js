#!/usr/bin/env node

/**
 * GitHub Dashboard - CLI Edition
 * 
 * View your GitHub stats and activity without web access
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
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

function getProfile() {
  const profile = exec('gh api user');
  return profile ? JSON.parse(profile) : null;
}

function getRepoCount() {
  const repos = exec('gh repo list --limit 1000 --json name');
  return repos ? JSON.parse(repos).length : 0;
}

function getIssueStats() {
  const openIssues = exec('gh search issues --author @me --state open --json number');
  const closedIssues = exec('gh search issues --author @me --state closed --json number');
  
  return {
    open: openIssues ? JSON.parse(openIssues).length : 0,
    closed: closedIssues ? JSON.parse(closedIssues).length : 0,
  };
}

function getPRStats() {
  const openPRs = exec('gh search prs --author @me --state open --json number');
  const mergedPRs = exec('gh search prs --author @me --state merged --json number');
  
  return {
    open: openPRs ? JSON.parse(openPRs).length : 0,
    merged: mergedPRs ? JSON.parse(mergedPRs).length : 0,
  };
}

function getRecentActivity() {
  const repos = exec('gh repo list --limit 5 --json name,updatedAt');
  return repos ? JSON.parse(repos) : [];
}

function main() {
  log('\n╔════════════════════════════════════════════════╗', 'blue');
  log('║         GitHub Dashboard - CLI Edition         ║', 'blue');
  log('╚════════════════════════════════════════════════╝', 'blue');
  
  // Profile Information
  log('\n👤 Profile Information', 'cyan');
  log('─'.repeat(50), 'blue');
  
  const profile = getProfile();
  if (profile) {
    log(`Name: ${profile.name || 'N/A'}`, 'green');
    log(`Username: @${profile.login}`, 'green');
    log(`Profile: https://github.com/${profile.login}`, 'blue');
    log(`Public Repos: ${profile.public_repos}`, 'green');
    log(`Followers: ${profile.followers}`, 'green');
    log(`Following: ${profile.following}`, 'green');
    log(`Account Created: ${new Date(profile.created_at).toLocaleDateString()}`, 'green');
  }
  
  // Repository Stats
  log('\n📚 Repository Statistics', 'cyan');
  log('─'.repeat(50), 'blue');
  
  const totalRepos = getRepoCount();
  log(`Total Repositories: ${totalRepos}`, 'green');
  
  // Issue Stats
  log('\n🐛 Issue Statistics', 'cyan');
  log('─'.repeat(50), 'blue');
  
  log('Fetching issue stats...', 'yellow');
  const issues = getIssueStats();
  log(`Open Issues: ${issues.open}`, 'green');
  log(`Closed Issues: ${issues.closed}`, 'green');
  log(`Total Issues: ${issues.open + issues.closed}`, 'green');
  
  // PR Stats
  log('\n🔀 Pull Request Statistics', 'cyan');
  log('─'.repeat(50), 'blue');
  
  log('Fetching PR stats...', 'yellow');
  const prs = getPRStats();
  log(`Open PRs: ${prs.open}`, 'green');
  log(`Merged PRs: ${prs.merged}`, 'green');
  log(`Total PRs: ${prs.open + prs.merged}`, 'green');
  
  // Recent Activity
  log('\n⚡ Recent Activity', 'cyan');
  log('─'.repeat(50), 'blue');
  
  const recentRepos = getRecentActivity();
  recentRepos.forEach((repo, index) => {
    const updatedAt = new Date(repo.updatedAt);
    const timeAgo = getTimeAgo(updatedAt);
    log(`${index + 1}. ${repo.name} - ${timeAgo}`, 'green');
  });
  
  // Quick Commands
  log('\n🚀 Quick Commands', 'cyan');
  log('─'.repeat(50), 'blue');
  log('gh repo list              - List all repositories', 'yellow');
  log('gh issue list --assignee @me  - Your assigned issues', 'yellow');
  log('gh pr list --author @me   - Your pull requests', 'yellow');
  log('gh workflow list          - List workflows', 'yellow');
  log('gh run list               - Recent workflow runs', 'yellow');
  
  log('\n✨ You have full GitHub access via CLI!', 'green');
  log('📖 See GITHUB_CLI_GUIDE.md for complete reference\n', 'blue');
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'just now';
}

// Run the dashboard
main();

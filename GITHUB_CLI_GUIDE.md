# 🚀 GitHub CLI Complete Guide - No Web Access Needed!

> **You're already authenticated!** Use GitHub CLI (`gh`) to manage everything from the command line.

---

## ✅ Your Current Status

```
✓ Logged in to github.com as Raphasha27
✓ Git operations: HTTPS
✓ Token scopes: gist, read:org, repo, workflow
✓ Full access to repositories, issues, PRs, and more!
```

---

## 📚 Table of Contents

1. [Repository Management](#repository-management)
2. [Issues Management](#issues-management)
3. [Pull Requests](#pull-requests)
4. [Gists](#gists)
5. [Profile & Account](#profile--account)
6. [Releases](#releases)
7. [Actions & Workflows](#actions--workflows)
8. [Advanced Operations](#advanced-operations)

---

## 🗂️ Repository Management

### View Your Repositories

```bash
# List all your repositories
gh repo list

# List with more details
gh repo list --limit 100

# List only public repos
gh repo list --visibility public

# List only private repos
gh repo list --visibility private
```

### View Repository Details

```bash
# View current repository
gh repo view

# View specific repository
gh repo view Raphasha27/Sumbandila-App

# View in browser (if you regain web access)
gh repo view --web
```

### Create New Repository

```bash
# Create a new repository
gh repo create my-new-repo --public --description "My awesome project"

# Create private repository
gh repo create my-private-repo --private

# Create and clone
gh repo create my-new-repo --public --clone

# Create from current directory
gh repo create --source=. --public
```

### Clone Repositories

```bash
# Clone your repository
gh repo clone Raphasha27/Sumbandila-App

# Clone to specific directory
gh repo clone Raphasha27/Sumbandila-App ./my-folder

# Clone someone else's repo
gh repo clone facebook/react
```

### Fork Repositories

```bash
# Fork a repository
gh repo fork owner/repo

# Fork and clone
gh repo fork owner/repo --clone

# Fork to specific organization
gh repo fork owner/repo --org my-org
```

### Delete Repository

```bash
# Delete a repository (careful!)
gh repo delete Raphasha27/repo-name --yes
```

### Repository Settings

```bash
# Archive a repository
gh repo archive Raphasha27/old-repo

# Edit repository details
gh repo edit --description "New description"
gh repo edit --homepage "https://example.com"
gh repo edit --visibility private
gh repo edit --enable-issues=true
gh repo edit --enable-wiki=false
```

---

## 🐛 Issues Management

### List Issues

```bash
# List issues in current repo
gh issue list

# List all your issues across all repos
gh issue list --assignee @me

# List open issues
gh issue list --state open

# List closed issues
gh issue list --state closed

# Filter by label
gh issue list --label bug
gh issue list --label "help wanted"

# Search issues
gh issue list --search "authentication"
```

### View Issue Details

```bash
# View specific issue
gh issue view 123

# View in browser
gh issue view 123 --web

# View with comments
gh issue view 123 --comments
```

### Create New Issue

```bash
# Create issue interactively
gh issue create

# Create with title and body
gh issue create --title "Bug: Login fails" --body "Description of the bug"

# Create with labels
gh issue create --title "Feature request" --label enhancement,feature

# Create and assign
gh issue create --title "Fix bug" --assignee @me

# Create from template
gh issue create --template bug_report.md
```

### Update Issues

```bash
# Close an issue
gh issue close 123

# Close with comment
gh issue close 123 --comment "Fixed in PR #124"

# Reopen an issue
gh issue reopen 123

# Edit issue
gh issue edit 123 --title "New title"
gh issue edit 123 --body "New description"
gh issue edit 123 --add-label bug
gh issue edit 123 --remove-label enhancement
gh issue edit 123 --add-assignee @me
```

### Comment on Issues

```bash
# Add comment
gh issue comment 123 --body "This is my comment"

# Edit comment (need comment ID)
gh issue comment 123 --edit-last "Updated comment"
```

---

## 🔀 Pull Requests

### List Pull Requests

```bash
# List PRs in current repo
gh pr list

# List your PRs across all repos
gh pr list --author @me

# List PRs by state
gh pr list --state open
gh pr list --state closed
gh pr list --state merged

# Filter by label
gh pr list --label "needs review"

# Search PRs
gh pr list --search "authentication"
```

### View PR Details

```bash
# View specific PR
gh pr view 45

# View in browser
gh pr view 45 --web

# View with diff
gh pr diff 45

# View PR checks
gh pr checks 45
```

### Create Pull Request

```bash
# Create PR interactively
gh pr create

# Create with title and body
gh pr create --title "Add authentication" --body "Implements user auth"

# Create and assign reviewers
gh pr create --title "Fix bug" --reviewer username1,username2

# Create with labels
gh pr create --title "Feature" --label enhancement,feature

# Create draft PR
gh pr create --draft --title "WIP: New feature"

# Create from specific branch
gh pr create --base main --head feature-branch
```

### Manage Pull Requests

```bash
# Checkout a PR locally
gh pr checkout 45

# Merge a PR
gh pr merge 45

# Merge with squash
gh pr merge 45 --squash

# Merge with rebase
gh pr merge 45 --rebase

# Close PR without merging
gh pr close 45

# Reopen PR
gh pr reopen 45

# Mark PR as ready (from draft)
gh pr ready 45

# Request review
gh pr review 45 --approve
gh pr review 45 --comment --body "Looks good!"
gh pr review 45 --request-changes --body "Please fix X"
```

### PR Comments

```bash
# Comment on PR
gh pr comment 45 --body "Great work!"

# Edit last comment
gh pr comment 45 --edit-last "Updated comment"
```

---

## 📝 Gists

### List Gists

```bash
# List your gists
gh gist list

# List public gists
gh gist list --public

# List secret gists
gh gist list --secret
```

### Create Gist

```bash
# Create gist from file
gh gist create myfile.js

# Create gist from multiple files
gh gist create file1.js file2.css

# Create public gist
gh gist create --public myfile.js

# Create with description
gh gist create --desc "My awesome script" script.sh

# Create from stdin
echo "console.log('Hello')" | gh gist create --filename hello.js
```

### View and Edit Gists

```bash
# View gist
gh gist view GIST_ID

# Edit gist
gh gist edit GIST_ID

# Clone gist
gh gist clone GIST_ID

# Delete gist
gh gist delete GIST_ID
```

---

## 👤 Profile & Account

### View Your Profile

```bash
# View your profile
gh api user

# View formatted
gh api user --jq '.login, .name, .email, .bio'

# View specific user
gh api users/Raphasha27
```

### View Your Stats

```bash
# View your repositories count
gh api user --jq '.public_repos'

# View your followers
gh api user/followers

# View who you're following
gh api user/following

# View your organizations
gh api user/orgs
```

### SSH Keys

```bash
# List SSH keys
gh ssh-key list

# Add SSH key
gh ssh-key add ~/.ssh/id_rsa.pub --title "My laptop"

# Delete SSH key
gh ssh-key delete KEY_ID
```

### GPG Keys

```bash
# List GPG keys
gh gpg-key list

# Add GPG key
gh gpg-key add key.asc

# Delete GPG key
gh gpg-key delete KEY_ID
```

---

## 🚀 Releases

### List Releases

```bash
# List releases
gh release list

# List with more details
gh release list --limit 20
```

### View Release

```bash
# View latest release
gh release view

# View specific release
gh release view v1.0.0

# Download release assets
gh release download v1.0.0
```

### Create Release

```bash
# Create release
gh release create v1.0.0

# Create with title and notes
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes here"

# Create with assets
gh release create v1.0.0 ./dist/*.zip

# Create draft release
gh release create v1.0.0 --draft

# Create pre-release
gh release create v1.0.0-beta --prerelease
```

### Manage Releases

```bash
# Edit release
gh release edit v1.0.0 --title "New title"

# Delete release
gh release delete v1.0.0 --yes

# Upload assets to existing release
gh release upload v1.0.0 ./dist/app.zip
```

---

## ⚙️ Actions & Workflows

### List Workflows

```bash
# List workflows
gh workflow list

# View workflow details
gh workflow view

# View specific workflow
gh workflow view "CI"
```

### Run Workflows

```bash
# Run workflow
gh workflow run "CI"

# Run with inputs
gh workflow run "Deploy" --field environment=production

# Run on specific branch
gh workflow run "CI" --ref feature-branch
```

### View Workflow Runs

```bash
# List recent runs
gh run list

# List runs for specific workflow
gh run list --workflow "CI"

# View run details
gh run view RUN_ID

# View run logs
gh run view RUN_ID --log

# Watch run in real-time
gh run watch RUN_ID
```

### Manage Runs

```bash
# Cancel a run
gh run cancel RUN_ID

# Rerun a workflow
gh run rerun RUN_ID

# Download artifacts
gh run download RUN_ID
```

---

## 🔧 Advanced Operations

### Search

```bash
# Search repositories
gh search repos "react authentication"

# Search issues
gh search issues "bug label:critical"

# Search code
gh search code "function authenticate"

# Search with filters
gh search repos --language javascript --stars ">1000"
```

### API Access

```bash
# Make API calls
gh api repos/Raphasha27/Sumbandila-App

# POST request
gh api repos/Raphasha27/Sumbandila-App/issues --method POST --field title="New issue"

# With jq filtering
gh api user --jq '.name'

# Paginated results
gh api --paginate repos/Raphasha27/Sumbandila-App/issues
```

### Aliases

```bash
# Create alias
gh alias set pv 'pr view'

# List aliases
gh alias list

# Use alias
gh pv 45

# Delete alias
gh alias delete pv
```

### Extensions

```bash
# List extensions
gh extension list

# Install extension
gh extension install owner/gh-extension-name

# Upgrade extensions
gh extension upgrade --all

# Remove extension
gh extension remove extension-name
```

---

## 🎯 Common Workflows

### Daily Development

```bash
# Morning routine
gh issue list --assignee @me
gh pr list --author @me
gh run list --limit 5

# Create feature branch and PR
git checkout -b feature/new-feature
# ... make changes ...
git add .
git commit -m "feat: add new feature"
git push -u origin feature/new-feature
gh pr create --title "Add new feature" --body "Description"

# Review and merge
gh pr view 45
gh pr checks 45
gh pr merge 45 --squash
```

### Release Process

```bash
# Check status
gh run list --workflow "CI"

# Create release
gh release create v1.0.0 \
  --title "Version 1.0.0" \
  --notes "Release notes" \
  ./dist/*.zip

# Verify release
gh release view v1.0.0
```

### Issue Triage

```bash
# View new issues
gh issue list --label "needs triage"

# Assign and label
gh issue edit 123 --add-label bug --add-assignee @me

# Comment and close
gh issue comment 123 --body "Fixed in v1.0.1"
gh issue close 123
```

---

## 📊 Useful Scripts

### Check All Your Repos

```bash
# List all repos with stars
gh repo list --limit 100 --json name,stargazerCount --jq '.[] | "\(.name): \(.stargazerCount) stars"'
```

### Bulk Operations

```bash
# Close all issues with specific label
gh issue list --label "wontfix" --json number --jq '.[].number' | xargs -I {} gh issue close {}

# List all open PRs across repos
gh search prs --author @me --state open
```

### Repository Health Check

```bash
# Check CI status
gh run list --limit 10 --json conclusion --jq 'group_by(.conclusion) | map({conclusion: .[0].conclusion, count: length})'

# List issues by label
gh issue list --json labels --jq '[.[].labels[].name] | group_by(.) | map({label: .[0], count: length})'
```

---

## 🆘 Troubleshooting

### Check Authentication

```bash
# Check auth status
gh auth status

# Refresh token
gh auth refresh

# Login again (if needed)
gh auth login
```

### View Logs

```bash
# Enable debug mode
GH_DEBUG=1 gh repo list

# View API calls
GH_DEBUG=api gh repo view
```

### Get Help

```bash
# General help
gh help

# Command-specific help
gh repo --help
gh issue create --help
gh pr merge --help
```

---

## 🎓 Pro Tips

### 1. Use Aliases for Common Commands

```bash
gh alias set co 'pr checkout'
gh alias set prs 'pr list --author @me'
gh alias set issues 'issue list --assignee @me'
```

### 2. Combine with jq for Powerful Queries

```bash
# Get repo URLs
gh repo list --json name,url --jq '.[] | .url'

# Count issues by state
gh issue list --json state --jq 'group_by(.state) | map({state: .[0].state, count: length})'
```

### 3. Use Environment Variables

```bash
# Set default repo
export GH_REPO="Raphasha27/Sumbandila-App"

# Now commands work without specifying repo
gh issue list
gh pr list
```

### 4. Automate with Scripts

```bash
# Create daily report
#!/bin/bash
echo "Daily GitHub Report"
echo "==================="
echo "Open Issues: $(gh issue list --state open --json number --jq 'length')"
echo "Open PRs: $(gh pr list --state open --json number --jq 'length')"
echo "Recent Runs: $(gh run list --limit 5 --json conclusion --jq 'group_by(.conclusion) | map({status: .[0].conclusion, count: length})')"
```

---

## 📚 Quick Reference Card

```bash
# Repositories
gh repo list                    # List repos
gh repo view                    # View current repo
gh repo create                  # Create new repo

# Issues
gh issue list                   # List issues
gh issue create                 # Create issue
gh issue close 123              # Close issue

# Pull Requests
gh pr list                      # List PRs
gh pr create                    # Create PR
gh pr merge 45                  # Merge PR
gh pr checkout 45               # Checkout PR

# Workflows
gh workflow list                # List workflows
gh workflow run "CI"            # Run workflow
gh run list                     # List runs

# Gists
gh gist list                    # List gists
gh gist create file.js          # Create gist

# Search
gh search repos "query"         # Search repos
gh search issues "query"        # Search issues

# API
gh api user                     # API call
gh api repos/owner/repo         # Repo API
```

---

## 🎯 Your Next Steps

1. ✅ **You're already authenticated** - Start using these commands now!
2. 📖 **Bookmark this guide** - Reference it whenever needed
3. 🔧 **Create aliases** - Make your workflow faster
4. 🤖 **Automate tasks** - Use scripts for repetitive work
5. 📧 **Contact GitHub Support** - For web access recovery

---

**You have full GitHub access via CLI!** 🚀

No web interface needed for:
- ✅ Managing repositories
- ✅ Creating/closing issues
- ✅ Creating/merging PRs
- ✅ Running workflows
- ✅ Creating releases
- ✅ Managing gists
- ✅ And much more!

---

**GitHub CLI Documentation**: https://cli.github.com/manual/  
**Your Profile**: https://github.com/Raphasha27  
**Your Repository**: https://github.com/Raphasha27/Sumbandila-App

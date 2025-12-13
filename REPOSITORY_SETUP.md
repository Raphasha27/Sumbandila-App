# Repository Configuration Guide

This document provides recommendations for configuring your GitHub repository for optimal collaboration and security.

## Branch Protection Rules

It's recommended to set up branch protection rules for your `main` branch to maintain code quality.

### Steps to Configure (Manual - on GitHub.com):

1. Go to your repository: https://github.com/Raphasha27/sumbandila-app
2. Click **Settings** > **Branches**
3. Click **Add rule** under "Branch protection rules"
4. Set **Branch name pattern**: `main`
5. Enable the following settings:

#### Required Settings:
- ✅ **Require a pull request before merging**
  - Require approvals: 1 (or more for team projects)
  - Dismiss stale pull request approvals when new commits are pushed
  
- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Add status checks:
    - `lint-and-test (Backend CI/CD)`
    - `lint-and-test (Expo App CI/CD)`
    - `integration-tests (Full Test Suite)`

- ✅ **Require conversation resolution before merging**

- ✅ **Do not allow bypassing the above settings**

#### Optional Settings:
- ✅ **Require linear history** (keeps commit history clean)
- ✅ **Include administrators** (apply rules to admins too)

## Repository Settings

### General Settings

1. **Features to Enable:**
   - ✅ Issues
   - ✅ Projects (for project management)
   - ✅ Discussions (for community)
   - ✅ Preserve this repository (important data)

2. **Pull Requests:**
   - ✅ Allow merge commits
   - ✅ Allow squash merging (recommended default)
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

### Secrets and Variables

Add these secrets for GitHub Actions (Settings > Secrets and variables > Actions):

#### Required for Expo Deployment:
```
EXPO_TOKEN - Get from https://expo.dev/settings/access-tokens
```

#### Optional (based on your deployment platform):
```
# For Heroku
HEROKU_API_KEY
HEROKU_APP_NAME
HEROKU_EMAIL

# For AWS
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY

# For Railway
RAILWAY_TOKEN

# For Vercel
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID

# For Netlify
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

### Environments

Create deployment environments (Settings > Environments):

1. **staging**
   - Protection rules: Enable required reviewers (optional)
   - Secrets: Stage-specific API keys

2. **production**
   - Protection rules: ✅ Required reviewers (1+)
   - Secrets: Production API keys

## Collaborators and Teams

If working with a team:

1. Go to **Settings** > **Collaborators and teams**
2. Add team members with appropriate permissions:
   - **Admin**: Full access
   - **Write**: Can push to non-protected branches
   - **Read**: Can view and clone

## Repository Topics

Add topics to make your repository discoverable:

1. Go to repository main page
2. Click the ⚙️ icon next to "About"
3. Add topics:
   - `expo`
   - `react-native`
   - `nodejs`
   - `express`
   - `professional-verification`
   - `accreditation`
   - `mobile-app`

## Security Settings

### Enable Security Features:

1. **Dependabot alerts**: ✅ Enabled
2. **Dependabot security updates**: ✅ Enabled
3. **Code scanning**: Consider enabling for automatic vulnerability detection
4. **Secret scanning**: ✅ Enabled (prevents committing secrets)

### Security Policy

A `SECURITY.md` file has been created at the root of your repository describing how to report security vulnerabilities.

## Issue Templates

Consider creating issue templates for:
- 🐛 Bug reports
- ✨ Feature requests
- 📚 Documentation improvements

## Labels

Recommended labels for issues and PRs:
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `backend` - Backend-related
- `frontend` - Expo app-related
- `admin` - Admin dashboard-related
- `ci/cd` - CI/CD related
- `deployment` - Deployment issues

## Webhooks (Optional)

Set up webhooks for integrations:
- Slack notifications
- Discord notifications
- Custom CI/CD triggers

## GitHub Pages (Optional)

If you want to host documentation:
1. **Settings** > **Pages**
2. Source: Deploy from a branch
3. Branch: `main` / docs folder
4. Save

## Quick Setup Checklist

- [ ] Configure branch protection rules for `main`
- [ ] Add required secrets for deployment
- [ ] Create staging and production environments
- [ ] Enable Dependabot alerts and security updates
- [ ] Add repository topics
- [ ] Add collaborators (if team project)
- [ ] Create issue templates
- [ ] Set up labels
- [ ] Configure auto-delete head branches
- [ ] Review and update repository description

## Additional Resources

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Expo GitHub Actions](https://docs.expo.dev/build/building-on-ci/)

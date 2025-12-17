# GitHub Fine-Grained Personal Access Token Setup

## Quick Reference Guide for Sumbandila Project

Follow these settings when creating your token on GitHub:

---

## 🔧 Token Configuration

### Basic Settings

**Token name:**
```
sumbandila-deployment-token
```

**Description:**
```
Token for Sumbandila app deployment, CI/CD workflows, and Git operations
```

**Expiration:**
- **Recommended**: 90 days (good balance of security and convenience)
- **Alternative**: Custom date (if you need longer)

**Resource owner:**
- Select: **Raphasha27** (your GitHub username)

---

## 📦 Repository Access

**Select:** ✅ **Only select repositories**

**Choose repository:**
- ✅ `sumbandila_full_mvp` (or your repository name)

---

## 🔐 Permissions

### Repository Permissions

Set these **four** permissions:

| Permission | Access Level | Purpose |
|------------|--------------|---------|
| **Contents** | ✅ **Read and write** | Push/pull code, create releases, manage files |
| **Workflows** | ✅ **Read and write** | Trigger GitHub Actions, manage workflow runs |
| **Secrets** | ✅ **Read and write** | Manage repository secrets (EXPO_TOKEN, etc.) |
| **Metadata** | ✅ **Read-only** | Repository metadata (auto-included) |

### Account Permissions

**None required** - Leave all account permissions blank

---

## ✅ Final Checklist

Before clicking "Generate token":

- [ ] Token name is descriptive
- [ ] Expiration date is set (recommended: 90 days)
- [ ] Repository access is "Only select repositories"
- [ ] Correct repository is selected
- [ ] **Contents** = Read and write
- [ ] **Workflows** = Read and write  
- [ ] **Secrets** = Read and write
- [ ] **Metadata** = Read-only (automatic)

---

## 📋 After Token Generation

1. **Copy the token immediately** - You won't be able to see it again!
2. **Save it securely**:
   - Save to password manager (1Password, Bitwarden, etc.)
   - Or store in environment variable
3. **Test the token**:
   ```bash
   # Clone or push using the token
   git clone https://YOUR_TOKEN@github.com/Raphasha27/sumbandila-app.git
   ```

---

## 🔄 Using the Token

### For Git Operations (HTTPS)

```bash
# Set up credential helper (recommended)
git config --global credential.helper store

# On first push/pull, use:
# Username: Raphasha27
# Password: YOUR_TOKEN_HERE
```

### For GitHub CLI

```bash
echo "YOUR_TOKEN_HERE" | gh auth login --with-token
```

### For Environment Variable

```bash
# Windows (PowerShell)
$env:GITHUB_TOKEN = "YOUR_TOKEN_HERE"

# Linux/Mac
export GITHUB_TOKEN="YOUR_TOKEN_HERE"
```

---

## 🔒 Security Best Practices

- ✅ Never commit the token to your repository
- ✅ Store in `.env` (already in `.gitignore`)
- ✅ Use GitHub Secrets for CI/CD workflows
- ✅ Set expiration dates and rotate regularly
- ✅ Use minimum required permissions
- ✅ Revoke immediately if compromised

---

## ❓ Troubleshooting

### Permission Denied Error
- Verify token has "Contents: Read and write" permission
- Check repository access includes `sumbandila_full_mvp`

### Workflow Trigger Fails
- Confirm "Workflows: Read and write" is enabled
- Check token hasn't expired

### Need to Add More Repositories Later
- Go to: Settings → Developer settings → Personal access tokens → Fine-grained tokens
- Click your token → Edit → Add repositories

---

## 📚 Resources

- [GitHub Token Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
- [About Fine-Grained PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token)

---

**Created:** 2025-12-13  
**Project:** Sumbandila App  
**Repository:** Raphasha27/sumbandila-app

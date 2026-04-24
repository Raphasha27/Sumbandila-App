# Node.js Installation Guide for Sumbandila

## Problem
```
npm : The term 'npm' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

This means Node.js is not installed or not configured in your system PATH.

---

## Solution: Install Node.js

### Option 1: Install Node.js Directly (Recommended)

#### Step 1: Download Node.js v22
1. Go to: https://nodejs.org/en/download/
2. Download **Windows Installer (.msi)** for Node.js 22.x LTS
3. Run the installer
4. **Important:** Check "Add to PATH" during installation
5. Complete the installation

#### Step 2: Verify Installation
Open a **NEW** PowerShell window and run:
```powershell
node --version
npm --version
```

Expected output:
```
v22.x.x
10.x.x
```

#### Step 3: Install Dependencies
```powershell
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila
npm install
```

---

### Option 2: Use nvm-windows (Node Version Manager)

This is the **recommended approach** for developers as it allows multiple Node versions.

#### Step 1: Install nvm-windows
1. Download from: https://github.com/coreybutler/nvm-windows/releases
2. Get the latest `nvm-setup.exe`
3. Run the installer
4. Complete installation

#### Step 2: Install Node.js 22
Open **NEW** PowerShell as Administrator:
```powershell
nvm install 22
nvm use 22
nvm alias default 22
```

#### Step 3: Verify
```powershell
node --version
npm --version
```

#### Step 4: Install Dependencies
```powershell
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila
npm install
```

---

### Option 3: Use Chocolatey Package Manager

If you have Chocolatey installed:

```powershell
# Install Node.js
choco install nodejs-lts

# Refresh environment
refreshenv

# Verify
node --version
npm --version

# Install dependencies
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila
npm install
```

---

## After Installing Node.js

### 1. Install Project Dependencies
```powershell
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila
npm install
```

This will install:
- ✅ jspdf v4.2.1
- ✅ dompurify v3.4.0
- ✅ @types/dompurify v3.0.5
- ✅ All other dependencies from package.json

### 2. Verify Installation
```powershell
# Check if packages are installed
npm list jspdf dompurify
```

### 3. Run Development Server
```powershell
npm run dev:web
```

Or for the web app specifically:
```powershell
cd apps\web
npm run dev
```

---

## Troubleshooting

### Issue: "npm" still not recognized after installation

**Solution 1:** Restart PowerShell
- Close all PowerShell windows
- Open a new one
- Try `npm --version` again

**Solution 2:** Check PATH manually
```powershell
$env:Path -split ';' | Select-String -Pattern "node"
```

Should show something like:
```
C:\Program Files\nodejs\
```

**Solution 3:** Add to PATH manually
1. Open System Properties → Advanced → Environment Variables
2. Under "System variables", find "Path"
3. Add: `C:\Program Files\nodejs\`
4. Restart PowerShell

### Issue: Permission errors during npm install

**Solution:** Run as Administrator
```powershell
# Right-click PowerShell → Run as Administrator
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila
npm install
```

### Issue: Network/Proxy errors

**Solution:** Configure npm proxy (if behind corporate firewall)
```powershell
npm config set proxy http://your-proxy:port
npm config set https-proxy http://your-proxy:port
npm install
```

---

## Quick Start Commands

Once Node.js is installed, here's your workflow:

```powershell
# Navigate to project
cd C:\Users\CAPACITI-JHB\Desktop\Sumbandila

# Install all dependencies (first time only)
npm install

# Run web development server
npm run dev:web

# Run backend server
npm run dev:backend

# Run all verification checks
npm run verify:all

# Build for production
npm run build
```

---

## Verify Everything Works

### 1. Test TypeScript Compilation
```powershell
cd apps\web
npm run build
```

Should complete without errors.

### 2. Test PDF Generation
Open `apps\web\index.html` in browser and:
- Search for "Jane Smith"
- Click "Download Certificate PDF"
- Should download a PDF file

### 3. Test Security Features
Try entering in search box:
```
<script>alert('xss')</script>
```

Should show error: "Invalid characters detected in search query"

---

## What Gets Installed

### Root Level (`C:\Users\CAPACITI-JHB\Desktop\Sumbandila`)
```
node_modules/
package-lock.json
```

### Web App (`apps\web`)
```
node_modules/
- jspdf/
- dompurify/
- @types/dompurify/
- react/
- react-dom/
- lucide-react/
- framer-motion/
- vite/
- typescript/
```

---

## Next Steps After Installation

1. ✅ **Install Node.js** (follow steps above)
2. ✅ **Run `npm install`** in project root
3. ✅ **Test the app** with `npm run dev:web`
4. ✅ **Verify CI workflows** push to GitHub
5. ✅ **Check Actions tab** for green checkmarks

---

## System Requirements

- **OS:** Windows 10/11
- **RAM:** 4GB minimum (8GB recommended)
- **Disk:** 500MB free space
- **Node.js:** v22.x (as specified in `.nvmrc`)
- **npm:** v10.x (comes with Node.js)

---

## Need Help?

If you encounter issues:
1. Check Node.js version: `node --version` (should be 22.x)
2. Check npm version: `npm --version` (should be 10.x)
3. Clear npm cache: `npm cache clean --force`
4. Delete node_modules and reinstall:
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

---

**Status:** Node.js installation required before running npm commands
**Priority:** High - blocks all development work
**Time to fix:** 5-10 minutes

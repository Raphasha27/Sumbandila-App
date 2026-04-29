@echo off
SET "NODE_DIR=%~dp0node_portable\node-v20.12.2-win-x64"
SET "PATH=%NODE_DIR%;%PATH%"
SET "NPM_CLI=%NODE_DIR%\node_modules\npm\bin\npm-cli.js"

echo [Opsly] Starting Cloud-Portable Node.js environment...
echo [Opsly] This will launch your project without installing anything on your Windows system.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [Opsly] First-time setup: Installing dependencies...
    node "%NPM_CLI%" install
)

echo [Opsly] Launching Localhost Dashboard...
node "%NPM_CLI%" run dev
pause

# Sumbandila Python Bootstrapper
# Uses the locally installed 'uv' to set up Python and dependencies

$UV_PATH = "$HOME\.local\bin\uv.exe"

if (!(Test-Path $UV_PATH)) {
    Write-Host "✗ uv.exe not found. Please run the installer again." -ForegroundColor Red
    exit 1
}

Write-Host "🛡️ Initializing Sumbandila Python Environment..." -ForegroundColor Cyan

# 1. Install Python using uv (Bypasses 'No base Python found')
Write-Host "🐍 Installing Python 3.11 via uv..." -ForegroundColor Yellow
& $UV_PATH python install 3.11

# 2. Create Virtual Environment
Write-Host "📦 Creating virtual environment (.venv)..." -ForegroundColor Yellow
& $UV_PATH venv .venv

# 3. Install Dependencies
Write-Host "🧪 Installing dependencies from requirements.txt..." -ForegroundColor Yellow
& $UV_PATH pip install -r requirements.txt

Write-Host "`n🛡️ Environment Ready!" -ForegroundColor Green
Write-Host "To activate, run: .\.venv\Scripts\Activate.ps1" -ForegroundColor Cyan

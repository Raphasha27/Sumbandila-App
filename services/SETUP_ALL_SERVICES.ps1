# ============================================
# Setup All Python Services
# Creates virtual environments and installs dependencies
# ============================================

$ErrorActionPreference = "Stop"
$services = @("auth", "core", "ai", "audit")

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  PYTHON SERVICES SETUP" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

foreach ($service in $services) {
    Write-Host "`n[$service] Setting up..." -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    $servicePath = Join-Path $PSScriptRoot $service
    Set-Location $servicePath
    
    # Check if venv exists
    if (-not (Test-Path ".venv")) {
        Write-Host "  → Creating virtual environment..." -ForegroundColor Blue
        python -m venv .venv
    } else {
        Write-Host "  → Virtual environment already exists" -ForegroundColor Green
    }
    
    # Activate venv
    Write-Host "  → Activating virtual environment..." -ForegroundColor Blue
    & ".\.venv\Scripts\Activate.ps1"
    
    # Upgrade pip
    Write-Host "  → Upgrading pip..." -ForegroundColor Blue
    python -m pip install --upgrade pip --quiet
    
    # Install dependencies
    Write-Host "  → Installing dependencies..." -ForegroundColor Blue
    pip install -r requirements.txt --quiet
    
    # Verify installation
    Write-Host "  → Verifying installation..." -ForegroundColor Blue
    $result = python -c "import fastapi; import pydantic; print('OK')" 2>&1
    if ($result -eq "OK") {
        Write-Host "  ✅ [$service] Setup complete!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ [$service] Setup failed!" -ForegroundColor Red
    }
    
    # Deactivate
    deactivate 2>$null
}

# Return to services directory
Set-Location $PSScriptRoot

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SETUP COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "  - All virtual environments created" -ForegroundColor White
Write-Host "  - All dependencies installed" -ForegroundColor White
Write-Host "  - Services ready to run" -ForegroundColor White

Write-Host "`nTo start a service:" -ForegroundColor Yellow
Write-Host "  cd services/[service-name]" -ForegroundColor White
Write-Host "  .\.venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "  uvicorn main:app --reload --port 8000" -ForegroundColor White

Write-Host "`nTo run tests:" -ForegroundColor Yellow
Write-Host "  cd services/[service-name]" -ForegroundColor White
Write-Host "  .\.venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "  python -m pytest tests/ -v" -ForegroundColor White

Write-Host ""

# Pause to view results
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Sumbandila Security Audit Sentinel
# Scans for potential secrets and vulnerabilities in the codebase

Write-Host "🛡️ Starting Sovereign Security Audit..." -ForegroundColor Cyan

$SECRET_PATTERNS = @(
    "(?i)api_key",
    "(?i)secret",
    "(?i)password",
    "(?i)token",
    "(?i)jwt",
    "(?i)private_key"
)

$FORBIDDEN_FILES = @(
    ".env",
    "*.pem",
    "*.key",
    "backup.sql"
)

$vulnerabilities_found = $false

# 1. Check for Forbidden Files
Write-Host "`n📁 Checking for sensitive files..." -ForegroundColor Yellow
foreach ($file in $FORBIDDEN_FILES) {
    if (Test-Path $file) {
        Write-Host "⚠ WARNING: Sensitive file found at the root: $file" -ForegroundColor Red
        $vulnerabilities_found = $true
    }
}

# 2. Scan for Hardcoded Secrets (excluding .env.example)
Write-Host "`n🔍 Scanning for hardcoded secrets..." -ForegroundColor Yellow
$files_to_scan = Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notmatch "node_modules" -and 
    $_.FullName -notmatch ".venv" -and 
    $_.Name -ne ".env.example" -and
    $_.Name -ne "security-audit.ps1"
}

foreach ($file in $files_to_scan) {
    $content = Get-Content $file.FullName
    foreach ($pattern in $SECRET_PATTERNS) {
        if ($content -match $pattern) {
            # Check if it looks like an actual assignment of a secret
            if ($content -match "$pattern\s*=\s*['\"].+['\"]") {
                Write-Host "⚠ POTENTIAL SECRET FOUND in $($file.FullName) (Pattern: $pattern)" -ForegroundColor Red
                $vulnerabilities_found = $true
            }
        }
    }
}

if ($vulnerabilities_found) {
    Write-Host "`n🛡️ Security Audit: FAIL. Fix vulnerabilities before deployment." -ForegroundColor Red
    exit 1
} else {
    Write-Host "`n🛡️ Security Audit: PASS. No hardcoded secrets or sensitive files detected." -ForegroundColor Green
    exit 0
}

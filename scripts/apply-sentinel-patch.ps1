# 🛡️ Sentinel Patch Utility: Next.js DoS Fix [GHSA-q4gf-8mx6-v5v3]
# Use this to automate version bumps for vulnerable Next.js instances.

param(
    [string]$TargetVersion = "14.2.10",
    [string]$Workspace = "C:\Users\CAPACITI-JHB\Desktop"
)

Write-Host "🛡️ Starting Sentinel Patch Gate..." -ForegroundColor Cyan

# 1. Locate all package.json files
$packages = Get-ChildItem -Path $Workspace -Filter "package.json" -Recurse -ErrorAction SilentlyContinue | 
            Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($pkg in $packages) {
    Write-Host "`n🔍 Checking $($pkg.FullName)..." -ForegroundColor Yellow
    
    $content = Get-Content $pkg.FullName | ConvertFrom-Json
    $updated = $false

    if ($content.dependencies.next) {
        Write-Host "  Found 'next' dependency: $($content.dependencies.next)" -ForegroundColor Gray
        $content.dependencies.next = "^$TargetVersion"
        $updated = $true
    }

    if ($content.devDependencies.next) {
        Write-Host "  Found 'next' devDependency: $($content.devDependencies.next)" -ForegroundColor Gray
        $content.devDependencies.next = "^$TargetVersion"
        $updated = $true
    }

    if ($updated) {
        $content | ConvertTo-Json -Depth 20 | Out-File $pkg.FullName -Encoding UTF8
        Write-Host "  ✅ PATCH APPLIED: Next.js -> $TargetVersion" -ForegroundColor Green
    } else {
        Write-Host "  ✓ No Next.js dependency found." -ForegroundColor DarkGray
    }
}

Write-Host "`n🛡️ Patching process complete. Ensure you run 'npm install' and 'git push' for each repo." -ForegroundColor Cyan

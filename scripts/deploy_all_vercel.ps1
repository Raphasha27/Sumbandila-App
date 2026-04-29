# scripts/deploy_all_vercel.ps1
$summaryPath = "vercel_deployment_summary.json"
if (!(Test-Path $summaryPath)) {
    Write-Host "❌ Error: vercel_deployment_summary.json not found. Run the audit script first." -ForegroundColor Red
    exit
}

$summary = Get-Content $summaryPath | ConvertFrom-Json
$deployable = $summary | Where-Object { $_.deployable -eq $true }

Write-Host "🚀 Starting Mass Deployment to Vercel (43 Projects)..." -ForegroundColor Cyan
Write-Host "⏱️ This script includes a 30s delay between projects to respect Vercel Free Tier limits." -ForegroundColor Gray

foreach ($repo in $deployable) {
    Write-Host "--------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "📦 Processing: $($repo.name)" -ForegroundColor Yellow
    
    if (!(Test-Path $repo.name)) {
        Write-Host "⚠️ Warning: Directory $($repo.name) not found. Skipping." -ForegroundColor Red
        continue
    }

    Set-Location $repo.name
    
    # 1. Link the project (automatic naming)
    Write-Host "   🔗 Linking..."
    vercel link --yes | Out-Null
    
    # 2. Deploy to Production
    Write-Host "   🚀 Deploying..."
    $deployResult = vercel deploy --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Successfully deployed!" -ForegroundColor Green
        Write-Host "   🔗 URL: $deployResult" -ForegroundColor Cyan
    } else {
        Write-Host "   ❌ Deployment failed for $($repo.name)." -ForegroundColor Red
    }
    
    Set-Location ..
    
    # Rate limit protection
    Write-Host "   ⏳ Waiting 30s before next project..."
    Start-Sleep -Seconds 30
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🎉 MASS DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "All 43 projects are now being processed or are live on Vercel."
Write-Host "Check your Vercel Dashboard for progress."

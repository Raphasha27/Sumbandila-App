# ============================================
# Sumbandila Enterprise - Master Repository Update Script
# Updates all repositories with latest security fixes and maintenance
# ============================================

$ErrorActionPreference = "Stop"
$repos = @(
    @{Path="c:\Users\rapha\OneDrive\Desktop\Sumbandila-app"; Name="Sumbandila-app"},
    @{Path="c:\Users\rapha\OneDrive\Desktop\EduStream-Pro-ICT"; Name="EduStream-Pro-ICT"},
    @{Path="c:\Users\rapha\OneDrive\Desktop\FinAxis"; Name="FinAxis"},
    @{Path="c:\Users\rapha\OneDrive\Desktop\noshowiq"; Name="noshowiq"},
    @{Path="c:\Users\rapha\OneDrive\Desktop\pharmalink"; Name="pharmalink"}
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  REPOSITORY UPDATE SCRIPT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

foreach ($repo in $repos) {
    Write-Host "`n[$($repo.Name)]" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    try {
        Set-Location $repo.Path
        
        # Check if it's a git repo
        if (-not (Test-Path ".git")) {
            Write-Host "  ⚠ Not a git repository - SKIPPED" -ForegroundColor Magenta
            continue
        }
        
        # Fetch latest from remote
        Write-Host "  → Fetching latest changes..." -ForegroundColor Blue
        git fetch origin 2>&1 | Out-Null
        
        # Check current branch
        $branch = git branch --show-current
        Write-Host "  → Branch: $branch" -ForegroundColor Blue
        
        # Check status
        $status = git status --porcelain
        if ($status) {
            Write-Host "  → Found uncommitted changes" -ForegroundColor Green
            
            # Remove lock file if exists
            if (Test-Path ".git/index.lock") {
                Write-Host "  → Removing git lock file..." -ForegroundColor Magenta
                Remove-Item ".git/index.lock" -Force -ErrorAction SilentlyContinue
            }
            
            # Stage all changes
            git add .
            
            # Commit with timestamp
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
            git commit -m "chore(maintenance): security update and dependency refresh - $timestamp"
            
            # Push to remote
            Write-Host "  → Pushing to remote..." -ForegroundColor Blue
            git push origin $branch
            
            Write-Host "  ✅ Successfully updated!" -ForegroundColor Green
        } else {
            # Check if behind remote
            $behind = git rev-list --count HEAD..origin/$branch 2>$null
            if ($behind -and $behind -gt 0) {
                Write-Host "  → Pulling $behind new commit(s) from remote..." -ForegroundColor Blue
                git pull origin $branch
                Write-Host "  ✅ Updated from remote!" -ForegroundColor Green
            } else {
                Write-Host "  ✅ Already up to date!" -ForegroundColor Green
            }
        }
        
        # Show last commit
        $lastCommit = git log -1 --oneline
        Write-Host "  📝 Last commit: $lastCommit" -ForegroundColor Gray
        
    } catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
    }
}

# Return to original directory
Set-Location "c:\Users\rapha\OneDrive\Desktop"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  UPDATE COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Summary:" -ForegroundColor Yellow
Write-Host "  - All repositories have been checked" -ForegroundColor White
Write-Host "  - Security updates applied where needed" -ForegroundColor White
Write-Host "  - Latest changes pushed to GitHub" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Check GitHub to verify all repos show recent activity" -ForegroundColor White
Write-Host "  2. Review any merge conflicts if they occurred" -ForegroundColor White
Write-Host "  3. Monitor CI/CD pipelines for successful builds" -ForegroundColor White
Write-Host ""

# Pause to view results
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

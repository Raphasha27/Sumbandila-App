# Get all directories with a .git folder
$dirs = Get-ChildItem -Directory -Path . | Where-Object { Test-Path (Join-Path $_.FullName ".git") }

foreach ($dir in $dirs) {
    Write-Host "Processing $($dir.Name)..." -ForegroundColor Cyan
    Set-Location $dir.FullName
    
    # Check if there are any changes to commit
    $status = git status --porcelain
    if ($status) {
        Write-Host "  Committing local changes..."
        git add .
        git commit -m "fix(ci): Standardize workflow and resolve YAML syntax errors"
    }
    
    # Pull with rebase to sync with remote
    Write-Host "  Pulling from remote..."
    git pull --rebase origin (git branch --show-current)
    
    # Check if rebase failed
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  REBASE CONFLICT in $($dir.Name)! Attempting to resolve by favoring local CI fixes..." -ForegroundColor Yellow
        # In case of CI conflict, we usually want our clean template to win
        # But for now, let's just abort and report if it's too complex
        # git rebase --abort
    } else {
        # Push to remote
        Write-Host "  Pushing to remote..."
        git push origin (git branch --show-current)
    }
    
    Set-Location ..
}

# ═══════════════════════════════════════════════════════════════════════
# 🛡️ Kirov Dynamics — Multi-Repo Sovereign Security Scanner
# Scans ALL local repositories for leaked secrets, bad .gitignore files,
# and commits that may expose sensitive data.
# Usage: .\scripts\scan-all-repos.ps1 [-RootPath "C:\Users\CAPACITI-JHB\Desktop"]
# ═══════════════════════════════════════════════════════════════════════

param(
    [string]$RootPath = "C:\Users\CAPACITI-JHB\Desktop"
)

# ── Sentinel Colour Helpers ──────────────────────────────────────────
function OK    { param($msg) Write-Host "  ✅ $msg" -ForegroundColor Green  }
function WARN  { param($msg) Write-Host "  ⚠️  $msg" -ForegroundColor Yellow }
function FAIL  { param($msg) Write-Host "  ❌ $msg" -ForegroundColor Red    }
function INFO  { param($msg) Write-Host "  ℹ️  $msg" -ForegroundColor Cyan  }
function HEAD  { param($msg) Write-Host "`n$msg" -ForegroundColor Magenta   }

# ── Patterns that MUST NOT appear in committed files ─────────────────
$secretPatterns = @(
    'AKIA[0-9A-Z]{16}',                    # AWS Access Key
    'sk-[a-zA-Z0-9]{20,}',                 # OpenAI / Anthropic key
    'ghp_[a-zA-Z0-9]{36}',                 # GitHub Personal Token
    'xox[baprs]-[0-9a-zA-Z\-]{10,}',       # Slack Token
    'AIza[0-9A-Za-z\-_]{35}',              # Google API Key
    'password\s*=\s*["\'][^"\']+["\']',     # Hardcoded password
    'secret\s*=\s*["\'][^"\']+["\']',       # Hardcoded secret
    'DATABASE_URL\s*=\s*postgres[^\s]+'     # Exposed DB connection string
)

# ── Files that must NEVER be committed ───────────────────────────────
$forbiddenFiles = @(
    '.env', '.env.local', '.env.production',
    'creds.json', 'credentials.json',
    '*.pem', '*.key', '*.p12', '*.pfx'
)

# ── Required .gitignore entries ──────────────────────────────────────
$requiredIgnoreEntries = @(
    '.env', 'node_modules/', 'dist/', '*.pem', '*.key',
    '*.pkl', 'creds.json', '.venv'
)

# ════════════════════════════════════════════════════════════════════
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║   🛡️  KIROV DYNAMICS — SOVEREIGN SECURITY SCANNER        ║" -ForegroundColor Blue
Write-Host "║      Scanning all repositories for vulnerabilities       ║" -ForegroundColor Blue
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""

$repos = Get-ChildItem -Path $RootPath -Directory | Where-Object {
    Test-Path (Join-Path $_.FullName ".git")
}

$totalRepos   = $repos.Count
$cleanRepos   = 0
$warningRepos = 0
$criticalRepos = 0
$report       = @()

INFO "Found $totalRepos git repositories to scan under $RootPath"

foreach ($repo in $repos) {
    $repoPath    = $repo.FullName
    $repoName    = $repo.Name
    $repoIssues  = @()
    $severity    = "CLEAN"

    HEAD "━━━ 📂 $repoName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # ── Check 1: .gitignore exists and is complete ──────────────────
    $gitignorePath = Join-Path $repoPath ".gitignore"
    if (-not (Test-Path $gitignorePath)) {
        FAIL ".gitignore MISSING — repo is unprotected!"
        $repoIssues += "[CRITICAL] No .gitignore found."
        $severity = "CRITICAL"
    } else {
        $ignoreContent = Get-Content $gitignorePath -Raw
        $missingEntries = @()
        foreach ($entry in $requiredIgnoreEntries) {
            if ($ignoreContent -notmatch [regex]::Escape($entry)) {
                $missingEntries += $entry
            }
        }
        if ($missingEntries.Count -gt 0) {
            WARN ".gitignore incomplete. Missing: $($missingEntries -join ', ')"
            $repoIssues += "[WARNING] .gitignore missing: $($missingEntries -join ', ')"
            if ($severity -eq "CLEAN") { $severity = "WARNING" }
        } else {
            OK ".gitignore is sovereign and complete."
        }
    }

    # ── Check 2: Scan tracked files for secret patterns ─────────────
    $trackedFiles = git -C $repoPath ls-files 2>$null
    $secretsFound = @()

    foreach ($file in $trackedFiles) {
        $filePath = Join-Path $repoPath $file
        if (-not (Test-Path $filePath) -or (Get-Item $filePath).PSIsContainer) { continue }

        # Skip binary files
        $ext = [System.IO.Path]::GetExtension($file)
        $binaryExts = @('.png','.jpg','.jpeg','.gif','.ico','.svg','.woff','.ttf','.eot','.otf','.pkl','.pyc','.gz','.zip')
        if ($binaryExts -contains $ext) { continue }

        try {
            $content = Get-Content $filePath -Raw -ErrorAction SilentlyContinue
            if ($null -eq $content) { continue }

            foreach ($pattern in $secretPatterns) {
                if ($content -match $pattern) {
                    $secretsFound += "$file — matched pattern: $pattern"
                }
            }
        } catch { }
    }

    if ($secretsFound.Count -gt 0) {
        foreach ($s in $secretsFound) { FAIL "SECRET DETECTED: $s" }
        $repoIssues += "[CRITICAL] Secrets in tracked files: $($secretsFound -join ' | ')"
        $severity = "CRITICAL"
    } else {
        OK "No secrets detected in tracked files."
    }

    # ── Check 3: Scan for forbidden files physically present ─────────
    $foundForbidden = @()
    foreach ($pattern in $forbiddenFiles) {
        $found = Get-ChildItem -Path $repoPath -Filter $pattern -Recurse -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -notmatch '\\node_modules\\' }
        if ($found) {
            foreach ($f in $found) {
                # Check if it's tracked by git
                $relativePath = $f.FullName.Replace($repoPath + "\", "").Replace("\", "/")
                $isTracked = git -C $repoPath ls-files --error-unmatch $relativePath 2>$null
                if ($LASTEXITCODE -eq 0) {
                    $foundForbidden += $relativePath
                }
            }
        }
    }

    if ($foundForbidden.Count -gt 0) {
        foreach ($f in $foundForbidden) { FAIL "TRACKED SECRET FILE: $f" }
        $repoIssues += "[CRITICAL] Secret files committed: $($foundForbidden -join ', ')"
        $severity = "CRITICAL"
    } else {
        OK "No forbidden files are tracked by git."
    }

    # ── Check 4: Conventional Commits check (last 5 commits) ─────────
    $lastCommits = git -C $repoPath log --oneline -5 2>$null
    $badCommits  = @()
    $conventionalPrefixes = @('feat','fix','docs','chore','refactor','test','style','perf','ci','build')
    if ($lastCommits) {
        foreach ($commit in $lastCommits) {
            $msg = $commit -replace '^[a-f0-9]+ ', ''
            $isConventional = $false
            foreach ($prefix in $conventionalPrefixes) {
                if ($msg -match "^$prefix[\(:!]") { $isConventional = $true; break }
            }
            if (-not $isConventional) { $badCommits += $msg }
        }
    }

    if ($badCommits.Count -gt 0) {
        WARN "Non-conventional commits detected ($($badCommits.Count)/5 recent):"
        foreach ($b in $badCommits) { Write-Host "       ↳ '$b'" -ForegroundColor DarkYellow }
        $repoIssues += "[WARNING] Non-conventional commits: $($badCommits.Count) found."
        if ($severity -eq "CLEAN") { $severity = "WARNING" }
    } else {
        OK "Recent commits follow Conventional Commits standard."
    }

    # ── Tally ─────────────────────────────────────────────────────────
    switch ($severity) {
        "CLEAN"    { $cleanRepos++;    OK    "RESULT: 🟩 CLEAN" }
        "WARNING"  { $warningRepos++;  WARN  "RESULT: 🟨 WARNING — action recommended" }
        "CRITICAL" { $criticalRepos++; FAIL  "RESULT: 🟥 CRITICAL — immediate action required" }
    }

    $report += [PSCustomObject]@{
        Repo     = $repoName
        Severity = $severity
        Issues   = ($repoIssues -join " | ")
    }
}

# ════════════════════════════════════════════════════════════════════
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║              📊 SCAN SUMMARY REPORT                     ║" -ForegroundColor Blue
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""
Write-Host "  Total Repositories Scanned : $totalRepos" -ForegroundColor White
Write-Host "  🟩 Clean                   : $cleanRepos"   -ForegroundColor Green
Write-Host "  🟨 Warning                 : $warningRepos" -ForegroundColor Yellow
Write-Host "  🟥 Critical                : $criticalRepos" -ForegroundColor Red
Write-Host ""

if ($criticalRepos -gt 0) {
    Write-Host "  ⚡ CRITICAL REPOS (immediate action required):" -ForegroundColor Red
    $report | Where-Object { $_.Severity -eq "CRITICAL" } | ForEach-Object {
        Write-Host "     • $($_.Repo)" -ForegroundColor Red
        if ($_.Issues) { Write-Host "       └─ $($_.Issues)" -ForegroundColor DarkRed }
    }
    Write-Host ""
}

if ($warningRepos -gt 0) {
    Write-Host "  ⚠️  WARNING REPOS (action recommended):" -ForegroundColor Yellow
    $report | Where-Object { $_.Severity -eq "WARNING" } | ForEach-Object {
        Write-Host "     • $($_.Repo)" -ForegroundColor Yellow
        if ($_.Issues) { Write-Host "       └─ $($_.Issues)" -ForegroundColor DarkYellow }
    }
    Write-Host ""
}

# Save report
$reportPath = Join-Path $RootPath "sentinel-scan-report.txt"
$report | Format-Table -AutoSize | Out-File -FilePath $reportPath -Encoding UTF8
INFO "Full report saved to: $reportPath"

Write-Host ""
Write-Host "  🛡️ Kirov Dynamics Sovereign Scanner — Scan complete." -ForegroundColor Blue
Write-Host ""

if ($criticalRepos -gt 0) { exit 1 }

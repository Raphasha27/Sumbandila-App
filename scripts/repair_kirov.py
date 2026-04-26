import os
import re
import subprocess
from pathlib import Path

def run_cmd(cmd, cwd=None):
    try:
        result = subprocess.run(cmd, cwd=cwd, shell=True, check=True, capture_output=True, text=True)
        return True, result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return False, e.stderr.strip()

def repair_workflow(file_path: Path):
    print(f"  Repairing: {file_path}")
    content = file_path.read_text(errors="ignore")
    
    # 1. Standardize Header (name and on:)
    # Find name
    name_match = re.search(r"^name:\s*(.*)", content, re.MULTILINE)
    name = name_match.group(1).strip() if name_match else "CI"
    
    # Standard header block
    header = f"""name: {name}

on:
  workflow_dispatch:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:"""
    
    if "jobs:" in content:
        # Replace everything before 'jobs:' with our standard header
        content = re.sub(r"(?s)^.*?jobs:", header, content)
    else:
        # If no jobs found (rare), just prepend
        content = header + "\n" + content

    # 2. Fix 'runs-on' corruption
    # Patterns: 
    #   runs-on: steps:
    #   runs-on: -
    #   runs-on: run: ...
    content = re.sub(r"runs-on:.*", "runs-on: ubuntu-latest", content)
    
    # 3. Fix 'node-version' and 'python-version' corruption
    # Pattern: node-version: cache: 'npm'
    content = re.sub(r"node-version:.*", "node-version: 20", content)
    # Pattern: python-version: -
    content = re.sub(r"python-version:.*", "python-version: '3.11'", content)

    # 4. Fix missing/mangled 'steps:' or 'uses:'
    # Sometimes 'steps:' is followed by 'uses:' on the same line or similar
    # We want to ensure 'steps:' is on its own line and steps start with '- uses:'
    
    # Fix 'runs-on: ubuntu-latest steps:' (if it happened)
    content = content.replace("runs-on: ubuntu-latest steps:", "runs-on: ubuntu-latest\n    steps:")
    
    # 5. Fix missing 'steps:' keyword
    # If a line starts with '    - ' and the preceding lines don't have 'steps:'
    # We'll use a more robust approach: for each job (which has runs-on), 
    # ensure there's a steps: keyword before the first '- '
    new_content = []
    lines = content.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        new_content.append(line)
        if "runs-on:" in line and "steps:" not in content[content.find(line):content.find(line)+100]:
            # Peek ahead to see if there's a list item starting soon
            found_steps = False
            for j in range(i + 1, min(i + 5, len(lines))):
                if lines[j].strip().startswith("-"):
                    new_content.append("    steps:")
                    found_steps = True
                    break
                if "steps:" in lines[j]:
                    found_steps = True
                    break
        i += 1
    content = "\n".join(new_content)

    # 6. Fix indentation for common fields
    lines = content.splitlines()
    fixed_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("- name:") or stripped.startswith("- uses:") or stripped.startswith("- run:"):
            fixed_lines.append("      " + stripped)
        elif stripped.startswith("name:") or stripped.startswith("run:") or stripped.startswith("uses:") or stripped.startswith("with:"):
            # If it's not a root key and not already indented correctly
            if not any(line.startswith(k) for k in ["name:", "on:", "jobs:", "  "]):
                fixed_lines.append("        " + stripped)
            else:
                fixed_lines.append(line)
        else:
            fixed_lines.append(line)
    content = "\n".join(fixed_lines)

    # 7. Final cleanup of common corruption
    content = content.replace("main", "master")
    content = content.replace("[ master, master ]", "[ master ]")
    
    # Standardize Action Versions
    content = content.replace("actions/checkout@v2", "actions/checkout@v4")
    content = content.replace("actions/checkout@v3", "actions/checkout@v4")
    content = content.replace("actions/setup-node@v2", "actions/setup-node@v4")
    content = content.replace("actions/setup-node@v3", "actions/setup-node@v4")
    content = content.replace("actions/setup-python@v4", "actions/setup-python@v5")

    # 7. Ensure Trivy Security Scan Job
    if "security_scan:" not in content:
        trivy_job = """
  security_scan:
    name: Security Scan (Trivy)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          ignore-unfixed: true
          format: 'table'
          exit-code: '0'
          severity: 'CRITICAL,HIGH'
"""
        content = content.rstrip() + "\n" + trivy_job

    file_path.write_text(content)

def main():
    root = Path.cwd()
    print(f"Starting Kirov Dynamics -- Robust CI Repair in {root}")
    
    repos = [p for p in root.iterdir() if p.is_dir() and (p / ".git").exists()]
    
    for repo_dir in repos:
        workflow_dir = repo_dir / ".github" / "workflows"
        if not workflow_dir.exists(): continue
        
        print(f"Checking Repo: {repo_dir.name}")
        for wf_file in workflow_dir.glob("*.yml"):
            repair_workflow(wf_file)
            
        # Git Operations
        ok, status = run_cmd("git status --porcelain", cwd=repo_dir)
        if ok and status:
            print(f"  Committing repairs to {repo_dir.name}...")
            run_cmd("git add .", cwd=repo_dir)
            run_cmd('git commit -m "chore: repair CI workflow corruption and standardize triggers to master"', cwd=repo_dir)
            
            ok, branch = run_cmd("git branch --show-current", cwd=repo_dir)
            if ok:
                print(f"  Pushing to origin {branch}...")
                run_cmd(f"git push origin {branch}", cwd=repo_dir)
        else:
            print(f"  OK: No repairs needed for {repo_dir.name}")

if __name__ == "__main__":
    main()

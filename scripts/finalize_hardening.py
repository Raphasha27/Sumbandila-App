import os
import re
import subprocess
from pathlib import Path

def run_cmd(cmd, cwd=None):
    try:
        result = subprocess.run(cmd, cwd=cwd, check=True, capture_output=True, text=True)
        return True, result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return False, e.stderr.strip()

def clean_workflow(file_path: Path):
    print(f"  🧹 Cleaning: {file_path}")
    content = file_path.read_text(errors="ignore")
    
    # 1. Remove all instances of 'workflow_dispatch:' strings to start clean
    content = content.replace("workflow_dispatch:", "")
    
    # 2. Fix inline keys and split lines
    lines = content.splitlines()
    fixed_lines = []
    for line in lines:
        if not line.strip():
            fixed_lines.append("")
            continue
        
        # Fix "key: value key:" pattern
        line = re.sub(r"(\b\w+:)\s*(.*?)\s+(\b\w+:)", r"\1 \2\n    \3", line)
        
        # Specific fixes for common corruption patterns
        line = line.replace("push: branches:", "push:\n    branches:")
        line = line.replace("pull_request: branches:", "pull_request:\n    branches:")
        line = line.replace("with: scan-type:", "with:\n          scan-type:")
        line = line.replace("node-version: cache-dependency-path:", "node-version: 20\n          cache-dependency-path:")
        
        fixed_lines.append(line)
    
    content = "\n".join(fixed_lines)
    
    # 3. Standardize the 'on:' section
    name_match = re.search(r"^name:\s*(.*)", content, re.MULTILINE)
    name = name_match.group(1).strip() if name_match else "CI"
    
    on_block = f"""name: {name}

on:
  workflow_dispatch:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:"""
    
    if "jobs:" in content:
        # Replace everything from start to 'jobs:'
        content = re.sub(r"(?s)^.*?jobs:", on_block, content)
    
    # 4. Standardize branch names and duplicates
    content = content.replace("main", "master")
    content = content.replace("[ master, master ]", "[ master ]")
    
    # 5. Fix indentation for hanging keys
    for key in ["runs-on", "node-version", "python-version"]:
        content = re.sub(rf"{key}:\s*\n\s+(\S+)", rf"{key}: \1", content)
    
    # Surgical fixes for common patterns found in logs
    content = content.replace("runs-on: - uses:", "runs-on: ubuntu-latest\n    steps:\n      - uses:")
    content = content.replace("node-version: cache-dependency-path:", "node-version: 20\n          cache-dependency-path:")
    content = content.replace("node-version: run:", "node-version: 20\n      - run:")
    
    # 6. Ensure security_scan job
    if "security_scan:" not in content and "jobs:" in content:
        security_job = """
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
        content = content.rstrip() + "\n" + security_job

    # 7. Action versions
    content = content.replace("actions/checkout@v2", "actions/checkout@v4")
    content = content.replace("actions/checkout@v3", "actions/checkout@v4")
    content = content.replace("actions/setup-node@v2", "actions/setup-node@v4")
    content = content.replace("actions/setup-node@v3", "actions/setup-node@v4")
    content = content.replace("actions/setup-python@v4", "actions/setup-python@v5")
    
    file_path.write_text(content)

def main():
    root = Path.cwd()
    print(f"🚀 Final Kirov Hardening & Commit in {root}...")
    
    repos = [p for p in root.iterdir() if p.is_dir() and (p / ".git").exists()]
    
    for repo_dir in repos:
        print(f"\n📦 Processing Repo: {repo_dir.name}")
        
        # 1. Clean Workflows
        workflow_dir = repo_dir / ".github" / "workflows"
        if workflow_dir.exists():
            for wf_file in workflow_dir.glob("*.yml"):
                clean_workflow(wf_file)
        
        # 2. Git Operations
        # Check if there are changes
        ok, status = run_cmd(["git", "status", "--porcelain"], cwd=repo_dir)
        if ok and status:
            print(f"  📝 Committing changes to {repo_dir.name}...")
            run_cmd(["git", "add", "."], cwd=repo_dir)
            run_cmd(["git", "commit", "-m", "chore: finalize CI hardening, standardize triggers to master, and fix YAML corruption"], cwd=repo_dir)
            
            # Check current branch
            ok, branch = run_cmd(["git", "branch", "--show-current"], cwd=repo_dir)
            if ok:
                print(f"  🚀 Pushing to origin {branch}...")
                run_cmd(["git", "push", "origin", branch], cwd=repo_dir)
        else:
            print(f"  ✅ No changes needed for {repo_dir.name}")

if __name__ == "__main__":
    main()

import os
import re
from pathlib import Path

def harden_workflow(file_path: Path):
    print(f"  🔧 Hardening: {file_path}")
    content = file_path.read_text(errors="ignore")
    
    # 1. Aggressively remove ANY line containing 'workflow_dispatch:'
    lines = content.splitlines()
    lines = [l for l in lines if "workflow_dispatch:" not in l]
    
    # 2. Fix split lines (key: \n value)
    # Join lines where a line ends with ':' and the next line starts with a value
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip().endswith(":") and i + 1 < len(lines):
            next_line = lines[i+1].strip()
            # If the next line doesn't start with a key (i.e., it's a value)
            if next_line and not next_line.endswith(":") and not next_line.startswith("-"):
                combined = line.rstrip() + " " + next_line
                print(f"    🧩 Fixed split: {combined.strip()}")
                new_lines.append(combined)
                i += 2
                continue
        new_lines.append(line)
        i += 1
    
    content = "\n".join(new_lines)
    
    # 3. Re-standardize 'on:' and triggers
    content = content.replace("on: push:", "on:\n  push:")
    content = content.replace("main", "master")
    
    # Ensure workflow_dispatch is under 'on:'
    if "on:" in content:
        content = content.replace("on:", "on:\n  workflow_dispatch:")
    else:
        content = "on:\n  workflow_dispatch:\n  push:\n    branches: [ master ]\n\n" + content

    # 4. Update Actions
    content = content.replace("actions/checkout@v2", "actions/checkout@v4")
    content = content.replace("actions/checkout@v3", "actions/checkout@v4")
    content = content.replace("actions/setup-node@v2", "actions/setup-node@v4")
    content = content.replace("actions/setup-node@v3", "actions/setup-node@v4")
    content = content.replace("actions/setup-python@v4", "actions/setup-python@v5")
    
    # 5. Add Trivy if missing
    if "trivy" not in content.lower():
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
        if "jobs:" in content:
            # Append to the end of jobs
            content = content.rstrip() + trivy_job
        else:
            # No jobs? This is a weird workflow, just leave it
            pass

    file_path.write_text(content)

def main():
    root = Path.cwd()
    print(f"🚀 Starting Kirov Hardening in {root}...")
    
    # Repos are directories in the root
    for repo_dir in root.iterdir():
        if not repo_dir.is_dir(): continue
        if not (repo_dir / ".git").exists(): continue
        
        workflow_dir = repo_dir / ".github" / "workflows"
        if not workflow_dir.exists(): continue
        
        print(f"📦 Checking Repo: {repo_dir.name}")
        for wf_file in workflow_dir.glob("*.yml"):
            harden_workflow(wf_file)

if __name__ == "__main__":
    main()

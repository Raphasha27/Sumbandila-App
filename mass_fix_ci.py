import os
import re

files_to_fix = [
    "cybershield_standalone/.github/workflows/deploy.yml",
    "finaxis_standalone/.github/workflows/ci.yml",
    "finaxis_standalone/.github/workflows/main.yml",
    "flowsentinel_standalone/.github/workflows/ci.yml",
    "health_que/.github/workflows/ci.yml",
    "kasipass_standalone/.github/workflows/ci.yml",
    "kirov_core/.github/workflows/ci.yml",
    "mochi_motion/.github/workflows/ci.yml",
    "noshowiq_fs/.github/workflows/ci.yml",
    "noshowiq_standalone/.github/workflows/ci.yml",
    "octo_system/.github/workflows/ci.yml",
    "pharmalink_standalone/.github/workflows/ci.yml",
    "portfolio_standalone/.github/workflows/ci.yml",
    "profile-repo/.github/workflows/metrics.yml",
    "profile-repo/.github/workflows/security.yml",
    "profile-repo/.github/workflows/snake.yml",
    "python_dashboard/.github/workflows/ci.yml",
    "restaurant_standalone/.github/workflows/ci.yml",
    "services/ai/.github/workflows/ci.yml",
    "services/core/.github/workflows/ci.yml",
    "supporthive_standalone/.github/workflows/ci.yml",
    "thuto_ai/.github/workflows/ci.yml",
    "website_gen/.github/workflows/ci.yml"
]

def fix_yaml(content):
    lines = content.splitlines()
    new_lines = []
    
    # 1. Join split 'run' or 'image' lines
    # Example: run: npm run\n    server:build -> run: npm run server:build
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Join run: split across lines
        if re.match(r'^\s+run:\s*$', line) and i + 1 < len(lines) and lines[i+1].strip() and not lines[i+1].strip().startswith('-'):
            line = line.rstrip() + " " + lines[i+1].strip()
            i += 1
        elif re.search(r'run:\s*[a-zA-Z0-9]+$', line) and i + 1 < len(lines) and lines[i+1].strip() and not ":" in lines[i+1] and not lines[i+1].strip().startswith('-'):
             # Handle cases like "run: npm run\n    server:build"
             line = line.rstrip() + " " + lines[i+1].strip()
             i += 1
        
        # Join image: split across lines
        if re.match(r'^\s+image:\s*$', line) and i + 1 < len(lines) and lines[i+1].strip():
            line = line.rstrip() + " " + lines[i+1].strip()
            i += 1
            
        new_lines.append(line)
        i += 1
    
    # 2. Fix Indentation of uses, with, run, env under steps
    final_lines = []
    for line in new_lines:
        # If line starts with 'uses:', 'run:', 'with:', 'env:', 'name:' and is NOT indented enough
        # We assume they should be indented at least 8 spaces if they follow a '- name:'
        
        # Fix 'uses:' at same level as '- name:'
        if re.match(r'^      uses:', line):
            line = "        " + line.strip()
        if re.match(r'^      run:', line):
            line = "        " + line.strip()
        if re.match(r'^      with:', line):
            line = "        " + line.strip()
        if re.match(r'^      env:', line):
            line = "        " + line.strip()
            
        # Fix lines starting with 3 or 6 spaces that should be 8 or 10
        if line.startswith("   cache:"):
            line = "          " + line.strip()
        if line.startswith("   distribution:"):
            line = "          " + line.strip()
        if line.startswith("   java-version:"):
            line = "          " + line.strip()
        if line.startswith("   node-version:"):
            line = "          " + line.strip()
        if line.startswith("   python-version:"):
            line = "          " + line.strip()
        if line.startswith("   dotnet-version:"):
            line = "          " + line.strip()
            
        # Fix 'name:' without dash that should be '- name:'
        if re.match(r'^    name: Install dependencies', line):
            line = "      - name: Install dependencies"
            
        # Fix specific profile-repo metrics/snake tokens
        if "token: ${{ secrets.METRICS_TOKEN }}" in line:
            line = "          token: ${{ secrets.METRICS_TOKEN }}"
        if "github_user_name: ${{ github.repository_owner }}" in line:
            line = "          github_user_name: ${{ github.repository_owner }}"
            
        final_lines.append(line)
        
    content = "\n".join(final_lines)
    
    # Global regex fixes
    # Fix postgres/redis block in finaxis
    if "postgres:15-alpine" in content:
        content = content.replace("    services:\n      postgres:\n        image: postgres:15-alpine", "    services:\n      postgres:\n        image: postgres:15-alpine")
        content = re.sub(r'image: postgres:15-alpine\s+env:', 'image: postgres:15-alpine\n        env:', content)
        
    return content

for file_path in files_to_fix:
    full_path = os.path.join(r"c:\Users\nelso\OneDrive\Desktop\git", file_path)
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Special case for security.yml which might be totally broken
        if "security.yml" in file_path:
            # If it has double 'on:' or missing jobs, we might need a template
            pass
            
        fixed_content = fix_yaml(content)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(fixed_content)
        print(f"Fixed {file_path}")
    else:
        print(f"File not found: {file_path}")

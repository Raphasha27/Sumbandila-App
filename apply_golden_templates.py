import os
import re

# Golden Templates for Kirov Dynamics Standards
TEMPLATES = {
    "node": """name: Node.js CI (Kirov Dynamics)

on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install --legacy-peer-deps
      - run: npm run build --if-present
      - run: npm test --if-present

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
""",
    "python": """name: Python CI (Kirov Dynamics)

on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
      - name: Lint with flake8
        run: |
          pip install flake8
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
      - name: Test with pytest
        run: |
          pip install pytest
          pytest --if-present

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
""",
    "java": """name: Java CI (Kirov Dynamics)

on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: 'maven'
      - name: Build with Maven
        run: mvn -B package --file pom.xml

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
""",
    "dotnet": """name: .NET CI (Kirov Dynamics)

on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: 8.0.x
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --no-restore
      - name: Test
        run: dotnet test --no-build --verbosity normal

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
}

def detect_stack(root_dir):
    if os.path.exists(os.path.join(root_dir, "package.json")):
        return "node"
    if os.path.exists(os.path.join(root_dir, "requirements.txt")) or any(f.endswith(".py") for f in os.listdir(root_dir) if os.path.isfile(os.path.join(root_dir, f))):
        return "python"
    if os.path.exists(os.path.join(root_dir, "pom.xml")):
        return "java"
    if any(f.endswith(".csproj") or f.endswith(".sln") for f in os.listdir(root_dir) if os.path.isfile(os.path.join(root_dir, f))):
        return "dotnet"
    return None

def main():
    root_path = r"c:\Users\nelso\OneDrive\Desktop\git"
    processed = []
    
    # Files to specifically fix based on @current_problems
    targets = [
        "cybershield_standalone",
        "finaxis_standalone",
        "flowsentinel_standalone",
        "health_que",
        "kasipass_standalone",
        "mochi_motion",
        "noshowiq_fs",
        "noshowiq_standalone",
        "pharmalink_standalone",
        "portfolio_standalone",
        "python_dashboard",
        "restaurant_standalone",
        "supporthive_standalone",
        "thuto_ai",
        "website_gen"
    ]

    for target in targets:
        dir_path = os.path.join(root_path, target)
        if not os.path.exists(dir_path):
            continue
            
        stack = detect_stack(dir_path)
        if not stack:
            # Fallback for complex ones
            if target == "supporthive_standalone": stack = "node" # It has node/cpp
            else: stack = "node" # Safe default
            
        workflow_dir = os.path.join(dir_path, ".github", "workflows")
        if not os.path.exists(workflow_dir):
            os.makedirs(workflow_dir, exist_ok=True)
            
        ci_file = os.path.join(workflow_dir, "ci.yml")
        with open(ci_file, "w", encoding="utf-8") as f:
            f.write(TEMPLATES[stack])
        
        # Special case for website_gen which was reported as having duplicate keys
        if target == "website_gen":
            # Just ensure ci.yml is clean
            pass
            
        processed.append(target)
        print(f"Applied {stack} template to {target}")

if __name__ == "__main__":
    main()

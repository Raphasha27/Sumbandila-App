import os

def get_node_template(repo_name):
    return f"""name: CI
on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    name: Build & Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build --if-present
      - name: Test
        run: npm test --if-present

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

def get_python_template(repo_name):
    return f"""name: CI
on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    name: Build & Lint
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
      - name: Lint
        run: |
          pip install flake8
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics

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

def get_java_template(repo_name):
    return f"""name: CI
on:
  workflow_dispatch:
  push:
    branches: [ master, main ]
  pull_request:
    branches: [ master, main ]

jobs:
  build:
    name: Build & Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: maven
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
"""

repos_to_fix = [
    ("finaxis_standalone", "java"),
    ("health_que", "python"),
    ("kasipass_standalone", "python"),
    ("mochi_motion", "node"),
    ("noshowiq_fs", "node"),
    ("noshowiq_standalone", "node"),
    ("octo_system", "node"),
    ("pharmalink_standalone", "node"),
    ("portfolio_standalone", "node"),
    ("python_dashboard", "python"),
    ("restaurant_standalone", "node"),
    ("supporthive_standalone", "node"),
    ("thuto_ai", "node"),
    ("website_gen", "node")
]

base_path = r"c:\Users\nelso\OneDrive\Desktop\git"

for repo, stack in repos_to_fix:
    repo_path = os.path.join(base_path, repo)
    if os.path.exists(repo_path):
        workflow_dir = os.path.join(repo_path, ".github", "workflows")
        os.makedirs(workflow_dir, exist_ok=True)
        
        ci_path = os.path.join(workflow_dir, "ci.yml")
        
        if stack == "node":
            content = get_node_template(repo)
        elif stack == "python":
            content = get_python_template(repo)
        elif stack == "java":
            content = get_java_template(repo)
        else:
            continue
            
        with open(ci_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Applied {stack} template to {repo}")
    else:
        print(f"Repo not found: {repo}")

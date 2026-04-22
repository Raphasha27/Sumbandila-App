import subprocess
import sys
import csv
import time
import datetime
import argparse
import json
from pathlib import Path

try:
    from rich.console import Console
    from rich.table import Table
    console = Console()
except ImportError:
    class MockConsole:
        def print(self, text, *args, **kwargs): print(text)
    console = MockConsole()
    class Table:
        def __init__(self, title=None): self.title = title
        def add_column(self, *args): pass
        def add_row(self, *args): print(args)

TODAY = datetime.datetime.now().strftime("%Y-%m-%d")
BRANCH_NAME = f"auto-upgrade-{TODAY.replace('-','')}"
REPORT_FILE = f"repo_upgrade_report_{TODAY}.csv"

WAIT_SECONDS = 15
MAX_WAIT_MINUTES = 15

SUPPORTED_TYPES = {"Node / React", "Next.js / Node", "Vite / React", "Python", "C# / .NET", "C / C++", "Makefile Project"}

def run(cmd, cwd=None, allow_fail=False):
    try:
        result = subprocess.run(cmd, cwd=cwd, shell=True, check=True, capture_output=True, text=True)
        return True, result.stdout.strip()
    except subprocess.CalledProcessError as e:
        if allow_fail: return False, (e.stdout + "\n" + e.stderr).strip()
        raise

def detect_project_type(repo_path: Path):
    files = [p.name.lower() for p in repo_path.iterdir() if p.is_file()]
    if "package.json" in files:
        if (repo_path / "next.config.js").exists() or (repo_path / "next.config.mjs").exists(): return "Next.js / Node"
        if (repo_path / "vite.config.js").exists() or (repo_path / "vite.config.ts").exists(): return "Vite / React"
        return "Node / React"
    if "requirements.txt" in files or "pyproject.toml" in files: return "Python"
    if any(f.endswith(".sln") for f in files) or any(f.endswith(".csproj") for f in files): return "C# / .NET"
    if any(f.endswith(".cpp") for f in files) or any(f.endswith(".c") for f in files): return "C / C++"
    if "makefile" in files: return "Makefile Project"
    return "Unknown"

def ensure_standard_files(repo_path: Path):
    (repo_path / ".env.example").write_text("# Example environment variables\n") if not (repo_path / ".env.example").exists() else None
    if not (repo_path / "SECURITY.md").exists():
        (repo_path / "SECURITY.md").write_text("# Security Policy\n\nReport vulnerabilities privately.\n")
    gitignore = repo_path / ".gitignore"
    if not gitignore.exists(): gitignore.write_text("")
    content = gitignore.read_text(errors="ignore")
    for item in ["\n# Security", ".env", "*.pem", "*.key", "node_modules/", "__pycache__/", ".venv/", "dist/", "build/"]:
        if item.strip() not in content: content += f"\n{item}"
    gitignore.write_text(content)

def ensure_lint_configs(repo_path: Path, project_type: str):
    # .editorconfig
    ec = repo_path / ".editorconfig"
    if not ec.exists():
        ec.write_text("""root = true
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
[*.py]
indent_size = 4
[Makefile]
indent_style = tab
""")

    # JS/TS configs
    if "Node" in project_type or "React" in project_type:
        rc = repo_path / ".eslintrc.cjs"
        if not rc.exists():
            rc.write_text("""module.exports = {
  env: { browser: true, node: true, es2021: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: { "no-console": "warn", "@typescript-eslint/no-unused-vars": ["error"] }
};""")
        pr = repo_path / ".prettierrc"
        if not pr.exists():
            pr.write_text(json.dumps({"semi": True, "singleQuote": True, "tabWidth": 2, "trailingComma": "es5"}, indent=2))

    # Python configs
    if project_type == "Python":
        pt = repo_path / "pyproject.toml"
        if not pt.exists():
            pt.write_text("""[tool.ruff]
line-length = 88
target-version = "py312"
[tool.ruff.lint]
select = ["E", "F", "I", "B"]
ignore = ["E501"]
""")

def ensure_ci_workflow(repo_path: Path):
    wd = repo_path / ".github" / "workflows"
    wd.mkdir(parents=True, exist_ok=True)
    ci = wd / "ci.yml"
    if not ci.exists():
        ci.write_text("""name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: {node-version: 20}
        if: hashFiles('package.json') != ''
      - run: npm install && npm run build
        if: hashFiles('package.json') != ''
      - uses: actions/setup-python@v5
        with: {python-version: "3.11"}
        if: hashFiles('requirements.txt') != ''
      - run: pip install -r requirements.txt && pytest
        if: hashFiles('requirements.txt') != ''
""")

def generate_readme(repo_path: Path, project_type: str):
    readme = repo_path / "README.md"
    if readme.exists() and len(readme.read_text(errors="ignore").strip()) > 200: return
    repo_name = repo_path.name
    readme.write_text(f"# {repo_name}\n\n## Overview\nThis is a **{project_type}** project.\n\n## Setup\n`npm install` or `pip install -r requirements.txt`")

def ensure_license(repo_path: Path):
    l = repo_path / "LICENSE"
    if l.exists(): return
    y = datetime.datetime.now().year
    l.write_text(f"MIT License\n\nCopyright (c) {y} Raphasha27\n\nFull license text...")

def process_repo(repo_path: Path, opts):
    repo_name = repo_path.name
    pt = detect_project_type(repo_path)
    if opts.skip_unknown and pt not in SUPPORTED_TYPES: return repo_name, pt, "SKIPPED", "Unknown type"
    
    ok, out = run("git remote show origin", cwd=repo_path, allow_fail=True)
    db = "main"
    if ok:
        for line in out.splitlines():
            if "HEAD branch" in line: db = line.split(":")[-1].strip()
    
    run(f"git checkout {db}", cwd=repo_path, allow_fail=True)
    run("git pull", cwd=repo_path, allow_fail=True)
    run(f"git checkout -b {BRANCH_NAME}", cwd=repo_path, allow_fail=True)

    ensure_standard_files(repo_path)
    ensure_lint_configs(repo_path, pt)
    ensure_ci_workflow(repo_path)
    generate_readme(repo_path, pt)
    ensure_license(repo_path)
    
    if not (ok := run("git status --porcelain", cwd=repo_path, allow_fail=True))[1]:
        return repo_name, pt, "NO CHANGES", "OK"

    run("git add .", cwd=repo_path, allow_fail=True)
    run('git commit -m "chore: automated upgrade + lint + CI"', cwd=repo_path, allow_fail=True)
    run(f"git push -u origin {BRANCH_NAME}", cwd=repo_path, allow_fail=True)
    run(f'gh pr create --title "Automated Upgrade" --body "CI, lint, and hardening."', cwd=repo_path, allow_fail=True)
    
    return repo_name, pt, "PR CREATED", "OK"

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("username")
    parser.add_argument("--skip-unknown", action="store_true")
    opts = parser.parse_args()
    base_dir = Path.cwd()
    run(f'gh repo list {opts.username} --limit 200 --json nameWithOwner -q ".[].nameWithOwner" > repos.txt', cwd=base_dir, allow_fail=True)
    repos = (base_dir / "repos.txt").read_text().strip().splitlines()
    for r in repos:
        rn = r.split("/")[-1]
        if not (base_dir / rn).exists(): run(f"gh repo clone {r}", cwd=base_dir, allow_fail=True)
    
    results = []
    for rp in [p for p in base_dir.iterdir() if p.is_dir() and (p / ".git").exists()]:
        try: results.append(process_repo(rp, opts))
        except Exception as e: results.append((rp.name, "Unknown", "FAILED", str(e)))

if __name__ == "__main__":
    main()

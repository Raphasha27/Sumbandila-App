"""
kirov_dev.py — Kirov Dynamics Project Control Centre
Usage:
    py scripts/kirov_dev.py run <repo_name>      # Start local dev server
    py scripts/kirov_dev.py ship <repo_name>     # Deploy to Vercel
    py scripts/kirov_dev.py status               # Show all project statuses
"""

import os
import sys
import subprocess
from pathlib import Path

GIT_ROOT = Path(__file__).parent.parent
REPOS = sorted([d.name for d in GIT_ROOT.iterdir() if d.is_dir() and (d / ".git").exists()])


def run_cmd(cmd, cwd=None, shell=True):
    print(f"\n>>> {cmd}")
    return subprocess.run(cmd, cwd=cwd, shell=shell)  # nosec B602 — dev-only tooling; npm/vercel require the shell on Windows


def detect_stack(repo_path: Path) -> str:
    if (repo_path / "package.json").exists():
        pkg = (repo_path / "package.json").read_text(encoding="utf-8", errors="ignore")
        if "next" in pkg:
            return "nextjs"
        if "vite" in pkg or "react-scripts" in pkg:
            return "vite"
        return "node"
    if (repo_path / "pom.xml").exists():
        return "maven"
    if (repo_path / "index.html").exists():
        return "static"
    if any(repo_path.glob("*.py")):
        return "python"
    return "unknown"


def run_project(repo_name: str):
    repo_path = GIT_ROOT / repo_name
    if not repo_path.exists():
        print(f"[ERROR] Repository '{repo_name}' not found in {GIT_ROOT}")
        sys.exit(1)

    stack = detect_stack(repo_path)
    print(f"\n[Kirov Dev] Starting '{repo_name}' ({stack}) on localhost...")

    if stack in ("nextjs", "vite", "node"):
        # Install deps if needed
        if not (repo_path / "node_modules").exists():
            run_cmd("npm install", cwd=repo_path)
        run_cmd("npm run dev", cwd=repo_path)

    elif stack == "static":
        run_cmd(f'npx -y http-server "{repo_path}" -p 8080 -o', cwd=repo_path)

    elif stack == "maven":
        print("[Kirov Dev] Maven project detected. Use 'mvn spring-boot:run' in the service subdirectory.")
        print(f"  cd {repo_path}")
        print("  mvn spring-boot:run")

    elif stack == "python":
        # Try common entry points
        for entry in ["app.py", "main.py", "run.py", "manage.py"]:
            if (repo_path / entry).exists():
                run_cmd(f"python {entry}", cwd=repo_path)
                return
        print("[ERROR] No known Python entry point found (app.py, main.py, etc.)")

    else:
        print(f"[WARNING] Unknown stack for '{repo_name}'. Attempting static file serve...")
        run_cmd(f'npx -y http-server "{repo_path}" -p 8080 -o', cwd=repo_path)


def ship_project(repo_name: str):
    repo_path = GIT_ROOT / repo_name
    if not repo_path.exists():
        print(f"[ERROR] Repository '{repo_name}' not found.")
        sys.exit(1)

    print(f"\n[Kirov Dev] Deploying '{repo_name}' to Vercel...")

    # Ensure linked
    if not (repo_path / ".vercel").exists():
        run_cmd("vercel link --yes", cwd=repo_path)

    run_cmd("vercel deploy --prod --yes", cwd=repo_path)


def show_status():
    print(f"\n{'='*60}")
    print(f"  Kirov Dynamics — Project Status ({len(REPOS)} repos)")
    print(f"{'='*60}")
    for repo in REPOS:
        stack = detect_stack(GIT_ROOT / repo)
        vercel_linked = "✅ Linked" if (GIT_ROOT / repo / ".vercel").exists() else "⬜ Not linked"
        print(f"  {repo:<35} [{stack:<8}]  {vercel_linked}")
    print(f"{'='*60}\n")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(0)

    command = sys.argv[1].lower()

    if command == "run":
        if len(sys.argv) < 3:
            print("[ERROR] Please specify a repo name. e.g.: py scripts/kirov_dev.py run ai_resume")
            sys.exit(1)
        run_project(sys.argv[2])

    elif command == "ship":
        if len(sys.argv) < 3:
            print("[ERROR] Please specify a repo name. e.g.: py scripts/kirov_dev.py ship ai_resume")
            sys.exit(1)
        ship_project(sys.argv[2])

    elif command == "status":
        show_status()

    else:
        print(f"[ERROR] Unknown command '{command}'. Use: run | ship | status")
        sys.exit(1)


if __name__ == "__main__":
    main()

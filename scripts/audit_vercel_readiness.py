import os
import json
from pathlib import Path

def detect_project_type(repo_path: Path):
    files = [f.name.lower() for f in repo_path.iterdir() if f.is_file()]
    
    if "next.config.js" in files or "next.config.mjs" in files:
        return "nextjs"
    if "package.json" in files:
        return "node"
    if "requirements.txt" in files or "pyproject.toml" in files:
        return "python"
    if "index.html" in files:
        return "static"
    if "pom.xml" in files:
        return "java-maven"
    if any(f.endswith(".csproj") for f in files):
        return "dotnet"
    
    return "unknown"

def create_vercel_config(repo_path: Path, project_type: str):
    config = {}
    
    if project_type == "python":
        # Check if it's a FastAPI/Flask app (assuming main.py or app.py)
        # For Vercel Python, we usually route to a specific file
        config = {
            "version": 2,
            "builds": [
                { "src": "**/main.py", "use": "@vercel/python" },
                { "src": "**/app.py", "use": "@vercel/python" }
            ],
            "routes": [
                { "src": "/(.*)", "dest": "/" }
            ]
        }
    elif project_type == "node":
        # Default node config if needed
        config = {
            "version": 2,
            "builds": [
                { "src": "package.json", "use": "@vercel/node" }
            ]
        }
    
    if config:
        config_path = repo_path / "vercel.json"
        if not config_path.exists():
            with open(config_path, "w") as f:
                json.dump(config, f, indent=2)
            return True
    return False

def main():
    root = Path.cwd()
    print(f"--- Kirov Dynamics: Vercel Deployment Audit ---")
    
    repos = [p for p in root.iterdir() if p.is_dir() and (p / ".git").exists()]
    
    results = []
    for repo in repos:
        ptype = detect_project_type(repo)
        created = create_vercel_config(repo, ptype)
        results.append({
            "name": repo.name,
            "type": ptype,
            "deployable": ptype in ["nextjs", "node", "python", "static"],
            "config_created": created
        })
        print(f"Repo: {repo.name:<30} Type: {ptype:<15} Deployable: {str(results[-1]['deployable']):<10}")

    # Save summary
    with open("vercel_deployment_summary.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\nAudit complete. Summary saved to vercel_deployment_summary.json")

if __name__ == "__main__":
    main()

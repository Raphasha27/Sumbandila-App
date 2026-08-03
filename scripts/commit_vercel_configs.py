import subprocess
from pathlib import Path

def run_cmd(cmd, cwd=None):
    try:
        subprocess.run(cmd, cwd=cwd, check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError:
        return False

def main():
    root = Path.cwd()
    repos = [p for p in root.iterdir() if p.is_dir() and (p / ".git").exists()]
    
    print("--- Committing Vercel & Showcase Configurations ---")
    
    for repo in repos:
        # Check for new files
        status = subprocess.run(["git", "status", "--porcelain"], cwd=repo, capture_output=True, text=True).stdout
        if "vercel.json" in status or "index.html" in status:
            print(f"Committing changes in: {repo.name}")
            run_cmd(["git", "add", "vercel.json", "index.html"], cwd=repo)
            run_cmd(["git", "commit", "-m", "chore: add Vercel deployment and showcase configuration"], cwd=repo)
            # We don't push automatically to avoid auth issues, user can push later
        else:
            # print(f"No new config in: {repo.name}")
            pass

if __name__ == "__main__":
    main()

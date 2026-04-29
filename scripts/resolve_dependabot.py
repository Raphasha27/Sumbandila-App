import requests
import os
import time

def resolve_dependabot_prs():
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("⛔ GITHUB_TOKEN not found.")
        return

    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    
    username = "Raphasha27"
    
    # 1. Get all repos
    print("🔍 Fetching repositories...")
    repos_url = f"https://api.github.com/users/{username}/repos?per_page=100"
    repos = requests.get(repos_url, headers=headers).json()
    
    total_resolved = 0
    
    for repo in repos:
        repo_name = repo["name"]
        if repo.get("archived"): continue
        
        # 2. Get open PRs for the repo
        pulls_url = f"https://api.github.com/repos/{username}/{repo_name}/pulls?state=open&per_page=100"
        prs = requests.get(pulls_url, headers=headers).json()
        
        if not isinstance(prs, list): continue
        
        bot_prs = [pr for pr in prs if pr.get("user", {}).get("login") == "dependabot[bot]"]
        
        if not bot_prs: continue
        
        print(f"📦 Repo: {repo_name} ({len(bot_prs)} Dependabot PRs)")
        
        for pr in bot_prs:
            pr_num = pr["number"]
            print(f"  🔹 PR #{pr_num}: {pr['title']}")
            
            # Try to merge the PR
            merge_url = f"https://api.github.com/repos/{username}/{repo_name}/pulls/{pr_num}/merge"
            # We use 'squash' to keep history clean
            merge_data = {
                "merge_method": "squash",
                "commit_title": f"chore: merge dependabot PR #{pr_num}",
            }
            
            resp = requests.put(merge_url, headers=headers, json=merge_data)
            if resp.status_code == 200:
                print(f"    ✅ Merged PR #{pr_num}")
                total_resolved += 1
            else:
                # If cannot merge (e.g. CI failing), try to add a comment or just skip
                print(f"    ❌ Could not merge PR #{pr_num} (Status: {resp.status_code})")
                print(f"       Reason: {resp.json().get('message')}")

    print(f"\n🏁 Finished. Total PRs merged: {total_resolved}")

if __name__ == "__main__":
    resolve_dependabot_prs()

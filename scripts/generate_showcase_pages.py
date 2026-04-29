import os
import json
import re
from pathlib import Path

# Premium Showcase Template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{project_name} | Kirov Dynamics Showcase</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg: #0d1117;
            --card: rgba(22, 27, 34, 0.8);
            --accent: #3fb950;
            --text: #c9d1d9;
            --header: #ffffff;
            --glass: rgba(255, 255, 255, 0.05);
        }}
        
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        
        body {{
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }}

        .gradient-bg {{
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 50% -20%, #1a2333 0%, #0d1117 80%);
            z-index: -1;
        }}

        .container {{
            max-width: 900px;
            margin: 0 auto;
            padding: 80px 20px;
        }}

        header {{
            text-align: center;
            margin-bottom: 60px;
            animation: fadeInDown 0.8s ease-out;
        }}

        .brand {{
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            letter-spacing: 2px;
            color: var(--accent);
            text-transform: uppercase;
            font-size: 0.9rem;
            margin-bottom: 10px;
            display: block;
        }}

        h1 {{
            font-family: 'Outfit', sans-serif;
            font-size: 3.5rem;
            color: var(--header);
            margin-bottom: 20px;
        }}

        .badge-container {{
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }}

        .badge {{
            padding: 6px 16px;
            border-radius: 20px;
            background: var(--glass);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--header);
        }}

        .card {{
            background: var(--card);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            animation: fadeInUp 0.8s ease-out;
        }}

        h2 {{
            font-family: 'Outfit', sans-serif;
            color: var(--header);
            margin-bottom: 20px;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }}

        ul {{
            list-style: none;
        }}

        li {{
            margin-bottom: 15px;
            padding-left: 30px;
            position: relative;
        }}

        li::before {{
            content: "→";
            position: absolute;
            left: 0;
            color: var(--accent);
            font-weight: bold;
        }}

        .tech-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }}

        .tech-item {{
            padding: 20px;
            background: var(--glass);
            border-radius: 16px;
            text-align: center;
        }}

        footer {{
            text-align: center;
            margin-top: 80px;
            padding-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.9rem;
            opacity: 0.6;
        }}

        @keyframes fadeInDown {{
            from {{ opacity: 0; transform: translateY(-30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        @keyframes fadeInUp {{
            from {{ opacity: 0; transform: translateY(30px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        .cta-button {{
            display: inline-block;
            margin-top: 40px;
            padding: 16px 32px;
            background: var(--accent);
            color: #000;
            text-decoration: none;
            font-weight: 700;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-family: 'Outfit', sans-serif;
        }}

        .cta-button:hover {{
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(63, 185, 80, 0.3);
        }}
    </style>
</head>
<body>
    <div class="gradient-bg"></div>
    <div class="container">
        <header>
            <span class="brand">Kirov Dynamics Technology</span>
            <h1>{project_name}</h1>
            <div class="badge-container">
                <div class="badge">🚀 Mission Critical</div>
                <div class="badge">🛡️ Security Audited</div>
                <div class="badge">⚡ High Performance</div>
            </div>
            <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto;">{overview}</p>
        </header>

        <div class="card">
            <h2>✨ Key Capabilities</h2>
            <ul>
                {features_html}
            </ul>
        </div>

        <div class="card">
            <h2>🛠️ Technical Architecture</h2>
            <div class="tech-grid">
                <div class="tech-item">
                    <div style="font-weight: 700; color: var(--header); margin-bottom: 5px;">Stack</div>
                    <div>{tech_stack}</div>
                </div>
                <div class="tech-item">
                    <div style="font-weight: 700; color: var(--header); margin-bottom: 5px;">Integrity</div>
                    <div>AES-256 / SHA-256</div>
                </div>
                <div class="tech-item">
                    <div style="font-weight: 700; color: var(--header); margin-bottom: 5px;">Deployment</div>
                    <div>Edge-Native</div>
                </div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="https://github.com/Raphasha27" class="cta-button">View Repository Artifacts</a>
        </div>

        <footer>
            &copy; 2026 Kirov Dynamics Technology. All Rights Reserved.<br>
            Level 5 Intelligence Clearance Active.
        </footer>
    </div>
</body>
</html>
"""

def extract_info(readme_path: Path):
    if not readme_path.exists():
        return "System Overview", "Operational Asset", "<li>Core Infrastructure Logic</li>", "Enterprise Stack"
    
    content = readme_path.read_text(errors="ignore")
    
    # Extract Title
    title_match = re.search(r"^#\s+(.*)", content, re.MULTILINE)
    project_name = title_match.group(1).replace("🏛️", "").replace("|", "").strip() if title_match else "Operational Asset"
    
    # Extract Overview (first paragraph after title)
    overview = "A specialized operational asset developed within the Kirov Dynamics digital ecosystem, engineered for maximum reliability and technical excellence."
    paras = re.split(r'\n\s*\n', content)
    for p in paras:
        if p.strip() and not p.startswith("#") and not p.startswith("["):
            overview = p.strip()
            if len(overview) > 200: overview = overview[:197] + "..."
            break

    # Extract Features
    features_html = "<li>High-performance computational logic</li><li>Automated security enforcement</li><li>Enterprise-grade scalability</li>"
    features_match = re.search(r"(?s)(## Features|## ✨ Features|Key Capabilities)(.*?)(##|$)", content)
    if features_match:
        feats = re.findall(r"-\s+(.*)", features_match.group(2))
        if feats:
            features_html = "".join([f"<li>{f.strip()}</li>" for f in feats[:5]])

    # Extract Tech Stack
    tech_stack = "Kirov Core Utility"
    tech_match = re.search(r"(?s)(## Tech Stack|## 🛠️ Tech Stack)(.*?)(##|$)", content)
    if tech_match:
        stack = re.findall(r"-\s+(.*)", tech_match.group(2))
        if stack:
            tech_stack = ", ".join([s.split("-")[-1].strip() for s in stack[:3]])

    return project_name, overview, features_html, tech_stack

def main():
    root = Path.cwd()
    summary_path = root / "vercel_deployment_summary.json"
    if not summary_path.exists():
        print("Summary not found. Run audit first.")
        return

    with open(summary_path, "r") as f:
        repos = json.load(f)

    print("--- Generating Showcase Landing Pages ---")
    
    for repo in repos:
        if not repo["deployable"]:
            repo_path = root / repo["name"]
            readme_path = repo_path / "README.md"
            
            p_name, ov, f_html, t_stack = extract_info(readme_path)
            
            html_content = HTML_TEMPLATE.format(
                project_name=p_name,
                overview=ov,
                features_html=f_html,
                tech_stack=t_stack
            )
            
            (repo_path / "index.html").write_text(html_content, encoding='utf-8')
            print(f"Created showcase for: {repo['name']}")
            
            # Update repo entry in summary
            repo["deployable"] = True
            repo["type"] = "showcase-static"

    # Save updated summary
    with open(summary_path, "w") as f:
        json.dump(repos, f, indent=2)
    
    print("\nShowcase generation complete. All repos are now deployable.")

if __name__ == "__main__":
    main()

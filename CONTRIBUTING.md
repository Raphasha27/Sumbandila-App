# 🤝 Sovereign Architect's Workflow: Contributing to Sumbandila

To maintain a high-standard, professional repository for Sumbandila and the Kirov ecosystem, we follow the **5 Pillars of Version Control**. This ensures our history is clean, our code is secure, and our architecture is resilient.

## 🏛️ The 5 Pillars of Governance

### 1. 🔍 Staging & Hygiene (The Pre-Commit Phase)
*   **Atomic Commits**: Each commit should do exactly one thing. Use `git add -p` to review changes line-by-line before staging.
*   **Sentinel Scanning**: Never stage secrets. Use the `scripts/security-audit.ps1` or `pre-commit` to scan for `.env` files or API keys.
*   **Linting**: Ensure 100% green status with `black`, `pylint` (score > 8.0), or `prettier`.

### 2. 📖 The Story (Conventional Commits)
A commit is a historical record. Use industry-standard prefixes:
- `feat:` for new capabilities.
- `fix:` for bug resolutions.
- `docs:` for documentation updates.
- `refactor:` for code improvements without logic changes.

### 3. 🧵 Linear History (Rebasing & Isolation)
*   **Feature Branching**: Always work in a dedicated branch (`feature/` or `fix/`).
*   **Rebasing**: Instead of "merge bubbles," use `git rebase main` to keep your history linear and easy to audit.

### 4. ⚖️ Governance (Pull Requests)
*   **Draft PRs**: Use these for WIP to show transparency without triggering full CI costs.
*   **Self-Audit**: Review your own "Files Changed" tab on GitHub before requesting eyes.
*   **Squashing**: Use **Squash and Merge** to turn iterative "oops" commits into one clean, production-ready marker on `main`.

### 5. 🛡️ Sentinel Security (Secrets & CI)
*   **Sovereign CI/CD**: Every PR must pass the `Sumbandila CI` gate, including Gitleaks, Snyk, and automated unit tests.
*   **Tagging**: Major milestones must be tagged (e.g., `v4.0.0-gold`) to provide known-good recovery points.

---

## 🏗️ Technical Execution

1. **Pull the Latest**: `git pull --rebase origin main`
2. **Branch**: `git checkout -b feature/your-task`
3. **Commit**: `git commit -m "feat: description"`
4. **Push**: `git push origin feature/your-task`
5. **Merge**: Request a Squash and Merge onto `main`.

---

### Code Quality Mission

> “An architect's code is identified not by its complexity, but by its clarity and the integrity of its history.”

*© 2026 Kirov Dynamics · Built for Africa's Future.*

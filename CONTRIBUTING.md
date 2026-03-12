# Contributing to Sumbandila Registry Sentinel 🛡️

First off, thank you for contributing to the world's most secure digital registry platform. As a contributor, you are helping build a **Digital Trust Authority**.

## 🛡️ Level 5 Integrity Standards

Every contribution to Sumbandila must adhere to our institutional-grade standards:

1.  **Domain-Driven Design (DDD)**: Logic must be encapsulated within the appropriate bounded context (Check `/apps` or `/services`). Avoid crossing domain boundaries without an Event-Driven interface.
2.  **Cryptographic Security**: All commits **must** be cryptographically signed using SSH or GPG keys. Unverified commits will be automatically flagged by the system.
3.  **Zero-Trust UI**: Components must validate state and access levels locally before communicating with the API. Use the established design system tokens.

## 🚀 Contribution Workflow

### 📋 Pull Request Process
1.  **Issue First**: Always link your PR to an existing issue.
2.  **Branching**: Name your branch `feature/<context>-<description>` or `fix/<context>-<description>`.
3.  **PR Template**: Fill out the PR template completely. Reviewers will reject PRs with empty descriptions.
4.  **Security Audit**: If your change impacts authentication or registry access, explicitly mention how the **AI Sentinel** bot was informed of this change.

### ✍️ Commit Conventions
We use **Conventional Commits**. This is mandatory for automated changelog generation and CI triggers:

- `feat(<context>):` New features
- `fix(<context>):` Bug fixes
- `chore(<context>):` Maintenance/Dependencies
- `integrity:` Security or GPG/SSH related updates
- `docs:` Documentation only changes

*Example: `feat(mobile): add biometric re-authentication for vault access`*

## 🛠️ Local Environment
- **Node.js**: v20+
- **Python**: v3.11+
- **Docker**: For microservice orchestration.
- **Git**: Configured for signing (See [GITHUB_VERIFICATION.md](docs/GITHUB_VERIFICATION.md)).

---
*By contributing, you agree that your contributions will be licensed under the MIT License.*


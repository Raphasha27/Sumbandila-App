# 🛡️ Security Policy

## Supported Versions

We prioritize security for the latest production releases.

| Version | Supported |
| ------- | ------------------ |
| 4.x.x | :white_check_mark: |
| < 4.0 | :x: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a potential security vulnerability in the Sumbandila Platform, please use the **GitHub Private Vulnerability Reporting** feature.

Alternatively, you can email our security team directly:

- **Email:** <mailto:raphashakokets69@gmail.com>
- **Subject:** [SECURITY] Vulnerability Report - Sumbandila

### Our Process

1. **Acknowledgment**: You will receive an acknowledgment of your report within 48 hours.
2. **Validation**: Our team will validate the vulnerability and assess its impact.
3. **Resolution**: We aim to resolve critical vulnerabilities within 7 days.
4. **Disclosure**: We will disclose the vulnerability publicly only after a fix is deployed, unless otherwise agreed.

## 🛡️ Sovereign Security Posture

The Sumbandila Platform is engineered for **High Integrity** and **Digital Sovereignty**. We implement a multi-layered security stack to protect national-scale data.

### 🍱 Core Protections
- **End-to-End Encryption**: All sensitive data is encrypted at rest (AES-256) and in transit (TLS 1.3).
- **Blockchain Hashing**: Credential fingerprints are stored as SHA-256 hashes in a tamper-proof block-based vault to ensure data integrity without exposing private PII.
- **Distributed Rate Limiting**: Powered by **FlowSentinel**, our API gateway prevents brute-force institutional lookups via Redis-backed sliding window algorithms.
- **AI Fraud Shield**: Real-time identification of "Ghost Entities" and spoofing attempts through the Sentinel Random Forest model.

### 🔬 Automated Audits
- **Local Sentinel**: Every commit is scanned for secrets and linted for security anti-patterns using `scripts/security-audit.ps1`.
- **Dependency Scanning**: Continuous monitoring of third-party packages via GitHub Advanced Security and Snyk.

---

*© 2026 Sumbandila Registry Sentinel · Security is our Foundation.*

# 🛡️ Sumbandila — Digital Trust Platform v4.0.0

![Sumbandila Logo](apps/landing-page/assets/logo.png)

## Sovereign Registry Sentinel

*Building Africa's digital trust layer through AI-driven fraud detection and Blockchain integrity.*

[![GitHub Actions Badge](https://github.com/Raphasha27/Sumbandila-App/actions/workflows/sumbandila-ci.yml/badge.svg)](https://github.com/Raphasha27/Sumbandila-App/actions)
[![CodeQL Badge](https://github.com/Raphasha27/Sumbandila-App/actions/workflows/codeql.yml/badge.svg)](https://github.com/Raphasha27/Sumbandila-App/actions/workflows/codeql.yml)

---

## 🏛️ Architecture Overview

The Sumbandila Platform is a professional, high-integrity digital registry designed for the pan-African landscape. It provides citizens and organizations with the tools to verify the legitimacy of institutions and professionals instantly.

```mermaid
graph TB
    subgraph "Public Infrastructure (Vercel)"
        CP[Citizen Portal]
        MA[Mobile App]
    end

    subgraph "Sovereign Trust Layer (Kirov Dynamics)"
        GW[Sumbandila Gateway]
        RE[Sentinel Reputation Engine]
        
        subgraph "Intelligence Core"
            FM[AI Fraud Sentinel - RandomForest]
            BV[Blockchain Vault - SHA-256]
        end
        
        subgraph "Data Persistence"
            DB[(PostgreSQL Primary)]
            RD[Redis Distributed Cache]
        end
    end

    CP & MA -->|JWT Authenticated| GW
    GW --> RE
    RE -->|Inference| FM
    RE -->|Integrity Check| BV
    RE --> DB
    RE --> RD
```

## 🚀 Key Capabilities

| Capability | Sentinel Feature | Tech Stack |
| :--- | :--- | :--- |
| **Identity Verification** | Instant lookup of HPCSA, DHET, & SAQA data. | **FastAPI V4** |
| **Fraud Detection** | AI identification of risk patterns & ghost entities. | **Scikit-Learn** |
| **Credential Hashing** | Tamper-proof SHA-256 blockchain fingerprints. | **Sovereign Logic** |
| **Multilingual Support** | Voice and text reporting in 5 native languages. | **Python Voice Engine** |
| **High Integrity** | Block-based audit logs for every verification. | **PostgreSQL 15** |

---

## 🏗️ Monorepo Ecosystem

```bash
sumbandila/
├── apps/
│   ├── landing-page/     # Premium Portal (Commercial Front-end)
│   └── web/              # Sentinel Dashboard (Internal Interaction)
├── services/
│   └── core/             # FastAPI V4 Backend (API & Security)
├── packages/
│   └── core-logic/       # Blockchain, Reputation, & Voice Engines
├── ai/
│   └── fraud_model.py    # ML Fraud Detection (RandomForest)
├── tests/                # 100% Green Unit Test Suite
└── scripts/              # Local Sentinel & Security Audits
```

## 🛡️ Security Infrastructure

- **Rate Limiting**: Protected against DoS via `SlowAPI` (5 req/min/IP).
- **Input Sanitization**: Deep Pydantic validation and regex sanitization.
- **Secret Sentinel**: Automated repository auditing via `security-audit.ps1`.

### 🛡️ Sentinel-AI Governance [DEVOPS v4.0]

This repository has transitioned from legacy **ChatGPT Codex** connectors to the **Sentinel-AI (Antigravity)** governance suite.

- **Unified Intelligence**: Automated PR reviews and clinical code audits handled by the Sentinel-AI layer.
- **Node v22 Runtime**: Aligned with Vercel edge runtime for zero-drift deployments.
- **Pillar-Hardened CI**: Branch-agnostic verification gates ensuring 100% green status across the entire Kirov infrastructure.

## 🛠️ Local Sentinel Setup

Ensure your local quality gate is "Green" before any integration.

1. **Bootstrap Environment:**

    ```powershell
    .\scripts\setup-python.ps1
    ```

2. **Run Quality Gate:**

    ```powershell
    .\scripts\local-sentinel.ps1
    ```

## 🌍 Vision & Expansion

*"Sumbandila becomes Africa's digital trust layer."*
**Expansion Plan:** South Africa 🚀 Namibia 🚀 Botswana 🚀 Kenya 🚀 Pan-African

---

## 🛠️ Setup & Usage

### Prerequisites

- Node.js 20 LTS
- Python 3.11+
- PostgreSQL 15

### Setup

```bash
# Install dependencies
npm install

# Setup backend
pip install -r requirements.txt
```

### Run Commands

```bash
# Start Web
npm run dev:web

# Start Backend
npm run dev:backend
```

### Build & Test

```bash
# Build project
npm run build

# Run tests
npm test
```

## 🔐 Environment Variables

Refer to [.env.example](.env.example) for required keys. Run `node scripts/check-env.js` to validate your setup.

## 🚀 Deployment

Deployments are managed via GitHub Actions and triggered on merges to `main`.

- **Vercel**: Web landing page and dashboard.
- **Sovereign Cloud**: Backend services.

## 🛡️ Security Policy

See [SECURITY.md](SECURITY.md) for reporting vulnerabilities. CodeQL and Dependabot are active.

---

*© 2026 Sumbandila Registry Sentinel · Built for National Integrity · Powered by Kirov Dynamics.*

<div align="center">
  <img src="https://raw.githubusercontent.com/Raphasha27/Sumbandila-app/main/public/banner.png" width="100%" alt="Sumbandila Registry Sentinel Banner" />

  #  Sumbandila — Digital Trust Platform
  ### *Verify institutions and professionals instantly — in the palm of your hand.*

  
   You Can Check |
|---|---|---|
|  Colleges & Universities | DHET / CHE / SAQA | Registration status, SAQA ID, NQF level, accreditation |
|  Doctors & Specialists | HPCSA / Psytech | HPCSA number, specialisation, hospital affiliation |
|  Lawyers & Advocates | LPC / GCB | Practising status, Fidelity Fund Certificate, LPC number |
|  Psychologists | Psytech SA | Registration status and practice standing |

---

## V4 — Government-Grade Platform

### Major Capabilities:

- AI Fraud Detection — Rule-based + ML engine (RandomForestClassifier) scoring trust 0–100%
- ** Blockchain Credential Hashes** — SHA-256 tamper-proof fingerprint for every verified entity
-  5-Language Support— English, isiZulu, Afrikaans, Sepedi, Xitsonga
- 🎙️ Voice Reports — Citizens submit reports in any official language, stored in the Sovereign Registry Vault
- Expo Go Mobile App — React Native app with bottom tabs, multilingual verify, fraud reporting, and trust score display
-  Active Warning Lists — Deregistered colleges (Damelin, City Varsity, Lyceum) flagged on every search

---

##  Architecture

```
Mobile (Expo Go) ──► Web (Vite/React) ──► FastAPI V4 Backend
                                                  │
                         ┌────────────────────────┼──────────────────┐
                         │                        │                  │
                    PostgreSQL               Redis Cache        AI Engine
                    Verified DB              Fast Queries       Trust Score
                         │
                   Fraud Detection + Blockchain Hash + Audit Logs
```

---

 Monorepo Structure

```
sumbandila/
├── apps/
│   ├── web/                    # Vite + React production app
│   └── mobile/                 # Expo Go mobile app (React Native 0.85)
│
├── services/
│   ├── core/                   # FastAPI V4 backend (Python 3.12)
│   └── ai/                     # ML modules (Fraud detection, trust scoring)
│
├── infra/                      # CI/CD and Kubernetes orchestration
├── packages/                   # Shared types and utility logic
├── data/                       # Mock registry data (50k+ records)
└── vercel.json                 # Unified deployment configuration
```

---

## 🚀 Deployment & Integrity

- **Frontend**: Deployed on Vercel with automated CI/CD.
- **Backend**: Containerized via Docker for K8s scalability.
- **Security**: 0 vulnerabilities via pinned dependencies and root-level toolchain enforcement.

---

## 💼 Launch & Investment

Everything you need to move from code to market:

- **Investor Deck**: Professional pitch templates available in `docs/investor_launch_kit.md`.
- **Mock Data**: 50,000+ realistic registry records ready for load testing.
- **ML Engine**: Production-grade RandomForest model for fraud scoring.



*© 2026 Sumbandila Registry Sentinel · Built for national integrity and public trust.*

<div align="center">
  <img src="https://raw.githubusercontent.com/Raphasha27/Sumbandila-app/main/public/banner.png" width="100%" alt="Sumbandila Registry Sentinel Banner" />

  # 🛡️ Sumbandila — Digital Trust Platform
  ### *Verify institutions and professionals instantly — in the palm of your hand.*

  
  [![CI/CD](https://img.shields.io/badge/CI/CD-Passing-28a745?style=for-the-badge&logo=github-actions)](https://github.com/Raphasha27/Sumbandila-app/actions)
  [![Security](https://img.shields.io/badge/Dependabot-Secure-blue?style=for-the-badge&logo=dependabot)](https://github.com/Raphasha27/Sumbandila-app/security)
  [![Version](https://img.shields.io/badge/Version-V4.0-0056B3?style=for-the-badge)](https://github.com/Raphasha27/Sumbandila-app)

  ---

  **Sumbandila is Africa's digital trust infrastructure — verify before you enrol, hire, or pay.**
</div>

---

## 🧠 What is Sumbandila?

Sumbandila lets anyone instantly verify:

| Category | Authority | What You Can Check |
|---|---|---|
| 🎓 Colleges & Universities | DHET / CHE / SAQA | Registration status, SAQA ID, NQF level, accreditation |
| 🏥 Doctors & Specialists | HPCSA / Psytech | HPCSA number, specialisation, hospital affiliation |
| ⚖️ Lawyers & Advocates | LPC / GCB | Practising status, Fidelity Fund Certificate, LPC number |
| 🔬 Psychologists | Psytech SA | Registration status and practice standing |

---

## 🚀 V4 — Government-Grade Platform

### Major Capabilities:

- **🤖 AI Fraud Detection** — Rule-based + ML engine (RandomForestClassifier) scoring trust 0–100%
- **⛓️ Blockchain Credential Hashes** — SHA-256 tamper-proof fingerprint for every verified entity
- **🌍 5-Language Support** — English, isiZulu, Afrikaans, Sepedi, Xitsonga
- **🎙️ Voice Reports** — Citizens submit reports in any official language, stored in the Sovereign Registry Vault
- **📱 Expo Go Mobile App** — React Native app with bottom tabs, multilingual verify, fraud reporting, and trust score display
- **🚨 Active Warning Lists** — Deregistered colleges (Damelin, City Varsity, Lyceum) flagged on every search

---

## 🏗️ Architecture

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

## 📂 Monorepo Structure

```
sumbandila/
├── apps/
│   ├── web/                    # Vite + React web app
│   └── mobile/                 # Expo Go mobile app
│       ├── navigation/         # React Navigation (bottom tabs + stack)
│       └── screens/            # Home, Verify, Result, Report, Profile
│
├── services/
│   └── core/                   # FastAPI V4 backend
│       └── app/
│           ├── api/routes/     # verify, institutions, professionals, reports
│           ├── models/         # SQLAlchemy models (Institution, Professional, VerificationLog)
│           ├── schemas/        # Pydantic request/response schemas
│           ├── services/       # Verification engine + Fraud detection
│           └── core/           # Config (env-based) + JWT security
│
├── ai/
│   └── fraud_model.py          # ML fraud detection (RandomForest, scikit-learn)
│
├── database/
│   └── schema.sql              # PostgreSQL V4 production schema
│
├── infrastructure/
│   └── kubernetes/             # K8s deployment (3 replicas + LoadBalancer)
│
└── .env.example                # Copy to .env and fill in secrets (never commit .env)
```

---

## ⚡ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/verify/?q=...&lang=en` | 🔎 Public search — returns trust score, blockchain hash, risk signals |
| `POST` | `/api/v1/reports/` | 🚨 Submit a fraud report (anonymous) |
| `GET` | `/api/v1/institutions/` | 📋 List institutions (admin JWT required) |
| `POST` | `/api/v1/institutions/` | ➕ Add institution (admin JWT required) |
| `GET` | `/api/v1/professionals/` | 📋 List professionals (admin JWT required) |
| `GET` | `/health` | ✅ Service health check |
| `GET` | `/api/docs` | 📖 Interactive Swagger UI |

### Example Response:
```json
{
  "name": "Dr Jane Smith",
  "profession": "Doctor",
  "authority": "HPCSA",
  "status": "Practising",
  "status_label": "✅ Verified & Registered",
  "trust_score": 96,
  "fraud_score": 0.04,
  "risk_label": "✅ LOW — Appears Legitimate",
  "blockchain_hash": "0x7f92e3a1b8c4d2e6f0a9b3c5",
  "identity_verified": true,
  "signals_triggered": []
}
```

---

## 🚀 Run Locally

### Backend (FastAPI)
```bash
# Environment is pre-configured with SQLite for instant start
cd services/core
# Virtual environment is already set up in .venv
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

### Web App
```bash
npm install
npm.cmd run dev --workspace=@sumbandila/web
# http://localhost:5173
```

### Mobile App (Expo Go)
```bash
cd apps/mobile
npm install
npx expo start
# Scan the QR code with the Expo Go app on your phone
```

---

## 🔐 Security

- All secrets via environment variables (`.env` excluded from Git via `.gitignore`)
- JWT authentication (Argon2 password hashing)
- IP addresses stored as SHA-256 hashes in audit logs (GDPR-safe)
- Dependabot: zero known vulnerabilities

---

## 🔐 Demo Credentials (Dev Only)

| Role | Email | Password |
|---|---|---|
| Sentinel Auditor | `admin@sumbandila.com` | `admin123` |

> ⚠️ Change these before deploying to production via environment variables.

---

## 🌍 Vision

> *"Sumbandila becomes Africa's digital trust layer. Before someone enrolls in a college, hires a lawyer, or visits a doctor — they verify through Sumbandila first."*

**Expansion Plan:** 🇿🇦 South Africa → 🇳🇦 Namibia → 🇧🇼 Botswana → 🇰🇪 Kenya → 🌍 Pan-African

---

## 🚀 Startup Launch Kit

Everything you need to move from code to market:

- **📄 Investor Pitch Deck:** [investor_launch_kit.md](file:///C:/Users/nelso/.gemini/antigravity/brain/e0ed5548-3d1e-479e-a6c7-9c9365c24613/investor_launch_kit.md)
- **📫 Outreach Templates:** Included in the launch kit.
- **📊 Mock Data:** 50,000 realistic registry records in `data/verified_registry_v4.csv`.
- **🌎 Landing Page:** Premium portal in `apps/landing-page/index.html`.
- **🧠 ML Model:** Fraud detection logic in `ai/fraud_model.py`.

---

*© 2026 Sumbandila Registry Sentinel · Built for national integrity and public trust.*

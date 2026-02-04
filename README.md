<div align="center">
  <img src="public/banner.png" width="100%" alt="Sumbandila Registry Sentinel Banner" />

  # 🏆 Sumbandila: Enterprise SaaS Platform Blueprint

  [![Architecture](https://img.shields.io/badge/Architecture-DDD_%2F_Microservices-blue?style=for-the-badge)](https://github.com/Raphasha27/Sumbandila-app)
  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://sumbandila-app.vercel.app)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
  
  **A production-grade, high-integrity Registry Platform designed for national-scale institutional auditing.**
</div>

---

## 🔐 Quick Start & Access

To access the secured **Sentinel Dashboard** (Web) or **Field App** (Mobile), use the official institutional credentials:

| Role | Email | Password | Clearance |
| :--- | :--- | :--- | :--- |
| **Sentinel Admin** | `admin@sumbandila.com` | `admin123` | **Level 5 (Global)** |

> **Note**: The **Mobile App** enforces a mandatory "Get Started" splash screen and validates these specific credentials. Biometric auth will trigger on subsequent logins.

---

## 🏛️ System Architecture

Sumbandila is built as a **Distributed SaaS Platform**, moving beyond traditional monolithic design to a Domain-Driven Monorepo.

### Bounded Contexts
1.  **Identity Registry (Auth Service)**: High-security RBAC and organizational credential management.
2.  **Sentinel Gateway (Core API)**: The algorithmic heart for institutional risk assessment.
3.  **Audit Pulse (Real-time Feed)**: Event-driven tracking of registry changes via Redis.
4.  **AI Sentinel (Fraud Service)**: Predictive risk engine analyzing registry events for anomalies.
5.  **Sentinel Mobile (React Native)**: Field auditing tools for native scanners (iOS/Android).

---

## 🛠️ Enterprise Tech Stack

### Platforms
- **Web App**: Next.js / React (Modern App Router)
- **Mobile App**: React Native / Expo with **Native Biometric Auth** (FaceID/TouchID)

### Intelligence & Observability
- **Predictive AI**: FastAPI-based Fraud Detection with event-driven triggers.
- **Observability Level 5**: Prometheus (Metrics) + Grafana (Visual Dashboards).
- **Distributed Tracing**: OpenTelemetry (OTel) + Jaeger (Spans).
- **Event Bus**: Redis Streams.

### Backend Ecosystem
- **Engines**: FastAPI (Python) - High-concurrency async.
- **Database**: PostgreSQL (Relational Data Integrity)
- **Cache**: Redis (High-speed event streams)

### DevOps & Infrastructure
- **CI/CD**: GitHub Actions (Linting, Atomic Builds, Containerization).
- **Disaster Recovery**: Automated, encrypted S3 backups with WORM guarantees.
- **Federated Trust**: OIDC (OpenID Connect) Identity Provider for cross-agency integration.
- **Containerization**: Docker & Docker Compose.
- **Architectural Records**: ADR documentation for technical lineage (13+ records).

---

## 🏗️ Repository Structure

```text
/apps         -> Federated frontend applications
/services     -> Domain-specific microservices (FastAPI)
/packages     -> Shared libraries (UI, Types, Utils)
/docs/adr     -> Architecture Decision Records
/docker       -> Production-ready container configs
```

---

## 📈 Engineering Standards

- **DDD (Domain-Driven Design)**: Logic is isolated by business domain.
- **Event-Driven**: Services communicate via events (Coming soon).
- **Security First**: RBAC integrated from the foundation.
- **Observability**: Health checks and structured logging built-in.

---

## 📦 Local Development (Orchestration)

To spin up the entire enterprise environment:

```bash
docker-compose up --build
```

---

## 🌐 Live Deployments

### Web Application (Vercel)
The web dashboard is deployed and accessible at:

🔗 **[https://sumbandila-app.vercel.app/](https://sumbandila-app.vercel.app/)**

Features the "Get Started" splash, Login authentication, and the full Sentinel Dashboard.

### Mobile Application (Expo Go)
The mobile field app runs natively on iOS/Android via Expo Go:

1. Install **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Clone this repository and navigate to the mobile app:
   ```bash
   cd apps/mobile
   npm install
   npx expo start
   ```
3. Scan the QR code with Expo Go to launch on your device.

Features native biometric authentication (FaceID/TouchID), the branded gradient splash, and secure credential validation.

---
*Developed for Excellence in Software Engineering & Public Integrity. © 2026 Sumbandila Registry Sentinel.*

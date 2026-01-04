# 🏗️ SYSTEM ARCHITECTURE & 12-WEEK ROADMAP
## Project: Sumbandila™ - National Verification & Digital Certification Platform
**Target Level:** Senior Engineering
**Stack:** React Native (Expo), Node.js (Express/FastAPI), PostgreSQL, Redis, Docker.

---

## 1. HIGH-LEVEL ARCHITECTURE (The "System")

We are moving from a Monolith to a **Modular Service-Based Architecture**.

### 🔹 1.1 The Core Services (Backend)
Instead of one `server.js`, we typically structure logically (even if monorepo first):

1.  **Auth Service (`/auth`)**:
    *   Handles JWT issuance, Refresh Tokens, RBAC (Role-Based Access Control).
    *   *Key Tech:* Passport.js / Argon2 (hashing) / Redis (session blacklisting).

2.  **Registry Service (`/registry`)**:
    *   The "Source of Truth". Stores Institutions, Professionals, and Accreditation data.
    *   *Key Tech:* PostgreSQL (Relational integrity is non-negotiable).

3.  **Verification Service (`/verify`)**:
    *   Public-facing API. High-read throughput.
    *   *Key Tech:* Redis Caching (cache warm-up for instant search).

4.  **Certification Authority (`/certify`) - *NEW UPGRADE***:
    *   Issues cryptographically signed digital certificates.
    *   *Key Tech:* Digital Signatures (ECDSA), PDF Generation (PDFKit), QR generation.

5.  **Audit Service (`/audit`)**:
    *   Immutable logs of *every* verification attempt.
    *   *Key Tech:* TimescaleDB or append-only Postgres table.

### 🔹 1.2 The Clients (Frontend)
1.  **Public Mobile App (React Native/Expo):** For citizens to verify.
2.  **Web Admin Portal (React):** For DHET/HPCSA admins to manage data.
3.  **Partner Portal (React):** For colleges to issue certificates.

---

## 2. THE 12-WEEK ENGINEERING ROADMAP

### 🌑 PHASE 1: THE IRON FOUNDATION (Weeks 1-4)
*Goal: Solidify the existing MVP into a senior-grade backend.*

*   **Week 1:** **Docker & Database Design.**
    *   Define strict SQL schemas (Foreign Keys, Indexes).
    *   Containerize the app (Dockerfile, docker-compose).
*   **Week 2:** **Auth & Security hardening.**
    *   Implement RBAC (Admin, Issuer, Auditor, User).
    *   Add Rate Limiting (Redis) to prevent scraping.
*   **Week 3:** **Registry CRUD & Ingestion.**
    *   Build Admin endpoints to Bulk Import CSV data (streaming uploads).
*   **Week 4:** **Public Search Optimization.**
    *   Implement Fuzzy Search (Trigrams) in Postgres.
    *   Set up Redis caching for common searches.

### 🌓 PHASE 2: THE CERTIFICATION ENGINE (Weeks 5-8)
*Goal: Build the "Digital Certification" feature (The USP).*

*   **Week 5:** **Certificate Generation.**
    *   Backend logic to generate PDF certificates from data.
*   **Week 6:** **Cryptographic Signing.**
    *   Sign certificates with a private key.
    *   Generate tamper-proof Verification URLs/QRs.
*   **Week 7:** **Issuer Portal.**
    *   Frontend for Schools to "Issue Bulk Certificates".
*   **Week 8:** **Verification Logic.**
    *   Update scanner to validate the *signature*, not just look up the ID.

### 🌕 PHASE 3: SCALE & PRODUCTION (Weeks 9-12)
*Goal: Make it "Government Ready".*

*   **Week 9:** **Audit & Analytics.**
    *   Build the dashboard showing "Fraud Attempts Prevented".
*   **Week 10:** **Background Jobs.**
    *   Move email sending and bulk imports to a Job Queue (BullMQ).
*   **Week 11:** **Testing & CI/CD.**
    *   Unit Tests (Jest) and E2E Tests.
    *   GitHub Actions pipeline.
*   **Week 12:** **Documentation & Handover.**
    *   API Documentation (Swagger/OpenAPI).
    *   System Architecture Diagrams.

---

## 3. IMMEDIATE NEXT ACTION (Week 1, Day 1)

**Task:** "Dockerize" the current environment and set up the robust database schema.

**Decision:**
Do you want to start with:
1.  **Containerization**: Create `Dockerfile` and `docker-compose.yml`?
2.  **Database Hardening**: Create the strict SQL migration scripts?

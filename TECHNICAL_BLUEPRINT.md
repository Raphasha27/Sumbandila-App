# Sumbandila Sentinel: Technical Blueprint (April 2026)

## 1. Data Integration Strategy
The platform uses a **Hybrid-Cached Model** to balance performance with data accuracy.

| Sector | Source | Integration Path | Frequency |
| :--- | :--- | :--- | :--- |
| **Colleges (TVET)** | DHET Register (Section B) | **Cached**: Python + `pdfplumber` | Monthly (Last: April 15, 2026) |
| **Universities** | DHET Private HEI Register | **Cached**: PDF Parsing | Monthly |
| **Schools (K-12)** | DBE Masterlist (LURITS) | **Cached**: EMIS Number Validation | Quarterly |
| **Doctors** | HPCSA iRegister | **Live**: Playwright Scraper | Real-time |
| **Lawyers** | LPC Search Portal | **Live**: Playwright Scraper | Real-time |
| **Nurses** | SANC eRegister | **Live**: SANC Ref/ID Number required | Real-time |

## 2. The "Red Flag" Logic (Fly-By-Night Filter)
Sumbandila doesn't just check for existence; it checks for **Accreditation Scope**.
*   **GREEN (Verified)**: Registered Institution + Accredited Course.
*   **YELLOW (Caution)**: Registered Institution + **UNACCREDITED** Course.
*   **RED (Danger)**: Institution listed in Section A (Cancelled) or Practitioner Suspended.

## 3. Technology Stack
*   **Frontend**: React 19 + Vite + Tailwind (Mobile-First "Palm of Hand" UI).
*   **State Management**: Zustand (Persistent Registry Vault).
*   **AI Assistant**: Sipho AI (Navigation & Compliance guide).
*   **Backend (Proposed)**: Python (FastAPI) + Playwright + pdfplumber.
*   **Database**: PostgreSQL (Structured Registry Cache).

## 4. Verification Standards
*   **EMIS Number**: The Gold Standard for school verification.
*   **SANC Ref**: Mandatory for Nursing (Surname search is disabled for security).
*   **LPC Fidelity Fund**: Verified for all legal practitioner trust accounts.

---
*Sumbandila: Fighting Corruption through Digital Integrity 🇿🇦*

# 🧠 Sumbandila: Wise Architecture Manifest

This document outlines the elite design principles that govern the Sumbandila platform, ensuring it survives real-world failure, human error, and institutional scrutiny.

## 🛡️ 1. Design for Human Error
- **Soft Deletes**: No critical record (User, Certificate, Registry Entry) is permanently deleted via the API.
- **Audit Trails**: Every state change is recorded with an `actor_id` and `timestamp`.
- **Approval Gates**: Destructive actions (like revocation) require a secondary "Sentinel Audit" or peer review.

## 🔐 2. Trust-First Security
- **Least Privilege**: Services and users start with zero access. Permissions are granted via RBAC.
- **Field-Level Integrity**: Sensitive registry data is hashed or encrypted to prevent unauthorized modification.
- **Transparency**: Verification status is publicly provable via cryptographic seals.

## 🌪️ 3. Failure as a First-Class Citizen
- **Graceful Degradation**: If the AI Sentinel is offline, the platform falls back to manual registry search.
- **Circuit Breakers**: External registry syncs are isolated; if one fails, the system continues to serve other domains.
- **Kill Switches**: Automated auditors can pause issuing if fraudulent patterns are detected.

## 📜 4. Institutional Legitimacy
- **Immutability**: The internal audit log is "Write Once Read Many" (WORM) to ensure fiscal and legal integrity.
- **Governance**: Decisions are documented in ADRs (Architecture Decision Records) found in `/docs/adr`.

---

### ✅ Wise Architecture Checklist
- [ ] Is this action reversible?
- [ ] Is there an audit trail for this event?
- [ ] Could a tired admin break this by mistake?
- [ ] What happens if the database is read-only?
- [ ] Who bears the risk if this fails?

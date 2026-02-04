# Security Model & Threat Matrix

## 1. Identity & Access
- **AuthN**: JWT-based authentication with token rotation.
- **AuthZ**: Layered RBAC (Role-Based Access Control).
  - `LEVEL_1`: Citizen (Search only)
  - `LEVEL_3`: Registry Agent (Verify & Log)
  - `LEVEL_5`: Sentinel Administrator (Revoke & Override)

## 2. Data Protection
- **PII (Personally Identifiable Information)**: Encrypted at rest using AES-256.
- **Sensitive Fields**: Passwords hashed using Argon2id.
- **Network**: All internal service communications happen over a private Docker network (virtual VPC).

## 3. Threat Mitigation
| Threat | Mitigation |
| :--- | :--- |
| Brute Force | Rate limiting on `/auth` endpoints |
| SQL Injection | Pydantic validation + ORM Parameterization |
| Token Theft | Refresh token rotation & blacklisting |
| Insider Abuse | Dual-control required for `LEVEL_5` actions |

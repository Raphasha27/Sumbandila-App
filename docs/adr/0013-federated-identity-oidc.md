# ADR 0013: Federated Trust & Digital Identity (OIDC)

## Status
Accepted

## Context
Sumbandila is the authoritative source for certain digital credentials. Other government departments (Home Affairs, SARS) need to verify citizens' identities or credentials without duplicating the entire registry.

## Decision
We will implement **Sumbandila as an Identity Provider (IdP)** based on the **OpenID Connect (OIDC)** standard.

### Integration Path:
1. **OIDC Discovery**: Implement `/.well-known/openid-configuration` for automated partner integration.
2. **Federated Scopes**: Define scopes (e.g., `registry:verify`, `identity:profile`) to limit data exposure.
3. **Cross-Agency Trust**: Allow partners to accept Sumbandila JWTs as authoritative proof of institutional status.

## Consequences
- **Pros**: Platform becomes a "Center of Trust" for the national digital ecosystem, reduced fragmentation, improved interoperability.
- **Cons**: Increased responsiblity for the `auth-service` as an IdP; requires rigorous key rotation and security auditing.

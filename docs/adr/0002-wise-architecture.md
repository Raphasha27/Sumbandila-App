# ADR 0002: Wise Architecture & Failure Mitigation

## Status
Accepted

## Context
Standard enterprise applications often fail due to human error (accidental deletion) or rigid automation (blocking legitimate actions).

## Decision
We will implement "Wise Architecture" patterns across all services.

### Core Principles
1. **Soft Deletes**: Use `is_deleted` flags instead of `DELETE` statements.
2. **Audit Hooks**: Every mutation must trigger an audit log entry.
3. **Human-in-the-loop**: High-risk actions (revocations) require human authorization via RBAC Level 5.
4. **Graceful Degradation**: External failures (AI Sentinel down) must not block the core registry functions.

## Consequences
- **Storage**: Increased storage for maintaining "deleted" records and extensive audit logs.
- **Complexity**: API logic must account for `is_deleted` filtering.
- **Safety**: Significant reduction in irreversible catastrophic errors.

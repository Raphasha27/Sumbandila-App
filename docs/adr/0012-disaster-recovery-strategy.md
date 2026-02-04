# ADR 0012: Disaster Recovery & Data Sovereignty Strategy

## Status
Accepted

## Context
A state-level registry cannot afford even a 0.001% risk of data loss. We need a way to survive regional cloud outages or catastrophic database corruption.

## Decision
We will implement an **Automated Cross-Regional Backup Strategy** with **WORM (Write Once Read Many)** guarantees.

### Key Strategy:
1. **Frequency**: Backups occur every 24 hours (automated by `backup-service`).
2. **Encryption**: Dumps are encrypted using AES-256 before transit.
3. **Storage**: Off-site storage via S3 with **Object Lock** enabled to prevent ransomware tampering.
4. **Geo-Redundancy**: Backups are replicated across geographically distinct regions.

## Consequences
- **Pros**: Near-zero risk of permanent data loss, compliance with national data sovereignty laws.
- **Cons**: Increased storage costs, necessity for periodic "Restore Drills" to verify integrity.

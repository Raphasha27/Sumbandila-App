# Incident Response Protocol: Sentinel Registry Platform

## 1. Classification
| Priority | Description | Example |
| :--- | :--- | :--- |
| **P0** | Critical failure; Audit data at risk | DB corruption; Root key compromised |
| **P1** | High impact; Core services down | Auth service offline; Registry sync failure |
| **P2** | Partial failure; Degraded performance | AI Sentinel timeout; Latency in activity feed |

## 2. Response Workflow (Triage to Recovery)
1. **Detection**: Alerts triggered via Prometheus/Healthchecks.
2. **Isolation**: Trigger "Circuit Breakers" in `docker-compose`.
3. **Investigation**: Query the `Audit Registry` for the last known stable state.
4. **Correction**: Deploy patch or rollback via GitHub Actions.
5. **Post-Mortem**: Document in `/docs/postmortems` (Blame-free).

## 3. Communication Channels
- **Internal**: Slack #sentinel-ops
- **External**: Status Page @ status.sumbandila.com
- **Legal/Regulator**: Notification within 72 hours (POPIA Compliance).

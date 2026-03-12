# ADR 0008: AI-Powered Predictive Security (Fraud Detection)

## Status
Accepted

## Context
Traditional registry systems are "Reactive"—they only detect errors after they are manually reported. To achieve "Sentinel" status, the platform must proactively identify anomalous patterns in real-time.

## Decision
We will implement an **AI-Powered Fraud Detection Service** that analyzes every "Certificate Issuance" event.

### Implementation Logic:
1. **Event Capture**: Listens to the `CERT_ISSUED` stream via the Redis event bus.
2. **Analysis Engine**: Applies a series of heuristic and predictive rules to calculate a `Risk Score` (0.0 to 1.0).
3. **Automated Response**: If risk exceeds a threshold (0.6), the system broadcasts a `RISK_ALERT` to the `Audit Service`.
4. **Human-in-the-loop**: Flagged items are frozen in the registry until a Level 5 Admin reviews them.

## Consequences
- **Pros**: Proactive fraud prevention, reduced manual audit overhead, higher registry integrity.
- **Cons**: Potential for "false positives" (Mitigated by human-in-the-loop review).

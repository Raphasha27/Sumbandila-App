# ADR 0007: Performance Monitoring & Alerting Strategy

## Status
Accepted

## Context
Operational excellence requires real-time monitoring of system health and performance. We need to know when the registry is slow or when the AI Sentinel is failing before the users do.

## Decision
We will deploy **Jaeger** as our primary tracing visualization tool and **Prometheus** for metrics.

### Key Metrics to Track:
1. **Verification Latency**: Time from search to registry response.
2. **Success/Failure Rates**: Percentage of valid vs. fraudulent certificate returns.
3. **Queue Depth**: Number of events pending in the Redis Stream.
4. **Service Health**: Uptime and memory usage of Auth, Core, and Audit services.

## Consequences
- **Pros**: Proactive issue detection, evidence-based performance tuning, professional operational dashboard.
- **Cons**: Additional storage for long-term metric retention.

# ADR 0005: Distributed Tracing & Observability (OpenTelemetry)

## Status
Proposed

## Context
In a distributed microservices architecture, troubleshooting "transient failures" or "latency bottlenecks" across service boundaries (Auth -> Core -> Redis -> Audit) is extremely difficult without centralized tracing.

## Decision
We will adopt **OpenTelemetry (OTel)** as the platform's observability standard.

### Execution Plan:
1. **Instrument backends**: Use `opentelemetry-sdk` to automatically trace FastAPI requests.
2. **Centralized Collector**: Deploy an OTel Collector to aggregate spans.
3. **Visualization**: Use **Jaeger** for distributed trace visualization.
4. **Correlation IDs**: Pass trace headers across all Redis Steam events.

## Consequences
- **Pros**: Clear visibility into cross-service performance, faster MTTR (Mean Time To Recovery), pinpointing bottleneck services.
- **Cons**: Minor performance overhead for span generation, increased infrastructure complexity.

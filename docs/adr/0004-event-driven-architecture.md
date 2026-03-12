# ADR 0004: Event-Driven Messaging (Redis Streams)

## Status
Accepted

## Context
As the platform scales, synchronous processing of side-effects (e.g., logging audits, sending notifications, updating global feeds) slows down the core "Verify" transaction.

## Decision
We will use an **Event-Driven Architecture** utilizing **Redis Streams** as the primary message bus.

### Operational Flow:
1. **Publisher**: Core services emit "Atomic Events" (e.g., `CERT_ISSUED`) to the `sumbandila_events` stream.
2. **Broker**: Redis handles message ordering and persistence.
3. **Consumer Groups**: Independent workers (e.g., `Audit Service`, `Notification Worker`) consume events asynchronously.

## Consequences
- **Pros**: Horizontal scalability, high availability, decoupled services, improved user-perceived performance.
- **Cons**: Increased system complexity, necessity for "Eventual Consistency" management.

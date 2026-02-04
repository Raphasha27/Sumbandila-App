# ADR 0006: Multi-Platform Strategy (React Native)

## Status
Accepted

## Context
Registry agents and institutional field auditors require a high-performance, offline-capable mobile interface that leverages native device capabilities (Camera for QR Scanning, Biometrics for Level 5 Identity check).

## Decision
We will expand the monorepo to include a **React Native (Expo)** mobile application.

### Key Strategy:
1. **Shared Logic**: Share the `Zustand` store configuration or `Shared Types` between `/apps/web` and `/apps/mobile` where possible.
2. **Native Bridges**: Utilize Expo SDK for rapid cross-platform deployment (iOS/Android).
3. **Registry Sync**: Build for "Offline-First" verification for agents in low-connectivity regions.

## Consequences
- **Pros**: Unified developer experience across web and mobile, shared business logic, native performance.
- **Cons**: Increased complexity in monorepo dependency management (Native dependencies).

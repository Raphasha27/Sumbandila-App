# ADR 0009: Continuous Integration & Deployment (CI/CD)

## Status
Accepted

## Context
As a monorepo platform with multiple frontend apps and backend services, manual builds and deployments are prone to human error and environmental drift.

## Decision
We will use **GitHub Actions** to automate the build, test, and containerization pipeline.

### Pipeline Requirements:
1. **Linting**: Enforce Prettier and PEP8 across the entire monorepo.
2. **Atomic Builds**: Verify that individual services and apps build correctly in isolation.
3. **Container Registry**: Build and push Docker images to the registry on every push to `main`.
4. **Multi-Platform**: Build both Web and Mobile (Expo) assets.

## Consequences
- **Pros**: Guaranteed build integrity, faster release cycles, professional operational standard.
- **Cons**: Initial setup overhead and GitHub Action minute consumption.

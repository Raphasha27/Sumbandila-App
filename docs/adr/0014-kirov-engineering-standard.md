# ADR-014: Kirov Standard Engineering Workflow Adoption

**Date:** 2026-Q2
**Status:** Accepted

## Decision

Adopt the Kirov Dynamics Engineering Standard across the Sumbandila monorepo.

## Context

As Sumbandila scales from prototype to production-grade sovereign infrastructure, consistent contributor workflows, automated quality gates, and unified tooling become non-negotiable.

## Changes Applied

- **CI/CD:** GitHub Actions pipeline covers backend lint/test, frontend lint/test/build, and CodeQL security scan on every push and PR.
- **Dependabot:** Automated weekly dependency PRs for `pip`, `npm`, and GitHub Actions.
- **Makefile:** Unified `make` interface for `dev`, `test`, `lint`, `format`, `docker-up`, `migrate`, and `clean`.
- **Branch Strategy:** `feature/*`, `fix/*`, `refactor/*`, `chore/*`, `docs/*` off `dev`; only tested code merges to `main`.
- **Commit Standard:** Conventional Commits enforced across all contributions.

## Consequences

- Every contributor uses the same onboarding path (`make dev` / `docker-compose up`).
- CI gates prevent broken code from reaching `main`.
- Contribution history becomes dense, structured, and readable as an engineering audit trail.

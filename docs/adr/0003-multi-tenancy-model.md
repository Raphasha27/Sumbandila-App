# ADR 0003: Multi-Tenant Data Architecture (Shared Schema)

## Status
Accepted

## Context
Sumbandila needs to serve multiple national institutions (DHET, HPCSA, LPC) while maintaining strict data isolation. We need a way to ensure that "Registry Agent A" cannot see or modify "Registry Agent B's" data.

## Decision
We will implement "Multi-tenancy" using a **Shared Database, Shared Schema** approach with Mandatory `tenant_id` filtering.

### Key Implementation Details:
1. **Tenant Context**: Every inbound request must provide a `tenant_id` (usually derived from a JWT claim).
2. **Row-Level Isolation**: All database models include a `tenant_id` column.
3. **Implicit Filtering**: Service-layer logic must always include `.where(tenant_id=current_tenant)` in queries.

## Consequences
- **Pros**: Lower infrastructure cost, easier cross-tenant analytics (for Super Admins), simpler migrations.
- **Cons**: Risk of "Data Leaks" if developers forget the tenant filter in raw queries (Mitigated by ORM hooks and `get_tenant_id` dependency).

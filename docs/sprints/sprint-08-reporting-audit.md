# Sprint 8 — Reporting & Audit

**Goal:** dashboards for managers/admins, and a trail of who did what.
**Depends on:** Sprint 3, Sprint 5 (reuses caching for the heavy aggregate queries)
**Estimate:** ~4-5 days

## TD-42 — Dashboard aggregation queries
- **Description:** Org/department-level stats: open vs closed count, average resolution time, breach count this week.
- **Tasks:**
  - [ ] `GET /reports/dashboard` scoped to the requester's org/department
  - [ ] Aggregate queries (COUNT, AVG on resolution duration) — raw query or query builder, whichever stays readable
  - [ ] Wrap with the caching pattern from Sprint 5 (these queries are expensive)
- **Acceptance criteria:** numbers match a manual COUNT/AVG check against the same filtered data.
- **Concepts:** aggregate SQL, applying caching where it matters most
- **Estimate:** L

## TD-43 — Agent leaderboard endpoint
- **Description:** Tickets resolved + average response time per agent, for a Team Lead's own department.
- **Tasks:**
  - [ ] `GET /reports/agents` grouped by assignee
  - [ ] Scoped so a Team Lead only sees their own department's agents
- **Acceptance criteria:** an agent's numbers only include tickets actually resolved by them, not just assigned.
- **Concepts:** GROUP BY reporting queries, scope enforcement at the query level (same muscle as TD-22)
- **Estimate:** M

## TD-44 — Audit log entity + interceptor
- **Description:** Append-only log of sensitive actions (role change, ticket reassignment, deletion), captured centrally rather than sprinkled through every service method.
- **Tasks:**
  - [ ] AuditLog entity (actorId, action, entityType, entityId, metadata, createdAt)
  - [ ] Interceptor (or decorator + interceptor combo) that writes an entry for annotated endpoints
  - [ ] Apply to role changes, reassignment, deletions
- **Acceptance criteria:** every sensitive action produces exactly one audit entry, even on retried/duplicate requests.
- **Concepts:** interceptor-based cross-cutting concerns, avoiding repeated logging code in every service
- **Estimate:** M

## TD-45 — Audit log query endpoint
- **Description:** Admin-only, filterable view of the audit trail.
- **Tasks:**
  - [ ] `GET /audit-log` with filters (actor, action type, date range) + pagination
  - [ ] `@Roles('super_admin', 'org_admin')` guard
- **Acceptance criteria:** an Agent hitting this endpoint gets 403.
- **Concepts:** reusing the filter/pagination pattern from TD-22 on a new resource
- **Estimate:** S

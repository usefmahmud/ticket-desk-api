# Sprint 2 — Organizations, Departments, Users

**Goal:** the org/department/agent structure that tickets will hang off of.
**Depends on:** Sprint 1
**Estimate:** ~4-5 days

## TD-13 — Organization CRUD (Super Admin only)
- **Description:** `Organization` entity + CRUD endpoints, restricted to Super Admin.
- **Tasks:**
  - [ ] Organization entity + migration
  - [ ] CRUD endpoints guarded by `@Roles('super_admin')`
- **Acceptance criteria:** an Org Admin cannot create an organization (403).
- **Concepts:** guards in practice, scoped CRUD
- **Estimate:** S

## TD-14 — Department CRUD within org
- **Description:** Departments belong to one organization; Org Admin manages their own org's departments only.
- **Tasks:**
  - [ ] Department entity (orgId FK) + migration
  - [ ] CRUD endpoints scoped to `req.user.orgId`
- **Acceptance criteria:** an Org Admin from Org A cannot read/modify Org B's departments.
- **Concepts:** tenant-scoped queries, ownership checks
- **Estimate:** M

## TD-15 — Invite/create agent, assign role + department
- **Description:** Org Admin (or Team Lead for their own team) creates agent accounts and assigns them to a department.
- **Tasks:**
  - [ ] `POST /departments/:id/agents` endpoint
  - [ ] Email/password-set flow (can be a simple temp-password email for now)
  - [ ] Role assignment on creation
- **Acceptance criteria:** new agent can log in and see only their department's queue (verified once Sprint 3 ships tickets).
- **Concepts:** cross-module service composition
- **Estimate:** M

## TD-16 — Category CRUD
- **Description:** Ticket categories, configurable per org.
- **Tasks:**
  - [ ] Category entity (orgId FK) + migration
  - [ ] CRUD endpoints
- **Acceptance criteria:** categories list only shows the requester's org's categories.
- **Concepts:** simple scoped CRUD (repetition builds muscle memory)
- **Estimate:** S

## TD-17 — Ownership guard utilities
- **Description:** A reusable guard/decorator for "can this user access this specific resource" checks (not just role-based).
- **Tasks:**
  - [ ] `@CurrentUser()` param decorator
  - [ ] Ownership check helper (e.g. `ticket.requesterId === user.id`) usable across services
- **Acceptance criteria:** documented pattern ready to plug into the ticket endpoints in Sprint 3.
- **Concepts:** custom decorators, resource-level authorization (distinct from role-level)
- **Estimate:** M

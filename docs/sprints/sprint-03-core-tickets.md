# Sprint 3 — Core Ticket Management

**Goal:** full ticket CRUD + lifecycle + comments. This is the heart of the app.
**Depends on:** Sprint 2
**Estimate:** ~1 week

## TD-18 — Ticket entity + migrations
- **Description:** Ticket entity per §9 of the BRD (title, description, status, priority, categoryId, requesterId, assigneeId, departmentId, slaDueAt).
- **Tasks:**
  - [ ] Entity + migration
  - [ ] Indexes on status, departmentId, assigneeId (you'll filter by these constantly)
- **Acceptance criteria:** migration runs cleanly; indexes visible in `\d tickets`.
- **Concepts:** entity design, DB indexing basics
- **Estimate:** S

## TD-19 — Create ticket endpoint
- **Description:** `POST /tickets` — the flow discussed earlier (client fields only; requesterId/status/slaDueAt server-derived).
- **Tasks:**
  - [ ] `CreateTicketDto` with validation
  - [ ] `slaDueAt` computed from the org's SLA policy for the given priority (stub the policy lookup if Sprint 6 hasn't shipped yet — hardcode reasonable defaults)
  - [ ] `requesterId` pulled from JWT, never from the body
- **Acceptance criteria:** created ticket has status `NEW`, correct requesterId, and a computed `slaDueAt`.
- **Concepts:** the guard → pipe → service write path
- **Estimate:** M

## TD-20 — Ticket status state machine
- **Description:** Enforce legal transitions only (see BRD §8): reject e.g. `CLOSED → IN_PROGRESS` directly.
- **Tasks:**
  - [ ] Transition map (allowed next-states per current state)
  - [ ] `PATCH /tickets/:id/status` validates against the map before writing
- **Acceptance criteria:** an illegal transition returns 400 with a clear message.
- **Concepts:** domain logic encapsulated in the service layer, not the controller
- **Estimate:** M

## TD-21 — Assign/reassign ticket endpoint
- **Description:** `PATCH /tickets/:id/assign` — Team Lead/Admin only, per the permission matrix.
- **Tasks:**
  - [ ] Endpoint + role guard
  - [ ] Writes a timeline entry (TD-23) on reassignment
- **Acceptance criteria:** an Agent cannot reassign a ticket (403); a Team Lead can.
- **Concepts:** combining RolesGuard with business rules
- **Estimate:** S

## TD-22 — List/filter/paginate tickets
- **Description:** `GET /tickets` with filters (status, priority, assignee, department, date range) and pagination, scoped by role (customer sees own only, agent sees assigned only, etc.).
- **Tasks:**
  - [ ] Query builder with dynamic filters
  - [ ] Cursor or offset pagination
  - [ ] Role-based base query (not just a post-filter — scope at the query level)
- **Acceptance criteria:** a Customer's `GET /tickets` never returns another customer's ticket, even with manipulated query params.
- **Concepts:** query scoping, pagination patterns
- **Estimate:** L

## TD-23 — Ticket timeline/history
- **Description:** Append-only log of status changes and reassignments per ticket.
- **Tasks:**
  - [ ] TimelineEvent entity (ticketId, type, actorId, metadata, createdAt)
  - [ ] Write an entry from TD-20 and TD-21
  - [ ] `GET /tickets/:id/timeline` endpoint
- **Acceptance criteria:** every status change and reassignment shows up in order.
- **Concepts:** event-style logging pattern (foundation for the audit log in Sprint 8)
- **Estimate:** M

## TD-24 — Comments (public/internal)
- **Description:** `POST /tickets/:id/comments` with an `isInternal` flag; customers never see internal notes.
- **Tasks:**
  - [ ] Comment entity + migration
  - [ ] Endpoint + role check (only staff can set `isInternal: true`)
  - [ ] `GET /tickets/:id/comments` filters out internal notes for customer role
- **Acceptance criteria:** a Customer's comment list never includes an internal note, even if they know its ID.
- **Concepts:** field-level authorization, not just endpoint-level
- **Estimate:** M

# Sprint 9 — Hardening & Testing

**Goal:** the project is demoable, documented, and has real test coverage — this is the sprint that turns "it works on my machine" into "it works, provably."
**Depends on:** all previous sprints
**Estimate:** ~1 week

## TD-46 — Global exception filter + structured logging
- **Description:** One place that maps domain errors to consistent HTTP responses, and logs are structured (not `console.log`).
- **Tasks:**
  - [ ] Global `AllExceptionsFilter`
  - [ ] Swap in pino/winston, include a request-id (correlation id) in every log line
  - [ ] Correlation-id middleware generating/propagating an id per request
- **Acceptance criteria:** an unexpected error returns a clean JSON error shape, never a raw stack trace to the client, but the full stack is in the structured log alongside the request id.
- **Concepts:** exception filters, middleware, observability basics
- **Estimate:** M

## TD-47 — Health check endpoint
- **Description:** `/health` reporting DB, Redis, and MinIO connectivity.
- **Tasks:**
  - [ ] `@nestjs/terminus` setup
  - [ ] TypeORM health indicator
  - [ ] Custom health indicators for Redis and MinIO (ping each)
- **Acceptance criteria:** killing the Redis container flips `/health` to a 503 with Redis marked down, while DB/MinIO still show healthy.
- **Concepts:** `@nestjs/terminus`, custom health indicators
- **Estimate:** S

## TD-48 — Full Swagger/OpenAPI pass
- **Description:** Every endpoint documented, not just auth (from TD-12).
- **Tasks:**
  - [ ] `@ApiTags` per module
  - [ ] `@ApiProperty` on every DTO field
  - [ ] Example request/response bodies on the trickier endpoints (presigned URLs, filters)
- **Acceptance criteria:** someone unfamiliar with the code could exercise the whole API from `/api/docs` alone.
- **Concepts:** OpenAPI as documentation-as-code
- **Estimate:** M

## TD-49 — Unit tests for all services
- **Description:** Service-layer tests with mocked repositories/dependencies — the state-machine logic (TD-20) and the cache-invalidation logic (TD-32) especially deserve coverage.
- **Tasks:**
  - [ ] Jest test files per service
  - [ ] Mock repository providers (Nest's testing module + `getRepositoryToken`)
  - [ ] Prioritize: ticket state machine, SLA computation, permission/ownership checks
- **Acceptance criteria:** an illegal status transition and an unauthorized ownership check both have a failing-case test, not just happy-path tests.
- **Concepts:** Jest, Nest testing utilities, mocking
- **Estimate:** L

## TD-50 — E2E tests for critical flows
- **Description:** Supertest-driven tests against a real test database (via Docker) covering the flows that matter most.
- **Tasks:**
  - [ ] Auth flow: register → login → refresh → logout
  - [ ] Ticket lifecycle: create → assign → comment → resolve → close
  - [ ] Attachment flow: presign-upload → (mock upload) → confirm → presign-download
- **Acceptance criteria:** `npm run test:e2e` passes against a freshly-seeded test DB in CI.
- **Concepts:** e2e testing strategy, test DB isolation
- **Estimate:** L

## TD-51 — README + deployment docs
- **Description:** Enough documentation that you (or anyone else) can stand this up from scratch in ten minutes.
- **Tasks:**
  - [ ] `README.md`: prerequisites, `docker compose up`, seed command, where to find Swagger docs
  - [ ] Architecture diagram or link back to the BRD
  - [ ] Note any known limitations / stretch goals not implemented
- **Acceptance criteria:** someone with a clean machine and Docker installed can get the stack running by following the README alone.
- **Concepts:** documentation discipline
- **Estimate:** S

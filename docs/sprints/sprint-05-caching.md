# Sprint 5 — Redis Caching

**Goal:** hot read paths (ticket lists, dashboards) hit Redis before Postgres, and writes correctly bust stale entries.
**Depends on:** Sprint 3
**Estimate:** ~3-4 days

## TD-30 — Cache-manager + Redis module setup
- **Description:** Wire `@nestjs/cache-manager` with a Redis store, available app-wide.
- **Tasks:**
  - [ ] Global `CacheModule` config pointing at the same Redis instance as BullMQ (separate DB index recommended)
  - [ ] Sane default TTL
- **Acceptance criteria:** a manual `cacheManager.set/get` round-trips correctly in a quick test route.
- **Concepts:** cache-manager + Redis store wiring
- **Estimate:** S

## TD-31 — Cache interceptor for list/dashboard reads
- **Description:** Cache `GET /tickets` (per filter combination) and dashboard aggregate reads.
- **Tasks:**
  - [ ] Custom interceptor (or `CacheInterceptor` with a custom key generator including query params + user's scope)
  - [ ] Short TTL (e.g. 30-60s) — this is a "reduce DB load", not "source of truth" cache
- **Acceptance criteria:** a second identical request is measurably faster and doesn't hit Postgres (verify via query logging).
- **Concepts:** interceptors, cache-key design that accounts for filters AND the requester's scope
- **Estimate:** M

## TD-32 — Cache invalidation on writes
- **Description:** Any ticket create/update/status-change/assign busts the relevant cached list entries.
- **Tasks:**
  - [ ] Invalidation helper keyed by department/org (delete-by-pattern or a versioned-key scheme)
  - [ ] Called from the ticket service's write methods
- **Acceptance criteria:** updating a ticket's status is immediately reflected in the next list read — no stale cache window beyond what's intentional.
- **Concepts:** cache invalidation strategy — the hardest part of caching, done deliberately here
- **Estimate:** M

## TD-33 — Cache refresh-token/session lookups
- **Description:** You already store refresh tokens in Redis from Sprint 1 (TD-9) — this ticket is about reusing the same `cache-manager` abstraction for it instead of a raw Redis client, if you want one consistent access pattern.
- **Tasks:**
  - [ ] Optional refactor: move TD-9's raw Redis calls behind `cacheManager`
  - [ ] Or: document explicitly why refresh tokens use a raw client instead (TTL precision, atomic ops) — both are valid, pick one and be consistent
- **Acceptance criteria:** one clearly-documented pattern for "Redis via cache-manager" vs "Redis via raw client", not an accidental mix.
- **Concepts:** knowing when an abstraction helps vs. gets in the way
- **Estimate:** S

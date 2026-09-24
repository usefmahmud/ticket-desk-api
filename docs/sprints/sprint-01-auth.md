# Sprint 1 — Auth & Authorization

**Goal:** register, login, refresh, logout all work; endpoints can be locked down by role.
**Depends on:** Sprint 0
**Estimate:** ~1 week

## TD-6 — User & Role entities + migrations
- **Description:** `User` and `Role` entities matching §9 of the BRD (email, passwordHash, name, roleId).
- **Tasks:**
  - [ ] User entity + migration
  - [ ] Role entity + seed data (Super Admin, Org Admin, Team Lead, Agent, Customer)
- **Acceptance criteria:** seeded roles exist after running migrations + seed script.
- **Concepts:** entity relations, seeding
- **Estimate:** S

## TD-7 — Register/login endpoints
- **Description:** `POST /auth/register`, `POST /auth/login` using Passport's local strategy for login and bcrypt/argon2 for hashing.
- **Tasks:**
  - [ ] RegisterDto + LoginDto with class-validator rules
  - [ ] Password hashing on register
  - [ ] Local strategy validating credentials on login
- **Acceptance criteria:** wrong password returns 401; correct login returns a token pair (see TD-8).
- **Concepts:** Passport strategies, DTO validation, pipes
- **Estimate:** M

## TD-8 — JWT access + refresh token flow
- **Description:** Login issues a short-lived access token and a longer-lived refresh token; `POST /auth/refresh` exchanges a valid refresh token for a new pair.
- **Tasks:**
  - [ ] JWT strategy for access tokens
  - [ ] Refresh token generation (separate secret/expiry)
  - [ ] Refresh endpoint + rotation (old refresh token invalidated on use)
- **Acceptance criteria:** expired access token is rejected; refresh endpoint issues a fresh pair and the old refresh token no longer works.
- **Concepts:** JWT strategy, token rotation
- **Estimate:** L

## TD-9 — Refresh-token Redis store + logout
- **Description:** Store hashed refresh tokens in Redis keyed by user, so logout can actually invalidate them.
- **Tasks:**
  - [ ] Store refresh token hash in Redis on login/refresh
  - [ ] `POST /auth/logout` deletes the Redis entry
  - [ ] Refresh endpoint checks Redis before issuing a new pair
- **Acceptance criteria:** using a refresh token after logout returns 401.
- **Concepts:** Redis as a session store
- **Estimate:** M

## TD-10 — RolesGuard + @Roles decorator
- **Description:** A reusable guard reading a `@Roles(...)` decorator's metadata and comparing against `req.user.role`.
- **Tasks:**
  - [ ] `@Roles()` custom decorator (SetMetadata)
  - [ ] `RolesGuard` implementing `CanActivate`
  - [ ] Apply globally with per-route overrides
- **Acceptance criteria:** a Customer hitting an Org-Admin-only route gets 403.
- **Concepts:** guards, custom decorators, reflection
- **Estimate:** M

## TD-11 — Rate limiting on auth endpoints
- **Description:** Throttle `/auth/login` and `/auth/register` using `@nestjs/throttler` with a Redis storage adapter.
- **Tasks:**
  - [ ] Install + configure throttler with Redis store
  - [ ] Stricter limit on login (e.g. 5/min) than general API
- **Acceptance criteria:** 6th login attempt within a minute returns 429.
- **Concepts:** rate limiting, Redis-backed throttler storage
- **Estimate:** S

## TD-12 — Swagger auth docs
- **Description:** Document all auth endpoints and the bearer-token security scheme.
- **Tasks:**
  - [ ] `@ApiTags`, `@ApiBearerAuth` setup
  - [ ] DTOs annotated with `@ApiProperty`
- **Acceptance criteria:** `/api/docs` shows a working "Authorize" flow for testing protected routes.
- **Concepts:** OpenAPI/Swagger
- **Estimate:** S

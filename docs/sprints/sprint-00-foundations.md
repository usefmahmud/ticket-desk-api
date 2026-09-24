# Sprint 0 — Foundations & Scaffold

**Goal:** a running NestJS app connected to Postgres, Redis, and MinIO via Docker Compose, with nothing business-specific built yet.
**Depends on:** nothing
**Estimate:** ~2-3 days

## TD-1 — Initialize NestJS project structure
- **Description:** Scaffold the app with the Nest CLI, set up module folders per the BRD architecture (`auth/`, `users/`, `tickets/`, `common/`, etc. as empty modules).
- **Tasks:**
  - [ ] `nest new ticketdesk`
  - [ ] Create empty modules for each domain in §7 of the BRD
  - [ ] Set up ESLint + Prettier
- **Acceptance criteria:** `npm run start:dev` boots with no errors; empty modules import cleanly into `AppModule`.
- **Concepts:** Nest module system, dependency injection basics
- **Estimate:** S

## TD-2 — Docker Compose: Postgres, Redis, MinIO, API
- **Description:** One `docker-compose.yml` that brings up all four services with sane defaults for local dev.
- **Tasks:**
  - [ ] Postgres service with a named volume
  - [ ] Redis service
  - [ ] MinIO service + console port exposed
  - [ ] API service building from a local Dockerfile, depends_on the above
- **Acceptance criteria:** `docker compose up` gives you a working stack; API can reach all three by service name.
- **Concepts:** containerized dev environment
- **Estimate:** M

## TD-3 — Configure environment & ConfigModule
- **Description:** Centralize env vars (DB, Redis, MinIO, JWT secrets) behind `@nestjs/config` with validation.
- **Tasks:**
  - [ ] `.env.example` with every required var
  - [ ] Joi/zod schema validation on startup — fail fast on missing vars
  - [ ] Typed config service (no raw `process.env` in business code)
- **Acceptance criteria:** app refuses to boot with a clear error if a required env var is missing.
- **Concepts:** `ConfigModule`, config validation
- **Estimate:** S

## TD-4 — Database connection + base entity
- **Description:** Wire up TypeORM (or Prisma) to Postgres; create a `BaseEntity` (id, createdAt, updatedAt) other entities extend.
- **Tasks:**
  - [ ] DB connection module using values from TD-3's config
  - [ ] Base entity with UUID primary key + timestamps
  - [ ] First migration (empty) to confirm the pipeline works
- **Acceptance criteria:** `npm run migration:run` succeeds against the Dockerized Postgres.
- **Concepts:** ORM setup, migrations
- **Estimate:** M

## TD-5 — CI skeleton
- **Description:** A GitHub Actions workflow that lints and builds on every push — nothing fancy yet.
- **Tasks:**
  - [ ] `lint` job
  - [ ] `build` job
  - [ ] Placeholder `test` job (no tests yet, just wired for later sprints)
- **Acceptance criteria:** a PR shows green checks for lint/build.
- **Concepts:** CI basics
- **Estimate:** S

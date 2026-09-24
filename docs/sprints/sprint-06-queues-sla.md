# Sprint 6 — Queues & SLA

**Goal:** side effects (email) move off the request thread, and SLA breaches get caught automatically.
**Depends on:** Sprint 3
**Estimate:** ~4-5 days

## TD-34 — BullMQ module + Redis connection
- **Description:** Wire `@nestjs/bullmq`, register a `notifications` queue.
- **Tasks:**
  - [ ] BullMQ module config (same Redis, separate DB index from cache)
  - [ ] Register `notifications` queue
- **Acceptance criteria:** a test job enqueued from a throwaway route shows up in a Bull dashboard/CLI inspection.
- **Concepts:** queue module setup
- **Estimate:** M

## TD-35 — Notification queue + email processor
- **Description:** Ticket creation/assignment/comment events enqueue a job; a processor sends the email.
- **Tasks:**
  - [ ] `@Processor('notifications')` class handling job types (new_ticket, new_comment, assigned, sla_breach)
  - [ ] Local SMTP catcher (MailHog) for dev
  - [ ] Retry/backoff config on the queue
- **Acceptance criteria:** creating a ticket results in an email appearing in MailHog within a few seconds, even if you kill and restart the worker mid-job (it retries).
- **Concepts:** background workers, retry/backoff, idempotent job handlers
- **Estimate:** L

## TD-36 — SLA policy entity
- **Description:** `SLAPolicy` (priority, firstResponseMins, resolutionMins) per org, replacing Sprint 3's hardcoded defaults.
- **Tasks:**
  - [ ] Entity + migration + seed sensible defaults per priority
  - [ ] Org Admin CRUD endpoint for policies
  - [ ] Wire TD-19's `slaDueAt` computation to read from this table
- **Acceptance criteria:** changing a policy's resolution time changes `slaDueAt` on tickets created afterward (not retroactively).
- **Concepts:** replacing a stub with real configuration, without breaking existing callers
- **Estimate:** M

## TD-37 — SLA breach scanner (cron)
- **Description:** A scheduled job scans for tickets past `slaDueAt` and not yet resolved.
- **Tasks:**
  - [ ] `@Cron()` job running every 5 minutes
  - [ ] Query: `status NOT IN (resolved, closed) AND slaDueAt < now()`
  - [ ] Mark ticket as breached (flag or separate table) so it isn't re-processed every run
- **Acceptance criteria:** a ticket whose SLA has passed is flagged exactly once, not on every cron tick.
- **Concepts:** `@nestjs/schedule`, idempotent scheduled jobs
- **Estimate:** M

## TD-38 — Escalation notification on breach
- **Description:** A breach enqueues an escalation job notifying the Team Lead.
- **Tasks:**
  - [ ] New job type `sla_breach` handled by TD-35's processor
  - [ ] Look up the Team Lead for the ticket's department
- **Acceptance criteria:** breaching a test ticket's SLA (backdate `slaDueAt` for testing) results in a Team Lead notification.
- **Concepts:** connecting a cron job into the existing queue pipeline rather than building a new notification path
- **Estimate:** S

# Sprint 4 — Attachments (MinIO)

**Goal:** files upload/download through presigned URLs; your API server never touches file bytes.
**Depends on:** Sprint 3
**Estimate:** ~3-4 days

## TD-25 — MinIO client integration + bucket setup
- **Description:** Wire up the MinIO/S3 SDK, create a private bucket for attachments on startup.
- **Tasks:**
  - [ ] MinIO module wrapping the SDK client (config from TD-3's env vars)
  - [ ] Bucket creation check/bootstrap on app start
- **Acceptance criteria:** app boots, bucket exists in the MinIO console, and it's not publicly listable.
- **Concepts:** external SDK integration as a Nest provider
- **Estimate:** M

## TD-26 — Presigned upload URL endpoint
- **Description:** `POST /attachments/presign-upload` — client sends intended filename/mime/size, server validates and returns a short-lived PUT URL plus an object key.
- **Tasks:**
  - [ ] Validate mime type against an allowlist
  - [ ] Validate size against a max
  - [ ] Generate a namespaced object key (e.g. `org/{orgId}/ticket/{ticketId}/{uuid}-{filename}`)
  - [ ] Return presigned PUT URL (short TTL, e.g. 5 min)
- **Acceptance criteria:** a disallowed mime type (e.g. `.exe`) is rejected before any URL is issued.
- **Concepts:** presigned URLs, input validation as a security boundary
- **Estimate:** M

## TD-27 — Presigned download URL endpoint
- **Description:** `GET /attachments/:id/presign-download` — checks the requester can access the parent ticket, then returns a short-lived GET URL.
- **Tasks:**
  - [ ] Ownership/role check against the parent ticket before issuing the URL
  - [ ] Short TTL (e.g. 60s) so links can't be shared indefinitely
- **Acceptance criteria:** a user with no access to the ticket gets 403, not a working download URL.
- **Concepts:** authorization at the "give out a capability" layer, not just at read time
- **Estimate:** S

## TD-28 — Attachment metadata entity
- **Description:** Store only `objectKey, mime, size, uploadedById, ticketId/commentId` in Postgres — never the file itself.
- **Tasks:**
  - [ ] Attachment entity + migration
  - [ ] `POST /tickets/:id/attachments/confirm` — client calls this after a successful upload to link the object key to the ticket
- **Acceptance criteria:** an attachment record only appears after the confirm step (prevents orphaned links to files that were never actually uploaded).
- **Concepts:** separating "storage" from "metadata", two-phase confirm pattern
- **Estimate:** M

## TD-29 — File validation hardening
- **Description:** Double-check size on confirm (not just trusting the client's claimed size at presign time).
- **Tasks:**
  - [ ] After confirm, call MinIO's stat/head-object to verify actual size matches what was claimed
  - [ ] Reject/delete the object if it doesn't match
- **Acceptance criteria:** an upload that lies about its size at presign time gets caught and cleaned up.
- **Concepts:** defense in depth — never fully trust client-supplied metadata
- **Estimate:** S

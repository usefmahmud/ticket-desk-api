# Sprint 7 — Real-time (WebSockets)

**Goal:** logged-in users see ticket/comment updates live, without refreshing.
**Depends on:** Sprint 3, Sprint 6 (reuses the notification events)
**Estimate:** ~3-4 days

## TD-39 — WebSocket gateway + JWT auth over socket handshake
- **Description:** A gateway that authenticates the socket connection using the same JWT as the REST API.
- **Tasks:**
  - [ ] `@WebSocketGateway()` class
  - [ ] Verify JWT on `handleConnection`, reject unauthenticated sockets
  - [ ] Join a room per user (and optionally per department, for team-wide events)
- **Acceptance criteria:** connecting without a valid token is disconnected immediately; connecting with one joins the correct room.
- **Concepts:** gateways, auth outside the normal HTTP guard pipeline
- **Estimate:** M

## TD-40 — Emit events on ticket update/comment/assignment
- **Description:** Hook the gateway into the same places that already enqueue notification jobs (TD-35), so websocket push and email share one trigger point.
- **Tasks:**
  - [ ] Emit `ticket.updated`, `comment.created`, `ticket.assigned` to the relevant room(s)
  - [ ] Keep payloads minimal (IDs + a short summary, not the full entity) — client re-fetches details if needed
- **Acceptance criteria:** two browser tabs logged in as requester and agent both see the update within ~1s of an action, no refresh.
- **Concepts:** fan-out from one event source to two channels (email + websocket)
- **Estimate:** M

## TD-41 — In-app notification read/unread
- **Description:** Persist notifications so users see them even if they weren't connected when the event fired, and can mark them read.
- **Tasks:**
  - [ ] Notification entity (userId, type, payload, readAt)
  - [ ] `GET /notifications`, `PATCH /notifications/:id/read`
  - [ ] Write a Notification row from the same trigger point as TD-40
- **Acceptance criteria:** a notification created while the user was offline still appears in their list on next login.
- **Concepts:** combining real-time push with a durable fallback — don't rely on the socket alone
- **Estimate:** M

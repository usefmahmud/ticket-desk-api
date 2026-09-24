# Plane Ticket Content Rewrite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all 51 Plane tickets (TD-1..TD-51) with rich multi-section HTML formatting — headings, lists, bold labels, estimate callouts — replacing the current one-line/escaped content.

**Architecture:** Update each work item via `plane_workitem update` with a `description_html` payload built from the sprint source docs. Structure per ticket: Description section, Tasks as unordered list, Acceptance criteria as list, Concepts, and Estimate as a bold callout line.

**Tech Stack:** Plane MCP (`plane_workitem update`), docs/sprints/*.md as source of truth.

**Spec:** docs/sprints/sprint-00..09 (TD-1..TD-51)

## Global Constraints

- Project ID: `fb93c0e4-c59b-4f95-8103-9958a3243fa3`
- Pass RAW unescaped HTML in `description_html` (never pre-escaped `&lt;` entities)
- Keep existing titles, assignees, priorities, cycle memberships unchanged — only rewrite description content
- Ticket→workitem ID mapping (from prior session):
  - TD-1: `39a22bdf-46ec-486b-96bd-448f11c0f15b`
  - TD-2: `354b2d24-b887-4335-af71-302efaf1ac67`
  - TD-3: `ef1738e8-8310-494b-b7e2-651c9d8ee863`
  - TD-4: `56123ee6-259b-4cda-aa79-0f85f09279d1`
  - TD-5: `bbdf1b6f-fde6-48a8-913b-2f1fc7f2470f`
  - TD-6: `2d6b1ae0-4208-40a9-892d-f013031bf5f5`
  - TD-7: `c89622c6-ee04-4569-8d78-e0c4a21da094`
  - TD-8: `73dc5566-d7e0-445f-b7dc-9f4b2f36f25f`
  - TD-9: `52697610-2d68-4ed8-a267-f8b41f8a4e31`
  - TD-10: `da5cd3a3-99c7-4897-a28b-d8eeff4572f0`
  - TD-11: `02fbeb67-f1d9-4ded-a27a-f911bcef3ab4`
  - TD-12: `7a3f1517-9255-4d5b-9f08-2a73b351cc6e`
  - TD-13: `92a6439c-148a-4711-89aa-47ab4491ff2d`
  - TD-14: `8abfba35-59ef-4d83-81be-e5674932ac53`
  - TD-15: `b2ec0ef9-7678-436b-9756-322549a462a6`
  - TD-16: `9b3f9ae4-7c43-4ca0-a40d-de2801fb6f13`
  - TD-17: `a54757b3-d0fb-4693-96f8-28154d638779`
  - TD-18: `e501fac7-600b-4d38-86b1-9f2932dcb00e`
  - TD-19: `f73a4645-8031-49fb-902a-cd93c26f18a8`
  - TD-20: `016dce91-c0d5-4511-90a4-409f4fcca056`
  - TD-21: `86c13016-9190-4c36-9f6c-e23090996e1f`
  - TD-22: `60ac1f04-7ba1-4958-bd8d-8090e9025bdf`
  - TD-23: `fce0a7d3-321d-490a-890b-20335e558748`
  - TD-24: `60d2095f-dca3-4ebf-baf8-10827a07d40d`
  - TD-25: `41d1b93a-a9e9-4820-aa93-ce6e729133d9`
  - TD-26: `e954d3b1-bd31-4ade-85f5-e7467be87e5e`
  - TD-27: `8bea50fb-c6c7-4457-96b3-5d3ea156fb55`
  - TD-28: `8d191b5c-de53-4d6d-97bb-f533a01f3afd`
  - TD-29: `4cd81962-d73e-4a45-8fb2-05fb920ae532`
  - TD-30: `24c7a133-7fe9-492a-8d6b-0217cc5cb90c`
  - TD-31: `e0be26b0-7278-435f-8e93-de174e5f9d79`
  - TD-32: `00907f55-014f-40d1-a50d-00704e9d913e`
  - TD-33: `983c72d6-1b73-4487-8372-d9a2d73ddcf9`
  - TD-34: `33e0e025-c522-472a-9124-03e71eff3889`
  - TD-35: `7868a0be-82b0-44d8-94bb-f9698e617871`
  - TD-36: `051a1085-eb94-4a70-8aa5-c7ffa73b88fe`
  - TD-37: `8ba9fe51-2e58-4533-8692-2a0a3f6cf3e0`
  - TD-38: `d9ae811c-e5f7-49f8-b0a4-6b7fee42e45f`
  - TD-39: `b66c8ca6-47f9-4a90-92e6-3d48b23d0c7e`
  - TD-40: `2157cb01-3619-44aa-a169-14faf61bcfb3`
  - TD-41: `9441d516-70bc-457d-a979-ad77bee8dc49`
  - TD-42: `24abfda0-986a-47a6-9c70-b37199ced9be`
  - TD-43: `cdf12913-8c36-4e55-a63a-57b975378f5f`
  - TD-44: `8918e47c-1727-4f7f-9de7-cf0797ab823a`
  - TD-45: `a14d1334-5c22-455c-b9bb-779e4a34ee0f`
  - TD-46: `d616e1b2-1cd8-4c3c-9497-ce26bca3366e`
  - TD-47: `bc1734da-ad17-49ec-b6ed-2af59eabaf25`
  - TD-48: `18bd2ca5-2acf-43f5-b29f-e4639e88ca96`
  - TD-49: `cbb7e2f1-3eea-4173-b388-33c63360d856`
  - TD-50: `dc420f57-51d0-494f-8fe9-c9bf0463b1b0`
  - TD-51: `638473eb-0911-422b-aeef-3eef8c457b30`
- Target HTML shape (per ticket):

```html
<h4>Description</h4>
<p>…full description…</p>
<h4>Tasks</h4>
<ul>
  <li>…task…</li>
</ul>
<h4>Acceptance criteria</h4>
<ul>
  <li>…criterion…</li>
</ul>
<p><strong>Concepts:</strong> …</p>
<p><strong>Estimate:</strong> S — small effort</p>
```

---

### Task 1: Rewrite TD-1..TD-12 (Sprints 0–1)

**Files:** plane workitems for TD-1..TD-12 (IDs above)

- [ ] Update each of TD-1..TD-12 with rich `description_html` built from sprint-00/01 docs
- [ ] Spot-check one (TD-1) via `plane_workitem retrieve` that HTML is not escaped

### Task 2: Rewrite TD-13..TD-24 (Sprints 2–3)

- [ ] Update TD-13..TD-24 from sprint-02/03 docs
- [ ] Spot-check TD-18

### Task 3: Rewrite TD-25..TD-38 (Sprints 4–6)

- [ ] Update TD-25..TD-38 from sprint-04/05/06 docs
- [ ] Spot-check TD-35

### Task 4: Rewrite TD-39..TD-51 (Sprints 7–9)

- [ ] Update TD-39..TD-51 from sprint-07/08/09 docs
- [ ] Spot-check TD-46

### Task 5: Verify all 51

- [ ] List workitems with description fields; confirm none contain `&lt;p&gt;` and all have `<h4>` sections

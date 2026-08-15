# FlytLoop Controlled Migration Plan

## Current-state audit

The existing static app has useful, validated client-side logic for Markdown table parsing, meeting-note parsing, account-name normalization, source status mapping, exact-title issue canonicalization, impact scoring, deterministic triage, duplicate hints, lifecycle progression, and linked post-ship feedback. It is browser-only: it fetches source Markdown directly, stores changes in JavaScript memory, and exposes no API, persistence, audit log, authentication, or real AI provider boundary.

## Migration sequence

1. Archive the static implementation in `legacy-static/` without removing the working source.
2. Add a Next.js TypeScript App Router shell and server-side service layer.
3. Create an auditable SQL schema and a local persistent SQLite adapter (PostgreSQL/Supabase configurable later); move all corpus parsing to `lib/import/`.
4. Implement idempotent dataset import and server route handlers for dashboard, accounts, feedback, dataset status, health, AI triage/duplicates, lifecycle changes, validation, notifications, and activity.
5. Rebuild the client as a polished control center that consumes only APIs, persists mutations, polls its own APIs for practical local realtime, and labels offline/AI fallback states truthfully.
6. Add deterministic fallback AI, optional server-only OpenAI structured triage, database audit records, demo reset/reimport controls, and focused test coverage.

## Architecture decision

No Supabase or PostgreSQL credentials are present. The initial locally runnable migration uses the host `sqlite3` binary as a real persistent SQL database at `data/flytloop.db`, behind `lib/db/`. This keeps the service layer database-agnostic and provides idempotent imports and cross-session persistence. `DATABASE_URL` is reserved for the PostgreSQL/Supabase adapter; replacing the adapter is the remaining deployment step.

## Preserved business rules

- Stable source IDs (`acct-*`, `ISS-*`, `MTG-*`, `TASK-*`) and title-derived deterministic feature keys.
- Source fields are preserved instead of recomputed.
- All non-Bug issue categories map to canonical Support while retaining original category.
- Canonical issue clustering is deterministic normalized exact-title grouping; source issues are never deleted.
- AI output is a validated suggestion and must be approved before a consequential write.

<!-- BEGIN:nextjs-agent-rules -->
# FastReply - AI Agent & Developer Architecture Guide

FastReply is an open-source, self-hosted Instagram comment-to-DM automation platform built on official Meta Graph APIs.

---

## 🏗️ Core Architecture & Two-Process Model

FastReply requires **two runtime processes** and **two datastores**:

1. **Web App (`app/`)**: Next.js 16 (App Router) + React 19 + Tailwind CSS.
   - Serves the dashboard UI (`app/(dashboard)`).
   - Handles Instagram OAuth callbacks (`app/api/instagram/callback`).
   - Receives Meta webhook events (`app/api/webhook/route.ts`).
   - Authenticates via email magic links with NextAuth v5 / Resend (`lib/auth.ts`).

2. **Background Queue Worker (`worker/dm-worker.ts`)**: Always-on Node.js process.
   - Consumes BullMQ jobs from Redis.
   - Dispatches Instagram private replies via Meta Graph API (`lib/queue/dm-worker.ts`).
   - Handles rate limiting, retries, and comment sweep reconciliation (`lib/polling/comment-reconciler.ts`).

3. **Datastores**:
   - **PostgreSQL**: Stores users, workspaces, campaigns, Instagram accounts, and delivery logs (`prisma/schema.prisma`).
   - **Redis**: Powers BullMQ queues and per-account Instagram rate limiters.

---

## 🔑 Critical Conventions & Rules

- **Tokens & Encryption**: Instagram tokens and API keys are stored encrypted at rest with AES-256-GCM. The Web App and Worker **must share the exact same `ENCRYPTION_KEY`** (64 hex characters).
- **Meta Graph API**: Uses official Instagram Private Replies API. Do NOT introduce scraping or browser automation.
- **Worker Execution**: The worker must never run inside a serverless / ephemeral function. It requires an always-on host (e.g. Railway, Render, VPS).
- **Prisma Client Generation**: Always run `npm run db:generate` before typechecking or building.

---

## 📂 Key Codebase Directories

- `app/`: Next.js App Router routes, API endpoints, and dashboard pages.
- `components/`: React UI components (Sidebar, TopBar, Campaign builders, SEO shells).
- `worker/`: BullMQ worker entry point (`dm-worker.ts`).
- `lib/`:
  - `lib/db/`: Prisma client singleton.
  - `lib/queue/`: Webhook processing, BullMQ job definitions, and sender logic.
  - `lib/instagram/`: Meta Graph API client and OAuth helpers.
  - `lib/polling/`: Sweeper reconciler for missed comments.
  - `lib/auth.ts`: NextAuth authentication configuration.
- `prisma/`: Prisma schema (`schema.prisma`) and SQL migrations.

---

## 🛠️ Common Commands

```bash
npm run dev          # Start Next.js web application (port 3000)
npm run worker       # Start BullMQ background message worker
npm run db:generate  # Generate Prisma ORM client
npm run db:migrate   # Deploy database schema migrations
npm run typecheck    # Run TypeScript type validation (tsc --noEmit)
npm test             # Run Vitest test suite
```
<!-- END:nextjs-agent-rules -->


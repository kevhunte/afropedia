# Afropedia — CLAUDE.md

> This file is the canonical reference for Claude Code working in this repository.
> **Read this file before creating any implementation plan or making significant changes.**
> **Update this file whenever the repo structure, stack, or conventions change.**

---

## What Is Afropedia?

Afropedia is a free encyclopedia of the African diaspora. This repo is a monorepo
containing the web frontend and the API backend, plus shared TypeScript types.

---

## Repository Structure

```
afropedia/
├── apps/
│   ├── web/          Next.js 15 (App Router, TypeScript) — port 3000
│   └── api/          NestJS 11 (TypeScript) — port 3001
├── packages/
│   └── shared/       Shared TypeScript types (no runtime deps)
├── CLAUDE.md         ← you are here
├── package.json      Root — npm workspaces host
└── tsconfig.base.json  Shared compiler base
```

---

## Stack

| Layer        | Technology         | Version | Notes                                 |
|--------------|--------------------|---------|---------------------------------------|
| Frontend     | Next.js App Router | 15.x    | React 19, TypeScript, no Pages Router |
| Backend      | NestJS             | 11.x    | Express adapter, decorators, DI       |
| Language     | TypeScript         | 5.8+    | strict mode, noUncheckedIndexedAccess |
| Package mgmt | npm workspaces     | npm 10+ | Turborepo not used yet                |
| Node runtime | Node.js            | 20 LTS  | —                                     |
| Shared types | @afropedia/shared  | local   | Consumed by both apps                 |

---

## Running the Project

### Prerequisites
- Node 20 LTS (`nvm use 20`)
- npm 10+ (`npm install -g npm@latest`)

### Install all dependencies
```bash
npm install               # from repo root — installs all workspaces
```

### Development (both apps)
```bash
npm run dev               # starts web on :3000 and api on :3001 in parallel
```

### Development (individual)
```bash
npm run dev:web           # Next.js only
npm run dev:api           # NestJS only
```

### Build (production)
```bash
npm run build             # builds shared → api → web (in dependency order)
```

### Tests
```bash
npm run test              # runs jest in all workspaces that have a test script
```

### Type checking
```bash
npm run typecheck         # tsc --noEmit across all workspaces
```

---

## Environment Variables

Create `.env` files in each app directory (never commit them).

### `apps/api/.env`
```
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/afropedia
NODE_ENV=development
```

### `apps/web/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Convention:**
- Backend env vars: plain names (`DATABASE_URL`, `PORT`)
- Frontend env vars: `NEXT_PUBLIC_` prefix for client-exposed values
- Never commit `.env`, `.env.local`, or `.env.*.local` files

---

## API Conventions (NestJS)

- All routes are prefixed with `/api` (set in `main.ts` via `app.setGlobalPrefix('api')`)
- Health check: `GET /api/health`
- Use NestJS modules to encapsulate features (`ArticlesModule`, `UsersModule`, etc.)
- Each feature module lives in `apps/api/src/<feature>/`
- File naming: `<feature>.module.ts`, `<feature>.controller.ts`, `<feature>.service.ts`
- Use `@afropedia/shared` DTOs and interfaces for request/response types

### Feature module layout
```
apps/api/src/articles/
├── articles.module.ts
├── articles.controller.ts
├── articles.controller.spec.ts
├── articles.service.ts
└── dto/
    ├── create-article.dto.ts
    └── update-article.dto.ts
```

---

## Frontend Conventions (Next.js)

- Use App Router exclusively (no `pages/` directory)
- Prefer Server Components by default; opt into `'use client'` only when needed
- Colocate page-specific components under the route segment
- Shared UI components: `apps/web/src/components/`
- Data fetching helpers: `apps/web/src/lib/api.ts`
- Route segments: `apps/web/src/app/<segment>/page.tsx`

### Import aliases
```typescript
import { Something } from '@/components/Something';   // → src/components/
import type { Article } from '@afropedia/shared';      // → packages/shared/src/
```

---

## Shared Types (`packages/shared`)

- Contains only TypeScript interfaces, types, and enums — no runtime code
- Consumed by both `apps/api` and `apps/web`
- Build: `npm run build --workspace=packages/shared` (emits CJS to `dist/`)
- During development, both apps resolve shared types directly from source via
  `tsconfig.json` path aliases — no build step required in dev

**When to add something to shared:**
- Any DTO, entity shape, or API response type used by both apps
- Pagination, error envelope, or utility types shared across the boundary

---

## TypeScript Conventions

- `strict: true` — no exceptions
- `noUncheckedIndexedAccess: true` — array access returns `T | undefined`
- `exactOptionalPropertyTypes: true` — `{ a?: string }` means `string`, not `string | undefined`
- Prefer `interface` over `type` for object shapes
- Use `satisfies` operator for config objects
- Avoid `any`; use `unknown` and narrow

---

## Adding a New Feature (checklist)

1. Add shared types to `packages/shared/src/index.ts`
2. Create a NestJS module under `apps/api/src/<feature>/`
3. Register the module in `AppModule`
4. Add a Next.js route under `apps/web/src/app/<route>/`
5. Use `api.get<SharedType>(...)` from `src/lib/api.ts` in the frontend
6. Update this `CLAUDE.md` if the structure changes

---

## Git Conventions

- Branch names: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`
- Commits: conventional commits style (`feat:`, `fix:`, `chore:`, `docs:`)
- No direct commits to `main` — use pull requests

---

## Known Gaps (not yet added)

- Database integration (Prisma or TypeORM — decide when first entity is needed)
- Authentication (JWT / NextAuth — decide based on requirements)
- Deployment config (Docker, CI/CD pipeline)
- Tailwind CSS (add to `apps/web` when UI work begins)
- Turborepo (add when build times become a pain point)
- Root-level ESLint / Prettier config

---

*Last updated: 2026-05-11*
*Update this file whenever you add packages, change ports, add env vars, or restructure directories.*

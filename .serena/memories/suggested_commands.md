# Suggested Commands

- Install deps (from repo root): `pnpm install`.
- Root scripts (from repo root):
  - Dev all: `pnpm dev` (runs `turbo run dev`).
  - Dev “console” set: `pnpm zizibot-console` (filters `@apps/shadcn-console`, `@apps/pendekin-router`, and `./packages/*`).
  - Build all: `pnpm build`.
  - Lint all: `pnpm lint`.
  - Format: `pnpm format` (Prettier writes `**/*.{ts,tsx,md}`).
  - Clean turbo cache: `pnpm clean`.
- Per-workspace package commands (examples):
  - Next apps: `pnpm --filter @apps/shadcn-console dev`, `pnpm --filter web dev`, `pnpm --filter docs dev`.
  - Router app: `pnpm --filter @apps/pendekin-router dev` or `pnpm --filter @apps/pendekin-router dev-wrangler`.
  - Component generator (UI lib): `pnpm --filter @zizibot/ui generate:component` (wraps `turbo gen react-component`).
- Note: Husky hooks run `turbo build` on pre-commit and pre-push (commits can be slow if builds are heavy).

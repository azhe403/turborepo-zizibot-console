# Task Completion

- Before marking typical changes done:
  - `pnpm lint` (runs lint across workspaces via Turborepo).
  - `pnpm build` (runs build across workspaces via Turborepo).
  - `pnpm format` if code style/formatting could be affected.
- Tests:
  - Do not run workspace-wide `test` recursively by default: several packages currently have placeholder `test` scripts that exit with code 1 (`@zizibot/contracts`, `@zizibot/rest-client`, `@zizibot/utils`).
  - Run package-scoped tests where they exist (e.g. `pnpm --filter @zizibot/store test`).
- App smoke checks (when relevant):
  - Start the affected app with `pnpm --filter <app> dev` and confirm it boots (ports: `@apps/shadcn-console` 7130, `apps/web` 3001).
- If Turborepo cache behavior is suspect, verify env inputs include `.env*` and `API_BASE_URL` (declared in `turbo.json`).

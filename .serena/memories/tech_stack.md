# Tech Stack

- Runtime/tooling:
  - Node: engines `>=20`; Volta pins `node 20.17.0`.
  - pnpm: workspace `packageManager` is `pnpm@10.13.1`; Volta pins `pnpm 9.12.0` (watch for pnpm-version drift).
  - Turborepo: `turbo ^2.9.14`.
- Workspace dependency policy:
  - Uses pnpm workspaces (`pnpm-workspace.yaml`) with `apps/*` and `packages/*`.
  - Uses pnpm `catalog:` / `catalog:<name>` to centralize dependency versions (e.g. `next`, `typescript`, `react18`).
- Frontend:
  - Next.js 14 (catalog), React 18 (catalog `react18`), TypeScript 5.6.3 (catalog).
  - Tailwind CSS (catalog), PostCSS/autoprefixer in Next apps and UI packages.
  - UI stack includes shadcn + Radix UI primitives, `lucide-react`, `react-hook-form`, `zod`, `next-themes`.
- Backend/API:
  - `apps/pendekin-router` uses `express`, `hono`, `dotenv`, `axios`; Cloudflare Workers deploy via `wrangler`.
- Testing:
  - Jest is present via `@repo/jest-presets` + `ts-jest` (some packages still have placeholder failing `test` scripts).

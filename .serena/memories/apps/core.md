# Apps Core

- `apps/shadcn-console`: Next.js app; `dev` runs `next dev --port 7130`.
- `apps/web` (package name `web`): Next.js app; `dev` runs `next dev --turbo --port 3001`.
- `apps/docs` (package name `docs`): Next.js app; `dev` runs `next dev` (default port unless overridden).
- `apps/pendekin-router`: API/router service; local dev via `node api/index.ts` or Cloudflare Workers via `wrangler dev --port 7140 --env local`.
- Apps typically depend on workspace libs via `workspace:*` (not published versions), e.g. `@zizibot/ui`, `@zizibot/rest-client`, `@zizibot/shadcn`.

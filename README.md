# turborepo-zizibot-console

PNPM + Turborepo monorepo containing Next.js apps and shared ZiziBot packages.

## Requirements

- Node.js >= 20
- pnpm (repo sets `packageManager` in `package.json`)

## Setup

```sh
pnpm install
```

## Apps

- `apps/shadcn-console` (`@apps/shadcn-console`): Next.js console app (dev port 7130)
- `apps/web` (`web`): Next.js app (dev port 3001)
- `apps/docs` (`docs`): Next.js app (default Next port unless overridden)
- `apps/pendekin-router` (`@apps/pendekin-router`): API/router service (Node dev + Cloudflare Workers via Wrangler)

## Packages

- `@zizibot/shadcn`: shared shadcn/radix/tailwind component library
- `@zizibot/ui`: higher-level UI (exports via `package.json#exports`)
- `@zizibot/rest-client`: REST client + SignalR helpers
- `@zizibot/contracts`: DTOs/constants
- `@zizibot/utils`: small utilities
- `@zizibot/store`: Redux/store-related code
- `@repo/eslint-config`: shared ESLint configs
- `@repo/typescript-config`: shared TS configs
- `@repo/jest-presets`: shared Jest presets

## Environment

- `API_BASE_URL` is used by Turborepo `dev`/`build` tasks.
- `.env*` files are included as task inputs (see `turbo.json`).

## Common Commands

```sh
pnpm dev
pnpm zizibot-console
pnpm build
pnpm lint
pnpm format
pnpm clean
```

### Run a single workspace

```sh
pnpm --filter @apps/shadcn-console dev
pnpm --filter web dev
pnpm --filter docs dev
pnpm --filter @apps/pendekin-router dev
pnpm --filter @apps/pendekin-router dev-wrangler
```

## UI Workflows

### Add shadcn components (shared library)

```sh
pnpm --filter @zizibot/shadcn ui
```

### Generate a new component in `@zizibot/ui`

```sh
pnpm --filter @zizibot/ui generate:component
```

## Notes

- Husky hooks run `turbo build` on pre-commit and pre-push.

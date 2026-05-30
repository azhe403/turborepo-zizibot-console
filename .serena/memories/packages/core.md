# Packages Core

- `packages/eslint-config` (`@repo/eslint-config`): shared ESLint configs `library.js`, `next.js`, `react-internal.js` (used via `extends`).
- `packages/typescript-config` (`@repo/typescript-config`): shared tsconfig bases (`base.json`, `nextjs.json`, `react-library.json`).
- `packages/jest-presets` (`@repo/jest-presets`): shared Jest presets (not all packages have real tests).
- `packages/zizibot-contracts` (`@zizibot/contracts`): shared DTOs/constants; subpath exports like `@zizibot/contracts/dto/*` and `.../constant/*`.
- `packages/zizibot-rest-client` (`@zizibot/rest-client`): API client + SignalR utils; subpath exports under `internal/*`, `models/*`, `utils/*`.
- `packages/zizibot-utils` (`@zizibot/utils`): small utilities; subpath exports (`cookie`, `logger`, `local-storage`, `string`).
- `packages/zizibot-store` (`@zizibot/store`): Redux/store-related code; has a real `jest` test script.
- `packages/zizibot-shadcn` (`@zizibot/shadcn`): shadcn/radix/tailwind component library; includes `pnpm dlx shadcn@latest` helper script (`ui`).
- `packages/zizibot-ui` (`@zizibot/ui`): higher-level UI/components/features; exports are managed via `package.json#exports` and a Turborepo generator (`turbo gen react-component`).

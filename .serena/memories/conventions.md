# Conventions

- Formatting:
  - `.editorconfig`: 2-space indent, LF line endings, final newline, trim trailing whitespace.
  - Prettier is used; root script formats `**/*.{ts,tsx,md}`; config file currently empty (defaults).
- TypeScript:
  - Shared configs in `@repo/typescript-config`:
    - `base.json`: `strict: true`, `noUncheckedIndexedAccess: true`, target `ES2022`, module/resolution `NodeNext`.
    - `nextjs.json`: `module: ESNext`, `moduleResolution: Bundler`, `jsx: preserve`, `noEmit: true`.
    - `react-library.json`: `jsx: react-jsx`.
- ESLint:
  - Root `.eslintrc.js` is only for package-manager root; it ignores `apps/**` and `packages/**`.
  - Workspaces typically extend `@repo/eslint-config/*` (notably `library.js` or `next.js`).
  - `@repo/eslint-config` enables `eslint-config-turbo` and uses TS import resolver wired to the workspace’s `tsconfig.json`.
- Package boundaries/import style:
  - Shared libs expose APIs via `package.json#exports` with subpath imports (e.g. `@zizibot/ui/button`, `@zizibot/contracts/dto/...`).
  - In `@zizibot/ui`, adding a component usually requires adding an export entry; the generator `turbo gen react-component` adds `src/<kebab>.tsx` and appends a matching `exports` line in `packages/zizibot-ui/package.json`.
- Env:
  - Turbo `dev`/`build` declare `API_BASE_URL`; `.env*` files participate in caching inputs.

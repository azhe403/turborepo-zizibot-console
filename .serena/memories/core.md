# Core

- Monorepo layout: `apps/*` (runnable apps) + `packages/*` (shared libs/config).
- Workspace naming: apps may be scoped (`@apps/<name>`) or unscoped (`web`, `docs`); shared libs use `@zizibot/<name>`; shared config uses `@repo/<name>`.
- Turborepo is the task orchestrator; root scripts delegate to `turbo run <task>`.
- Turbo task env/inputs: `API_BASE_URL` is plumbed into `dev` and `build`; `.env*` files are included as task inputs.
- Module maps: apps/ports and entrypoints are in `mem:apps/core`; shared packages and what they export are in `mem:packages/core`.
- For language/tooling/version pins and workspace dependency policy (pnpm catalogs), see `mem:tech_stack`.
- For day-to-day commands (root scripts + per-app filters) see `mem:suggested_commands`.
- For lint/TS/exports conventions (and the component generator behavior) see `mem:conventions`.
- For what to run before considering work “done” (and test caveats) see `mem:task_completion`.

# Open Props UI

Design system. Components. Modern HTML & CSS.

## Usage

https://open-props-ui.netlify.app/html/guide/getting-started/

### AI assistants

- [llms.txt](https://open-props-ui.netlify.app/llms.txt) indexes the docs. Every page also has a Markdown version, e.g. [/html/components/button.md](https://open-props-ui.netlify.app/html/components/button.md).
- `opui-css` ships an agent skill in `skills/opui`, and `npx opui-css skill` copies it into a project. See the [package README](packages/opui/README.md#ai-assistants).

---

## Maintainers

### Project Structure

The project is managed as a monorepo with two main parts:

- **The Library (`packages/opui`)**: Contains the framework-agnostic core of the library. It is managed as a standalone workspace package named `opui-css`.
  - `astro/`: Public entry point and barrel exports for Astro-based projects.
  - `bin/`: The `opui-css` command, which copies the agent skill into a project.
  - `components/`: UI components organized by folder. Each folder contains the Astro, React, Svelte and Vue templates (e.g., `Button.astro`, `Button.react.tsx`, `Button.svelte`, `Button.vue`) and their types.
  - `core/`: Normalize, palette and utility classes.
  - `css/`: Component styles, theme, layer order, entry-point imports and the HTML helper scripts in `css/js/`.
  - `react/`: Public entry point and barrel exports for React-based projects.
  - `scripts/`: The build that writes the pre-bundled files to `dist/`.
  - `skills/`: The agent skill shipped with the package. `skills/opui/references` is generated.
  - `svelte/`: Public entry point and barrel exports for Svelte-based projects.
  - `vue/`: Public entry point and barrel exports for Vue-based projects.
- **The Documentation Site (`src/`)**: The Astro site.
  - `src/component-api/`: API table data for each component (`api.ts`).
  - `src/component-examples/`: One example per framework (`.astro`, `.html`, `.react.tsx`, `.svelte`, `.vue`), shown on the docs pages and used by the parity tests.
  - `src/components/`, `src/layouts/`: Docs site components and page layouts.
  - `src/docs/`: Page content for the components, guide and learn sections.
  - `src/integrations/`: Build integrations, such as the Markdown export and `llms.txt`.
  - `src/pages/`: Routes. Most of them render a page from `src/docs/` for each framework.
  - `src/stress-tests/`: Pages that combine many components, rendered at `/tests/<name>/`.
  - `src/utils/`: Shared helpers and data, such as framework routing and What's new notes.
- **Scripts (`scripts/`)**: Checks and generators. `pnpm check` runs the CSS order, component and custom property checks, and `pnpm build` runs the search index, browser support and agent skill scripts.
- **Tests (`tests/`)**: Unit and parity tests in `tests/unit`, Playwright visual, accessibility and interaction tests in `tests/e2e`, and the packed tarball in consumer projects in `tests/package`.

### Development

Use Node 26 (`.nvmrc`) and pnpm 12. Run the documentation site locally for development:

```bash
pnpm install
pnpm dev
```

Run `pnpm check` before you commit. `pnpm check:fast` skips the build.

Only the fixture pages at `/<framework>/test/<component>` need `OPUI_TEST_PAGES=1` (`OPUI_TEST_PAGES=1 pnpm dev`, or `pnpm test:e2e:serve`). The stress test pages at `/tests/` also render in `pnpm dev`.

`pnpm test:e2e` needs Playwright's Chromium, Firefox and WebKit. Install them once with `pnpm exec playwright install chromium firefox webkit`, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use another Chromium. With Chromium only, pass `--project=light --project=dark`. CI runs the `mcr.microsoft.com/playwright` image. Visual baselines are only generated in CI: add the `update-snapshots` label to the PR for new or changed screenshots. Until then, a new component's visual test fails locally.

Record intended parity drift with `pnpm test:record-drift` and known accessibility violations with `pnpm test:e2e:record-a11y`.

`pnpm test:package` (part of `pnpm check`) runs `npm pack` in `packages/opui`, checks what the tarball ships and the layer order at the top of `dist/opui.css`, then copies each fixture in `tests/package/fixtures/` (Astro, React, Svelte, Vue) to a temporary folder, unpacks the tarball into its `node_modules/opui-css` and runs the framework's type checker (`astro check`, `tsc`, `svelte-check`, `vue-tsc`) and its build. The fixtures are workspace packages, so `pnpm install` installs their dependencies and the test runs without network access. To try a fixture by hand against the workspace package, run `pnpm --dir tests/package/fixtures/react exec vite build` (or `astro check`, `svelte-check`, `vue-tsc --noEmit`).

CI builds the docs site once, with `OPUI_TEST_PAGES=1`, in the `check` job. The e2e shards download that `dist` into `dist-test` and serve it with `E2E_PREBUILT=1`, and pull request previews deploy it. On `main`, the job rebuilds without the test pages before the production deploy.

### Visual baselines in git

`tests/e2e/__screenshots__` holds about 1300 PNGs (65MB), and the `update-snapshots` workflow rewrites them all, so every refresh adds tens of megabytes to the history. Undecided, the options are:

- A: Git LFS for `tests/e2e/__screenshots__`. Clones and the history stay small, and only the checkout steps in `ci.yml` and `update-snapshots.yml` need `lfs: true`. Contributors need `git lfs install` to see or update baselines, LFS storage and bandwidth count against the GitHub quota, and the PNGs already in the history stay unless it is rewritten with `git lfs migrate`.
- B: keep the PNGs in git, but run the `dark` project on fewer fixtures. Nothing changes for contributors and no quota applies, but the history keeps growing, only more slowly, and dark mode loses visual coverage on the fixtures it drops.

### Releasing

[RELEASING.md](RELEASING.md) has the steps: `node scripts/release.mjs <version>` dates the CHANGELOG, bumps `packages/opui/package.json`, publishes, tags and pushes, and the guards in `tests/unit/released-*.json` are regenerated afterwards. The one-off checks of a major release live in `docs/releases/`.

### Adding New Components

1. Create a folder in `packages/opui/components/[ComponentName]` with `[ComponentName].astro`, `.react.tsx`, `.svelte`, `.vue` and the six `types*.ts` files (see `packages/opui/components/AGENTS.md`).
2. Export the component and its `Props` type from the four barrels, `packages/opui/{astro,react,svelte,vue}/index.ts`, sorted.
3. Add the CSS in `packages/opui/css/components/[component-name].css` and list it in `packages/opui/css/components.css`.
4. Add the docs page `src/docs/components/[component-name].astro`, one example per framework in `src/component-examples/[component-name]/`, the API data in `src/component-api/[component-name]/api.ts` and the `--_` custom properties in `src/component-api/custom-properties/[component-name].ts` (see `src/docs/components/AGENTS.md` and `src/component-api/AGENTS.md`).
5. Run `pnpm check` (it writes the new parity snapshots) and `pnpm test:e2e`, and commit the snapshots.
6. Add the CHANGELOG entry and the What's new note (see `AGENTS.md`), a theme token description for new tokens in `src/utils/theme-token-descriptions.ts`, and the component to a stress page in `src/stress-tests/`. List it in `COMPONENT_FRAMEWORKS` (`src/utils/framework.js`) if it doesn't ship for every framework.
7. Commit `public/search-index.json`, `packages/opui/skills/opui/references` and `packages/opui/tokens.json` (regenerated by `pnpm build`; CI fails when they're stale). New screenshots come from CI: add the `update-snapshots` label.

### Agent skill

`packages/opui/skills/opui/references` is generated: one file per component page from its `api.ts` data, custom properties and first example, and the guides from the docs build. `pnpm build` (and so `pnpm check`) regenerates it, and CI fails when the committed references are stale. To regenerate it from an existing build:

```bash
pnpm build-skill
```

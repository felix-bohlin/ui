# Open Props UI

A CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Designed to be used by professional teams as well as tinkering hobbyists.

## Usage

https://open-props-ui.netlify.app/html/guide/getting-started/

### AI assistants

- [llms.txt](https://open-props-ui.netlify.app/llms.txt) indexes the docs. Every page also has a Markdown version, e.g. [/html/components/button.md](https://open-props-ui.netlify.app/html/components/button.md).
- `opui-css` ships an agent skill in `skills/opui`. See the [package README](packages/opui/README.md#ai-assistants).

---

## Maintainers

### Project Structure

The project is managed as a monorepo with two main parts:

- **The Library (`packages/opui`)**: Contains the framework-agnostic core of the library. It is managed as a standalone workspace package named `opui-css`.
  - `astro/`: Public entry point and barrel exports for Astro-based projects.
  - `components/`: UI components organized by folder. Each folder contains the Astro and Vue templates (e.g., `Button.astro`, `Button.vue`) and their types.
  - `core/`: Normalize, palette and utility classes.
  - `css/`: Component styles, theme, layer order, entry-point imports and the HTML helper scripts in `css/js/`.
  - `scripts/`: The build that writes the pre-bundled files to `dist/`.
  - `skills/`: The agent skill shipped with the package. `skills/opui/references` is generated.
  - `vue/`: Public entry point and barrel exports for Vue-based projects.
- **The Documentation Site (`src/`)**: The Astro site.
  - `src/component-api/`: API table data for each component (`api.ts`).
  - `src/component-examples/`: One example per framework (`.astro`, `.html`, `.vue`), shown on the docs pages and used by the parity tests.
  - `src/components/`, `src/layouts/`: Docs site components and page layouts.
  - `src/docs/`: Page content for the components, guide and learn sections.
  - `src/integrations/`: Build integrations, such as the Markdown export and `llms.txt`.
  - `src/pages/`: Routes. Most of them render a page from `src/docs/` for each framework.
  - `src/stress-tests/`: Pages that combine many components, rendered at `/tests/<name>/`.
  - `src/utils/`: Shared helpers and data, such as framework routing and What's new notes.
- **Scripts (`scripts/`)**: Checks and generators run by `pnpm check` and the build (search index, browser support, agent skill, CSS order).
- **Tests (`tests/`)**: Unit and parity tests in `tests/unit`, Playwright visual, accessibility and interaction tests in `tests/e2e`.

### Development

Run the documentation site locally for development:

```bash
pnpm install
pnpm dev
```

### Adding New Components

1. Create a folder in `packages/opui/components/[ComponentName]` with `[ComponentName].astro`, `[ComponentName].vue` and the `types*.ts` files (see `packages/opui/components/AGENTS.md`).
2. Export the component from both barrels, `packages/opui/astro/index.ts` and `packages/opui/vue/index.ts`, in alphabetical order.
3. Add the CSS in `packages/opui/css/components/[component-name].css` and list it in `packages/opui/css/components.css`.
4. Add the docs page `src/docs/components/[component-name].astro`, one example per framework in `src/component-examples/[component-name]/` and the API data in `src/component-api/[component-name]/api.ts` (see `src/docs/components/AGENTS.md` and `src/component-api/AGENT.md`).
5. Run `pnpm check` and `pnpm test:e2e`; record the new parity snapshots with `pnpm test:update`.

### Agent skill

`packages/opui/skills/opui/references` is generated from the docs build. Regenerate it before publishing:

```bash
pnpm build
pnpm build-skill
```

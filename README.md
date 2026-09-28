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
  - `components/`: UI components organized by folder. Each folder contains the component logic, templates (e.g., `Button.astro`), and specific types.
  - `css/`: Component styles, theme, and entry-point imports.
  - `astro/`: Public entry point and barrel exports for Astro-based projects.
- **The Documentation Site (`src/`)**: The Astro site implementation, located in `src/pages`, `src/layouts`, and `src/components`.

### Development

Run the documentation site locally for development:

```bash
pnpm install
pnpm dev
```

### Adding New Components

1. Create a folder in `packages/opui/components/[ComponentName]`.
2. Add `[ComponentName].astro` to that folder.
3. Export the component from the barrel in `packages/opui/astro/index.ts`.
4. (Optional) Implement the component CSS in `packages/opui/css/components/`.

### Agent skill

`packages/opui/skills/opui/references` is generated from the docs build. Regenerate it before publishing:

```bash
pnpm build
pnpm build-skill
```

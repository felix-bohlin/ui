# Open Props UI

A CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Designed to be used by professional teams as well as tinkering hobbyists.


## Usage
https://open-props-ui.netlify.app/html/guide/getting-started/

---

## Maintainers

### Project Structure

The project is managed as a monorepo with two main parts:

- **The Library (`packages/opui`)**: Contains the framework-agnostic core of the library. It is managed as a standalone workspace package named `opui`.
  - `components/`: UI components organized by folder. Each folder contains the component logic, templates (e.g., `Button.astro`), and specific types.
  - `themes/`: CSS themes and component-specific styles.
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

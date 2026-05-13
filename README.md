# Open Props UI Docs

Documentation and library source for Open Props UI components.

## Usage

This section is for consumers of the `opui` library.

### Import Components

Components should be imported using the `@opui/astro` path alias:

```astro
---
import { Button, Chip } from "@opui/astro"
---

<Button variant="filled">Click Me</Button>
<Chip label="New" />
```

---

## Maintainers

This section is for developers maintaining or contributing to the `opui` library and its documentation.

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

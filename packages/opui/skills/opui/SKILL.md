---
name: opui
description: Build UI with Open Props UI (the opui-css package). Use when a project depends on opui-css, imports from opui-css/astro or opui-css/vue, or uses ui-* classes such as .ui-button or .ui-card, and you need correct markup, classes, props or CSS imports for its components.
---

# Open Props UI

A CSS UI library built on [Open Props](https://open-props.style/). It ships framework-agnostic CSS plus Astro and Vue components that render the same markup.

## Setup

Install with `npm install opui-css open-props`.

- With a bundler, import everything with `@import "opui-css/css/imports.css"`, or one component at a time from `opui-css/css/components/<name>.css`.
- Without a bundler, link `https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css`.
- Astro: `import { Button } from "opui-css/astro"`. Vue: `import { Button } from "opui-css/vue"`. Both still need the CSS imported once.

## Conventions

- Every class is prefixed with `ui-`: a base class (`.ui-button`) plus modifiers (`.ui-filled`, `.ui-small`, `.ui-primary`).
- Astro and Vue props mirror the modifiers without the prefix: `<Button variant="filled" size="small" color="primary">`.
- Components lean on native HTML: `<dialog>`, `popover`, invoker commands (`commandfor` / `command`), `<details>`. Prefer these over custom JavaScript.
- Styles live in cascade layers (`openprops, theme, normalize, components.prose, components.root, components.extended, utils`). Put overrides in a later layer or leave them unlayered.

## References

Pick the folder matching the project: `references/html/`, `references/astro/` or `references/vue/`.

1. Read `references/<framework>/getting-started.md` for setup and theming.
2. Find the component in `references/index.md`.
3. Read `references/<framework>/<component>.md` before writing markup. Each reference has examples, the full class or prop API, and the CSS files it needs.
4. For custom properties and exact selectors, read the component's CSS in `node_modules/opui-css/css/components/<component>.css`.

Full docs: https://open-props-ui.netlify.app/llms.txt

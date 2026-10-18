---
name: opui
description: Build UI with Open Props UI (the opui-css package). Use when a project depends on opui-css, imports from opui-css/astro, opui-css/react, opui-css/svelte or opui-css/vue, or uses ui-* classes such as .ui-button or .ui-card, and you need correct markup, classes, props or CSS imports for its components.
---

# Open Props UI

A CSS UI library built on [Open Props](https://open-props.style/). It ships framework-agnostic CSS plus Astro, React, Svelte and Vue components that render matching markup; a parity test suite keeps them in step.

## Setup

Install with `npm install opui-css open-props`.

- With a bundler, import everything with `@import "opui-css/css/imports.css"`, or import `opui-css/css/layers.css` first, then the base files (`open-props.css`, `core/palette.css`, `css/theme.css`, `core/normalize.css`) and one component at a time from `opui-css/css/components/<name>.css`. `references/<framework>/getting-started.md` has the full list.
- Without a bundler, link `https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css`.
- Astro: `import { Button } from "opui-css/astro"`. React: `import { Button } from "opui-css/react"`. Svelte: `import { Button } from "opui-css/svelte"`. Vue: `import { Button } from "opui-css/vue"`. All still need the CSS imported once.

## Conventions

- Every class is prefixed with `ui-`: a base class (`.ui-button`) plus modifiers (`.ui-filled`, `.ui-small`, `.ui-primary`).
- Astro, React, Svelte and Vue props mirror the modifiers without the prefix: `<Button variant="filled" size="small" color="primary">`.
- Common modifiers: sizes `.ui-x-small`, `.ui-small`, `.ui-large` (not every component has all three), variants `.ui-filled`, `.ui-outlined`, `.ui-tonal`, colors `.ui-primary`, `.ui-critical`, severities `.ui-info`, `.ui-success`, `.ui-warning`, `.ui-critical`. The reference lists which apply.
- Buttons: give `<button>` a `type`. When a button has an icon, wrap the label in `<span class="ui-text">` (also inside `<Button>`); a button whose only element is an `svg` is styled as icon-only.
- Components lean on native HTML: `<dialog>`, `popover`, invoker commands (`commandfor` / `command`), `<details>`. Prefer these over custom JavaScript.
- Styles live in cascade layers (`openprops, theme, normalize, components.prose, components.root, components.extended, utils`), and `theme` has the sublayers `theme.palette, theme.base, theme.brand`. Put theme tokens in `@layer theme.brand`. Put other overrides in a layer after `utils` or leave them unlayered.

## Customizing

Change the least specific thing that does the job, in this order:

1. A theme token in `@layer theme.brand`, for the whole site. Only list the tokens you change.
2. A component's `--_` input, set on the component itself (inline or in your own CSS), for one component or one instance.
3. Your own CSS in a layer after `utils`, or unlayered, for anything else.

Never override a component's outputs (`--_bg-color`, `--_text-color`, `--_border-color`): hover, active and disabled set them, so an override freezes them in every state. Change the input they derive from, such as `--_accent`. Don't add `!important` or long selectors: the layers already let your CSS win.

| To change                           | Set                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| Brand color                         | `--palette-hue` and `--palette-chroma`, or `--palette-source` with any color |
| Brand color in one part of the page | `.ui-palette` and `--palette-hue` on that element                            |
| Corners                             | `--border-radius` (buttons and fields follow it)                             |
| Fonts                               | `--font-body`, `--font-heading`, `--font-code`                               |
| Control height                      | `--density`                                                                  |
| Spacing in and between containers   | `--space-scale`                                                              |
| Shadows                             | `--shadow-raised`, `--shadow-overlay`                                        |
| Transitions                         | `--motion` (`0` turns them off), `--duration`, `--ease`                      |
| One component's color               | `--_accent` on it, or `.ui-primary`/`.ui-critical`                           |
| A severity color for a section      | `.ui-critical`, `.ui-info`, `.ui-success`, `.ui-warning`, `.ui-neutral`      |

```css
@layer theme.brand {
  :where(html) {
    --border-radius: 4px;
    --font-body: "Inter", var(--font-sans);
    --palette-hue: 265;
  }
}
```

Reference brands ship in `opui-css/themes/` (`corporate.css`, `dense.css`, `editorial.css`), to import after the library or copy as a starting point.

`references/tokens.json` lists every theme token with its CSS variable, default, dark mode value and description, in the W3C design tokens format.

## References

Pick the folder matching the project: `references/html/`, `references/astro/`, `references/react/`, `references/svelte/` or `references/vue/`.

1. Read `references/<framework>/getting-started.md` for setup, `references/<framework>/theming.md` for colors, scopes, density, spacing, corners, fonts, elevation, motion and contrast, and `references/<framework>/customizing.md` for the `theme.brand` layer and component properties.
2. Find the component in `references/index.md`.
3. Read `references/<framework>/<component>.md` before writing markup. Each reference has examples, the full class or prop API, and the CSS files it needs.
4. The Component properties table in each reference lists the component's `--_` custom properties. Set inputs (like `--_accent`) on the component itself. Don't override outputs (like `--_bg-color`): states set them, so an override freezes them. For exact selectors, read `node_modules/opui-css/css/components/<component>.css`.

Full docs: https://open-props-ui.netlify.app/llms.txt

# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

## Anatomy

### Title

Supporting text that explains the callout in more detail.

- `.ui-callout`

  Container element.

- `<svg>`

  An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical.

- `.ui-content`

  The content, with an optional heading first.

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md): takes over completely

## Variants

Tonal (default) and `.ui-outlined` variants. Put the text in `.ui-content`, with an optional heading such as an `<h3>` first. Every heading level gets the same title style.

```html
<article class="ui-callout">
  <div class="ui-content">
    <h3>Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </div>
</article>

<article class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3>Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="#">Card</a> since they look very similar? For
      one, the Callout is a more focused component with different properties.
    </p>
  </div>
</article>
```

## Severities

Severity modifiers: `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning`. `.ui-neutral` is a non-severity tone for brand-tinted attention. The default is a plain surface.

### Icons and accessibility

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```html
<article class="ui-callout ui-critical">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
  >
    <path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal critical Callout</div>
</article>

<article class="ui-callout ui-info">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal info Callout</div>
</article>

<article class="ui-callout ui-neutral">
  <div class="ui-content">This is a tonal neutral Callout</div>
</article>

<article class="ui-callout ui-success">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M22.707 12.707a1 1 0 0 0-1.414-1.414L14.5 18.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0zM16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal success Callout</div>
</article>

<article class="ui-callout ui-warning">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal warning Callout</div>
</article>

<article class="ui-callout ui-outlined ui-critical">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
  >
    <path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path>
  </svg>
  <div class="ui-content">This is an outlined critical Callout</div>
</article>

<article class="ui-callout ui-outlined ui-info">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is an outlined info Callout</div>
</article>

<article class="ui-callout ui-outlined ui-neutral">
  <div class="ui-content">This is an outlined neutral Callout</div>
</article>

<article class="ui-callout ui-outlined ui-success">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M22.707 12.707a1 1 0 0 0-1.414-1.414L14.5 18.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0zM16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16"
    ></path>
  </svg>
  <div class="ui-content">This is an outlined success Callout</div>
</article>

<article class="ui-callout ui-outlined ui-warning">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path>
  </svg>
  <div class="ui-content">This is an outlined warning Callout</div>
</article>
```

## Icon

There are no default icons in HTML: put an `<svg aria-hidden="true">` before `.ui-content`.

```html
<article class="ui-callout">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal Callout with an icon.</div>
</article>
```

## Accessibility

- The Callout is an `<article>`, so screen readers announce it as self-contained content.
- Use both color and icon to help distinguish between Callout [severities](#severities). The icon is hidden from screen readers, so say the severity in the text, for example with a title like Warning.
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md).

## API

### Callout API

| Type       | Modifiers                                                               | Default | Description                                                                                       |
| ---------- | ----------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| Severities | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | -       | The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders. |
| Variants   | default, `.ui-outlined`                                                 | default | The variant to use.                                                                               |

#### Parts

| Part          | Description                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.ui-callout` | Container element.                                                                                                                                   |
| `<svg>`       | An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical. |
| `.ui-content` | The content, with an optional heading first.                                                                                                         |

### CSS variables

| Variable                            | Default                                                                                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                 | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`.                                                                                                                                                                                                                                             |
| `--ui-border-color-on-raised`       | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), var(--ui-surface) )`                                                                              | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The light border mix in light mode and the page background in dark mode. Each raised component sets `--ui-border-color` to it on its root.                                                                                                                              |
| `--ui-border-color-raised`          | Unset                                                                                                                                                                                                           | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background.                                                                                                                                                                          |
| `--ui-border-width`                 | `1px`                                                                                                                                                                                                           | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )`                                                                                                               | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root.                                                                                                                                                                                                                                             |
| `--ui-font-size-body`               | `var(--ui-font-size-300)`                                                                                                                                                                                       | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                                                                                       |
| `--ui-font-size-small`              | `var(--ui-font-size-200)`                                                                                                                                                                                       | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                              |
| `--ui-font-weight-semibold`         | `var(--font-weight-6)`                                                                                                                                                                                          | Font weight for labels, table headers and titles.                                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-icon-size`                    | `var(--size-4)`                                                                                                                                                                                                 | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-palette-accent`               | `light-dark( oklch(from var(--ui-color-9) min(l, var(--ui-accent-max-lightness)) c h), oklch( from var(--ui-color-7) max(l, var(--ui-palette-accent-min-lightness)) c h ) )`                                    | The accent shade of the current palette: `Callout` icons and outlined borders, the `abbr` underline. Stronger with more contrast. The severity `Chip` dot reads it. Re-derived inside every severity scope, so `.ui-success` gets a green one.                                                                                                                                                                       |
| `--ui-palette-border`               | `light-dark( oklch( from var(--ui-color-5) min(l, var(--ui-palette-border-max-lightness)) c h ), oklch( from var(--ui-color-11) max(l, var(--ui-palette-border-min-lightness)) c h ) )`                         | The border shade of the current palette: tonal `Callout` borders. Stronger with more contrast. Severity `Chip` borders read it. Re-derived inside every severity scope.                                                                                                                                                                                                                                              |
| `--ui-palette-strong`               | `light-dark(var(--ui-color-16), var(--ui-color-1))`                                                                                                                                                             | The strongest shade of the current palette, the darkest in light mode and the lightest in dark mode, with the most contrast against the page: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset. Severity `Chip` text reads it. Re-derived inside every severity scope.                                                                                                                   |
| `--ui-palette-tint-subtle`          | `light-dark( oklch(from var(--ui-color-3) l c h / 60%), oklch(from var(--ui-color-6) l c h / 5%) )`                                                                                                             | A faint fill of the current palette: tonal severity `Callout`s. Tonal severity `Chip`s read it. Re-derived inside every severity scope.                                                                                                                                                                                                                                                                              |
| `--ui-primary-text`                 | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )`                | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                       | `var(--size-2)`                                                                                                                                                                                                 | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                     |
| `--ui-shadow-surface`               | `none`                                                                                                                                                                                                          | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                                                                                                                                                                                                       |
| `--ui-space-2`                      | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                                                   | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-space-3`                      | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                                                   | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-surface`                      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                                                               | Page and card background.                                                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-surface-tonal`                | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                                                               | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                                                        |
| `--ui-text-strong`                  | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                                                               | Strongest text color, for headings, labels and values. Body text is `--ui-text`.                                                                                                                                                                                                                                                                                                                                     |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property                      | Kind   | Description                                                                                                                                                |
| ----------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`                 | Output | The current tint, drawn over `--_surface-bg-color`. Set by the severity classes and `.ui-outlined`.                                                        |
| `--_border-color`             | Output | The current border color. `--ui-border-color-raised` when a theme sets it, otherwise `--ui-surface-tonal`. Set by the severity classes and `.ui-outlined`. |
| `--_content-gap`              | Input  | Space between the children of `.ui-content`.                                                                                                               |
| `--_font-size`                | Input  | Font size of `.ui-content`.                                                                                                                                |
| `--_gap`                      | Input  | Gap between a direct child `svg` and `.ui-content`.                                                                                                        |
| `--_icon-size`                | Input  | Width of the icon column when there's a direct child `svg`.                                                                                                |
| `--_icon-text-color`          | Output | The current color of a direct child `svg`. Set by the severity classes and `.ui-outlined`.                                                                 |
| `--_link-hover-text-color`    | Input  | Link color on hover and focus. Defaults to `--ui-primary-text`, not used in `.ui-outlined`.                                                                |
| `--_outlined-bg-color`        | Input  | Background of `.ui-outlined`. Defaults to `--ui-surface`.                                                                                                  |
| `--_outlined-border-color`    | Input  | Border color of `.ui-outlined`. Defaults to `--ui-border-color`, set by the severity classes.                                                              |
| `--_outlined-icon-text-color` | Input  | Icon color of `.ui-outlined`. Set by the severity classes.                                                                                                 |
| `--_outlined-text-color`      | Input  | Text color of `.ui-outlined`. Set by the severity classes.                                                                                                 |
| `--_padding`                  | Input  | The padding.                                                                                                                                               |
| `--_radius`                   | Input  | The corner radius. Defaults to `--ui-radius`.                                                                                                              |
| `--_shadow`                   | Input  | The shadow. Defaults to `--ui-shadow-surface`.                                                                                                             |
| `--_surface-bg-color`         | Input  | The opaque background under the tint. Defaults to `--ui-surface`.                                                                                          |
| `--_text-color`               | Output | The current text color. Set by the severity classes and `.ui-outlined`.                                                                                    |
| `--_title-font-size`          | Input  | Font size of headings in `.ui-content`.                                                                                                                    |

## Under the hood

Read the post: [Severity colors from one source color](https://open-props-ui.netlify.app/learn/callout-relative-colors)

1. Surface

   - `<article>`: self-contained content in the flow, not an interruption
   - An opaque surface first, the tint comes next
   - Colors live in custom properties so variants only swap values

2. Tint layer

   - The tint is a `::before` layer, so it can be translucent over the opaque surface
   - `z-index: -1` puts it behind the text, `isolation: isolate` keeps it from falling behind the callout
   - Inner radius = outer radius − border width

3. Icon

   - `:has(> svg)` switches to a two-column grid only when there's an icon
   - No icon prop or modifier class: put an `<svg>` first and the layout follows

4. Severity

   - One source color per severity, every shade derived with `oklch(from …)`
   - `light-dark()` picks the shade for each color scheme, no media query
   - A 60% tint in light, 5% in dark: the opaque surface underneath does the rest
   - The real palette derives 16 shades from `--ui-palette-source`, and the theme picks them for roles like `--ui-palette-tint-subtle`. Here eight are inlined
   - The icon draws with `currentColor`, so `color` tints fill and stroke icons alike

Step 1 of 4: Surface

```html
<article class="callout">
  <div class="content">
    <h3>Heads up</h3>
    <p>…</p>
  </div>
</article>
```

```css
.callout {
  --border: var(--ui-surface-tonal);
  background-color: var(--ui-surface);
  border: 1px solid var(--border);
  border-radius: var(--ui-radius);
  color: var(--ui-text-strong);
  padding: 0.75rem;
}

.callout > .content {
  display: grid;
  font-size: var(--ui-font-size-small);
  gap: 0.5rem;
}
```

Step 2 of 4: Tint layer

- [`::before and ::after` ](https://webstatus.dev/features/before-after)(Widely available): Chrome 1+, Edge 12+, Firefox 1.5+, Safari 4+
- [`isolation` ](https://webstatus.dev/features/isolation)(Widely available): Chrome 41+, Edge 79+, Firefox 36+, Safari 8+

```css
.callout {
  --bg: var(--ui-surface-tonal);
  isolation: isolate;
  position: relative;
}

.callout::before {
  background-color: var(--bg);
  border-radius: calc(var(--ui-radius) - 1px);
  content: "";
  inset: 0;
  pointer-events: none;
  position: absolute;
  z-index: -1;
}
```

Step 3 of 4: Icon

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.callout:has(> svg) {
  align-content: start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: var(--ui-icon-size) 1fr;
}

.callout > svg {
  margin-block-start: 0.15rem;
}
```

Step 4 of 4: Severity

- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.info {
  --tone: oklch(58% 0.21 var(--hue-blue));
}

.warning {
  --tone: oklch(58% 0.21 var(--hue-orange));
}

.callout:is(.info, .warning) {
  --bg: light-dark(
    oklch(from var(--tone) 93% 0.1 calc(h + 2) / 60%),
    oklch(from var(--tone) 71% 0.19 calc(h + 5) / 5%)
  );
  --border: light-dark(
    oklch(from var(--tone) 80% 0.16 calc(h + 4)),
    oklch(from var(--tone) 42% 0.17 calc(h + 10))
  );
  --icon: light-dark(
    oklch(from var(--tone) 53% 0.2 calc(h + 8)),
    oklch(from var(--tone) 66% 0.2 calc(h + 6))
  );
  color: light-dark(
    oklch(from var(--tone) 10% 0.05 calc(h + 15)),
    oklch(from var(--tone) 98% 0.03 h)
  );
}

.callout > svg {
  color: var(--icon, currentColor);
}
```

## Browser support

- Chromium: Full support Supported since v143.
- Firefox: Full support Supported since v146.
- Safari: Full support Supported since v26.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Callout.md).

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/callout.css`

`theme tokens (snippet)`

## Changelog

### What's new

- Breaking: `--_border-radius` is `--_radius`, and `--_icon-color`, `--_outlined-icon-color` and `--_link-hover-color` are `--_icon-text-color`, `--_outlined-icon-text-color` and `--_link-hover-text-color` ([Under the hood](#under-the-hood)).
- Severity fills, borders, icons and text read the [`--ui-palette-*`](#api) roles, so a theme restyles every severity at once.
- Tonal [severity callouts](#severities) have a visible fill in light mode.
- Breaking: `--_color` is `--_text-color`, `--_outlined-color` is `--_outlined-text-color` and `--_surface-bg` is `--_surface-bg-color` ([Under the hood](#under-the-hood)).
- [Callouts](#variants) read [`--ui-shadow-surface`](#api), and callouts without a severity `--ui-border-color-raised`, when a theme sets them.

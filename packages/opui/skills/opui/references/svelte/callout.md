# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

## Anatomy

### Title

Supporting text that explains the callout in more detail.

- `<Callout>`

  Container element.

- `<CalloutIcon>`

  An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for info, success, warning and critical.

- `<CalloutContent>`

  The content, with an optional heading first.

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/svelte/components/dialog.md): takes over completely

## Variants

Tonal (default) and outlined variants are available via the `variant` prop. Put the text in `CalloutContent`, with an optional heading such as an `<h3>` first. Every heading level gets the same title style.

```svelte
<script lang="ts">
  import { Callout, CalloutContent } from "opui-css/svelte"
</script>

<Callout>
  <CalloutContent>
    <h3>Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </CalloutContent>
</Callout>
<Callout variant="outlined">
  <CalloutContent>
    <h3>Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="#">Card</a> since they look very similar? For one,
      the Callout is a more focused component with different properties.
    </p>
  </CalloutContent>
</Callout>
```

## Severities

The `severity` prop accepts `info`, `success`, `warning`, and `critical`, plus a non-severity `neutral` tone for brand-tinted attention. The default is a plain surface.

**Icons and accessibility**

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```svelte
<script lang="ts">
  import { Callout, CalloutContent, CalloutIcon } from "opui-css/svelte"
</script>

<Callout severity="neutral">
  <CalloutContent>This is a tonal neutral Callout</CalloutContent>
</Callout>
<Callout severity="info">
  <CalloutIcon />
  <CalloutContent>This is a tonal info Callout</CalloutContent>
</Callout>
<Callout severity="success">
  <CalloutIcon />
  <CalloutContent>This is a tonal success Callout</CalloutContent>
</Callout>
<Callout severity="warning">
  <CalloutIcon />
  <CalloutContent>This is a tonal warning Callout</CalloutContent>
</Callout>
<Callout severity="critical">
  <CalloutIcon />
  <CalloutContent>This is a tonal critical Callout</CalloutContent>
</Callout>
<Callout severity="neutral" variant="outlined">
  <CalloutContent>This is an outlined neutral Callout</CalloutContent>
</Callout>
<Callout severity="info" variant="outlined">
  <CalloutIcon />
  <CalloutContent>This is an outlined info Callout</CalloutContent>
</Callout>
<Callout severity="success" variant="outlined">
  <CalloutIcon />
  <CalloutContent>This is an outlined success Callout</CalloutContent>
</Callout>
<Callout severity="warning" variant="outlined">
  <CalloutIcon />
  <CalloutContent>This is an outlined warning Callout</CalloutContent>
</Callout>
<Callout severity="critical" variant="outlined">
  <CalloutIcon />
  <CalloutContent>This is an outlined critical Callout</CalloutContent>
</Callout>
```

## Icon

`CalloutIcon` renders the default icon for `info`, `success`, `warning` and `critical`. For a custom icon, put your own `<svg aria-hidden="true">` in the `Callout` instead, before `CalloutContent`.

```svelte
<script lang="ts">
  import { Callout, CalloutContent } from "opui-css/svelte"
</script>

<Callout>
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
  <CalloutContent>This is a tonal Callout with an icon.</CalloutContent>
</Callout>
```

## Accessibility

- The Callout is an `<article>`, so screen readers announce it as self-contained content.
- Use both color and icon to help distinguish between Callout [severities](#severities). The icon is hidden from screen readers, so say the severity in the text, for example with a title like Warning.
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/svelte/components/dialog.md).

## API

### Callout API

| Prop       | Type                                                              | Default   | Description                                                                                       |
| ---------- | ----------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| `children` | `Snippet`                                                         | -         | The callout parts, and any other content.                                                         |
| `severity` | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -         | The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders. |
| `variant`  | `"outlined"` , `"tonal"`                                          | `"tonal"` | The variant to use.                                                                               |

#### CSS variables

| Variable                    | Default                                                                                             | Description                                                                                                                                                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-border-color`         | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                   | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                        |
| `--ui-border-radius`        | `var(--size-2)`                                                                                     | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                   |
| `--ui-border-width`         | `1px`                                                                                               | Default border width for components that draw a border.                                                                                                                                                                                                            |
| `--ui-font-size-body`       | `var(--ui-font-size-300)`                                                                           | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`.                                                                                                                                                                     |
| `--ui-font-size-small`      | `var(--ui-font-size-200)`                                                                           | Font size of helper text, `Callout`, `Table`, `Tooltip`, `Toast`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                   |
| `--ui-font-weight-semibold` | `var(--font-weight-6)`                                                                              | Font weight for labels, table headers and titles.                                                                                                                                                                                                                  |
| `--ui-icon-size`            | `var(--size-4)`                                                                                     | Default icon size inside components.                                                                                                                                                                                                                               |
| `--ui-palette-accent`       | `light-dark(var(--ui-color-9), var(--ui-color-7))`                                                  | The accent shade of the current palette: `Callout` icons and outlined borders, the `abbr` underline. Re-derived inside every severity scope, so `.ui-success` gets a green one.                                                                                    |
| `--ui-palette-border`       | `light-dark(var(--ui-color-5), var(--ui-color-11))`                                                 | The border shade of the current palette: tonal `Callout` borders. Re-derived inside every severity scope.                                                                                                                                                          |
| `--ui-palette-ink`          | `light-dark(var(--ui-color-16), var(--ui-color-1))`                                                 | The darkest shade of the current palette in light mode and the lightest in dark mode: `Callout` text, the default `Button` fill when `--ui-button-accent` is unset, the text of a warning `Badge`. Re-derived inside every severity scope.                         |
| `--ui-palette-tint-subtle`  | `light-dark( oklch(from var(--ui-color-3) l c h / 60%), oklch(from var(--ui-color-6) l c h / 5%) )` | A faint fill of the current palette: tonal severity `Callout`s. Re-derived inside every severity scope.                                                                                                                                                            |
| `--ui-primary`              | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                  | Brand color for primary actions and accents.                                                                                                                                                                                                                       |
| `--ui-primary-text`         | Unset                                                                                               | Primary as a text color: links, and `Button` with `.ui-primary` and no variant or `.ui-outlined`. When unset, each derives a readable shade from `--ui-primary`. Set it when the primary is too light or too dark for text.                                        |
| `--ui-shadow-surface`       | `none`                                                                                              | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane.                                                                                                                     |
| `--ui-space-2`              | `calc(var(--size-2) * var(--ui-space-scale))`                                                       | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                    |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                                       | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                    |
| `--ui-surface-border-color` | Unset                                                                                               | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards use the page background color, so they stay visible on tonal surfaces, accordions have a transparent border, and callouts their tonal background. |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                   | Page and card background.                                                                                                                                                                                                                                          |
| `--ui-surface-tonal`        | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                   | Background of tonal variants.                                                                                                                                                                                                                                      |
| `--ui-text-primary`         | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                   | Emphasized text color for headings, labels and values.                                                                                                                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md).

For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/svelte/guide/customizing.md#component-properties) has examples.

| Property                   | Kind   | Description                                                                                                                                              |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`              | Output | The current tint, drawn over `--_surface-bg-color`. Set by the color classes and `.ui-outlined`.                                                         |
| `--_border-color`          | Output | The current border color. `--ui-surface-border-color` when a theme sets it, otherwise `--ui-surface-tonal`. Set by the color classes and `.ui-outlined`. |
| `--_border-radius`         | Input  | The corner radius. Defaults to `--ui-border-radius`.                                                                                                     |
| `--_content-gap`           | Input  | Space between the children of `.ui-content`.                                                                                                             |
| `--_font-size`             | Input  | Font size of `.ui-content`.                                                                                                                              |
| `--_gap`                   | Input  | Gap between a direct child `svg` and `.ui-content`.                                                                                                      |
| `--_icon-color`            | Output | The current color of a direct child `svg`. Set by the color classes and `.ui-outlined`.                                                                  |
| `--_icon-size`             | Input  | Width of the icon column when there's a direct child `svg`.                                                                                              |
| `--_link-hover-color`      | Input  | Link color on hover and focus. Defaults to `--ui-primary-text`, or a readable shade of `--ui-primary`, not used in `.ui-outlined`.                       |
| `--_outlined-bg-color`     | Input  | Background of `.ui-outlined`. Defaults to `--ui-surface-default`.                                                                                        |
| `--_outlined-border-color` | Input  | Border color of `.ui-outlined`. Set by the color classes.                                                                                                |
| `--_outlined-icon-color`   | Input  | Icon color of `.ui-outlined`. Set by the color classes.                                                                                                  |
| `--_outlined-text-color`   | Input  | Text color of `.ui-outlined`. Set by the color classes.                                                                                                  |
| `--_padding`               | Input  | The padding.                                                                                                                                             |
| `--_shadow`                | Input  | The shadow. Defaults to `--ui-shadow-surface`.                                                                                                           |
| `--_surface-bg-color`      | Input  | The opaque background under the tint. Defaults to `--ui-surface-default`.                                                                                |
| `--_text-color`            | Output | The current text color. Set by the color classes and `.ui-outlined`.                                                                                     |
| `--_title-font-size`       | Input  | Font size of headings in `.ui-content`.                                                                                                                  |

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
   - A 20% tint in light, 5% in dark: the opaque surface underneath does the rest
   - The real palette derives 16 shades from `--ui-palette-source`, here seven are inlined
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
  background-color: var(--ui-surface-default);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  color: var(--ui-text-primary);
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
  border-radius: calc(var(--radius-2) - 1px);
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
    oklch(from var(--tone) 97% 0.06 calc(h + 1) / 20%),
    oklch(from var(--tone) 71% 0.19 calc(h + 5) / 5%)
  );
  --border: light-dark(
    oklch(from var(--tone) 80% 0.16 calc(h + 4)),
    oklch(from var(--tone) 42% 0.17 calc(h + 10))
  );
  --icon: oklch(from var(--tone) 53% 0.2 calc(h + 8));
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
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v26.2.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/svelte/guide/browser-support/?components=Callout.md).

## Installation

Import the components from `opui-css/svelte`:

- `opui-css/css/components/callout.css`

`theme tokens (snippet)`

## Changelog

### What's new

- Severity fills, borders, icons and text read the [`--ui-palette-*`](#api) roles, so a theme restyles every severity at once.
- Tonal [severity callouts](#severity) have a visible fill in light mode.
- [`CalloutIcon`](#icon) has a `success` icon, like `info`, `warning` and `critical`.
- Breaking: `--_color` is `--_text-color`, `--_outlined-color` is `--_outlined-text-color` and `--_surface-bg` is `--_surface-bg-color` ([Under the hood](#under-the-hood)).
- [Callouts](#variants) read [`--ui-shadow-surface`](#api), and callouts without a severity `--ui-surface-border-color`, when a theme sets them.

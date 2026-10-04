# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

## Anatomy

### Title

Supporting text that explains the callout in more detail.

- `.ui-callout`

  Container element.

- `<svg>`

  An optional icon. `info`, `warning` and `critical` have a default icon.

- `.ui-content`

  The content.

- `<h3>`

  An optional title inside the content.

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md): takes over completely
- [Toast](https://open-props-ui.netlify.app/html/components/toast.md): informative but non-interruptive

## Variants

Tonal (default) and `.ui-outlined` variants.

```html
<article class="ui-callout">
  <div class="ui-content">
    <h3 class="ui-title">Note</h3>
    <p>
      This is a tonal Callout. Notice the lack of icons - it's not really needed
      here.
    </p>
  </div>
</article>


<article class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3 class="ui-title">Another Callout</h3>
    <p>
      This is an outlined Callout. Why not use a
      <a class="ui-link" href="/components/card">Card</a> since they look very
      similar? For one, the Callout is a more focused component with different
      properties.
    </p>
  </div>
</article>
```

## Icon

Icon must be placed before the content.

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

## Severities

Severity modifiers - `.ui-info`, `.ui-success`, `.ui-warning`, `.ui-critical` - plus the non-severity `.ui-neutral` tone for brand-tinted attention. The default is a plain surface.

**Icons and accessibility**

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```html
<article class="ui-callout ui-neutral">
  <div class="ui-content">This is a tonal neutral Callout</div>
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


<article class="ui-callout ui-outlined ui-neutral">
  <div class="ui-content">This is an outlined neutral Callout</div>
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
```

## Accessibility

- The Callout is an `<article>`, so screen readers announce it as self-contained content. Don't add `role="note"`, it isn't allowed on `<article>`.
- Use both color and icon to help distinguish between Callout [severities](#severities).
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md) or [Toast](https://open-props-ui.netlify.app/html/components/toast.md).

## API

### Callout API

| Type       | Modifiers                                                               | Default | Description                                        |
| ---------- | ----------------------------------------------------------------------- | ------- | -------------------------------------------------- |
| Severities | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | -       | The severity. Sets the color and the default icon. |
| Variants   | default, `.ui-outlined`                                                 | default | The variant to use.                                |

#### Parts

| Part          | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `.ui-callout` | Container element.                                                      |
| `<svg>`       | An optional icon. `info`, `warning` and `critical` have a default icon. |
| `.ui-content` | The content.                                                            |
| `<h3>`        | An optional title inside the content.                                   |

#### CSS variables

| Variable                 | Default                                      | Description                                                                                           |
| ------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                           |
| `--border-radius`        | `var(--size-2)`                              | Default corner radius for cards, callouts, tables and accordions.                                     |
| `--border-width`         | `1px`                                        | Default border width for components that draw a border.                                               |
| `--font-size-05`         | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--font-weight-semibold` | `var(--font-weight-6)`                       | Font weight for labels, table headers and titles.                                                     |
| `--icon-size`            | `var(--size-4)`                              | Default icon size inside components.                                                                  |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                          |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`  | Page and card background.                                                                             |
| `--surface-tonal`        | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                         |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

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
   - The real palette derives 16 shades from `--palette-source`, here four are inlined

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
  --border: var(--surface-tonal);
  background-color: var(--surface-default);
  border: 1px solid var(--border);
  border-radius: var(--radius-2);
  color: var(--text-primary);
  padding: 0.75rem;
}


.callout > .content {
  display: grid;
  font-size: var(--font-size-05);
  gap: 0.5rem;
}
```

Step 2 of 4: Tint layer

- [`::before and ::after`](https://webstatus.dev/features/before-after) (Widely available): Chrome 1+, Edge 12+, Firefox 1.5+, Safari 4+
- [`isolation`](https://webstatus.dev/features/isolation) (Widely available): Chrome 41+, Edge 79+, Firefox 36+, Safari 8+

```css
.callout {
  --bg: var(--surface-tonal);
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

- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.callout:has(> svg) {
  align-content: start;
  display: grid;
  gap: 0.75rem;
  grid-template-columns: var(--icon-size) 1fr;
}


.callout > svg {
  margin-block-start: 0.15rem;
}
```

Step 4 of 4: Severity

- [`light-dark()`](https://webstatus.dev/features/light-dark) (Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors](https://webstatus.dev/features/relative-color) (Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.info {
  --tone: oklch(58% 0.21 var(--hue-blue));
}


.warning {
  --tone: oklch(58% 0.21 var(--hue-orange));
}


.callout:is(.info, .warning) {
  --bg: light-dark(
    oklch(from var(--tone) 97% 0.06 h / 20%),
    oklch(from var(--tone) 71% 0.19 h / 5%)
  );
  --border: light-dark(
    oklch(from var(--tone) 80% 0.16 h),
    oklch(from var(--tone) 42% 0.17 h)
  );
  --icon: oklch(from var(--tone) 53% 0.2 h);
  color: light-dark(
    oklch(from var(--tone) 10% 0.05 h),
    oklch(from var(--tone) 98% 0.03 h)
  );
}


.callout > svg {
  stroke: var(--icon, currentColor);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Callout.md).

## Installation

- `opui-css/css/components/callout.css`
`theme tokens (snippet)`


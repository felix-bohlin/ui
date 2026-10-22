# Theming

The knobs and roles behind colors, density, spacing, corners, fonts, elevation, motion and contrast, and the classes that scope them.

## Palette

One hue and chroma in `theme.css` become a source color, `--ui-palette-source`, and `core/palette.css` derives the `--ui-color-1` to `--ui-color-16` steps from it.

```css
:where(html) {
  --ui-palette-chroma: 0.5;
  --ui-palette-hue: var(--hue-green);
  --ui-palette-hue-rotate-by: 0;
}

:where(html.ui-dark) {
  --ui-palette-hue: var(--hue-blue);
}
```

- `--ui-palette-chroma` scales the saturation, from `0` (gray) to `1`.
- `--ui-palette-hue` is a hue angle, and Open Props' `--hue-*` tokens work.
- `--ui-palette-hue-rotate-by` turns the hue by this many degrees per step, so `1` spreads 15° across the palette. The severity scopes use `1` for livelier tints.

Or set `--ui-palette-source` to any color: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. The palette is computed on `:root`, `.ui-palette` and the severity classes, so the knobs do nothing anywhere else. Each severity class is one source:

```css
:where(.ui-warning) {
  --ui-palette-source: oklch(0.58 0.21 var(--hue-orange));
}
```

## Scopes

A scope class re-themes an element and everything inside it.

- `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning` swap the palette steps, see [Palette scopes](https://open-props-ui.netlify.app/vue/guide/concepts.md#palette-scopes).
- `.ui-light` and `.ui-dark` force a color scheme.
- `.ui-palette` re-derives the palette and every color token from the knobs set on that element.

On an element, `.ui-dark` and `.ui-light` only pick the other side of `light-dark()`. The hue and the shadows still come from the page, so a `.ui-dark` box on a light page stays green. Add `.ui-palette` with the dark hue to match dark mode:

```html
<aside class="ui-dark ui-palette" style="--ui-palette-hue: var(--hue-blue)">
  Always dark
</aside>

<section class="ui-palette" style="--ui-palette-hue: 30">
  <button class="ui-button ui-primary ui-filled" type="button">
    Orange brand
  </button>
</section>
```

## Density

`--ui-density` scales the `--ui-control-size*` roles, so fields, buttons and list items grow or shrink together, and their padding shrinks down to the height of the text. Set it on `html`, where the sizes resolve.

```css
:where(html) {
  --ui-density: 0.875;
}
```

## Spacing

`--ui-space-1` to `--ui-space-8` pad and space containers, forms and rich text. Each is the Open Props size of the same number times `--ui-space-scale`, set on `html`. Controls follow `--ui-density` instead, so a roomy form can keep compact fields.

```css
:where(html) {
  --ui-space-scale: 1.25;
}

/* Or tie spacing to density */
:where(html) {
  --ui-density: 0.875;
  --ui-space-scale: var(--ui-density);
}
```

## Corners

`--ui-radius` rounds every component, and buttons and fields follow it until you set `--ui-button-radius` or `--ui-field-radius`. Small parts like `kbd`, tooltips and checkboxes never get rounder than it, so `0` squares everything.

```css
:where(html) {
  --ui-radius: 0;
}
```

## Fonts

`--ui-font-body` sets the text and controls, `--ui-font-code` code, `kbd` and `samp`, and `--ui-font-heading` the headings, which follow the body font until you set it.

```css
:where(html) {
  --ui-font-body: "Inter", var(--font-sans);
  --ui-font-code: "JetBrains Mono", var(--font-mono);
  --ui-font-heading: "Fraunces", var(--font-serif);
}
```

The type scale, `--ui-font-size-100` to `--ui-font-size-900` (12px to 56px), is a primitive. Components read the roles on top of it, like `--ui-font-size-caption`, `--ui-font-size-control` and `--ui-font-size-h1`. Pin a role, move a step and every role on it follows, or replace the scale:

```css
:where(html) {
  /* Pin one role */
  --ui-font-size-caption: 0.8125rem;

  /* Or a modular scale: 1rem base, minor third */
  --ui-font-size-100: calc(1rem * pow(1.2, -2));
  --ui-font-size-200: calc(1rem * pow(1.2, -1));
  --ui-font-size-300: 1rem;
  --ui-font-size-400: calc(1rem * pow(1.2, 1));
  --ui-font-size-500: calc(1rem * pow(1.2, 2));
  --ui-font-size-600: calc(1rem * pow(1.2, 3));
  --ui-font-size-700: calc(1rem * pow(1.2, 4));
  --ui-font-size-800: calc(1rem * pow(1.2, 5));
  --ui-font-size-900: calc(1rem * pow(1.2, 6));
}
```

## Elevation

- `--ui-shadow-control`: buttons with a variant and fields. `none` until a theme sets it, and the optional `--ui-shadow-field` splits off the fields.
- `--ui-shadow-elevated`: elevated cards and accordions. Set `--ui-shadow-elevated-light` and `--ui-shadow-elevated-dark`, it picks one per scheme, also in scoped parts of the page.
- `--ui-shadow-overlay`: menus, `select` pickers and drawers.
- `--ui-shadow-scroll`: the edges of scrolled dialogs, drawers and sticky table headers.
- `--ui-shadow-surface`: tonal and outlined cards and accordions, and callouts. `none` by default.
- `--ui-shadow-tab`: the selected tab.

```css
:where(html) {
  --ui-shadow-overlay: var(--shadow-4);
  --ui-shadow-elevated-dark: none;
  --ui-shadow-elevated-light: none;
}
```

## Motion

`--ui-motion` multiplies every duration. It is `1`, or `0` under `prefers-reduced-motion: reduce`.

### Global classes

On `html`, these override the OS preference:

- `.ui-motion-off`: sets `--ui-motion: 0`.
- `.ui-motion-on`: sets `--ui-motion: 1`.
- `.ui-motion-debug`: sets `--ui-motion: 10` (slows down transitions 10x).

```html
<html lang="en" class="ui-motion-debug">
```

### Local overrides

Each component reads it through its own `--_motion`, so you can turn one off:

```html
<button class="ui-button" style="--_motion: 0" type="button">
  Instant interaction
</button>
```

To follow it in your own CSS:

```css
transition: transform calc(var(--ui-duration) * var(--ui-motion)) var(--ui-ease);
```

## Contrast

`--ui-contrast` is `normal`, or `more` under `prefers-contrast: more`. A style query on it raises muted text, borders, the primary and intent colors and the focus ring, and components with their own tints have queries of their own.

The query sets its values on `body`, so they beat a theme's `html` values, and optional tokens that carry contrast, like `--ui-selected`, are reset there. A theme that wants its own high-contrast value sets it again in its own `@container style(--ui-contrast: more)` block, as the example themes do for `--ui-button-accent`.

### Classes

- `.ui-contrast-more`: sets `--ui-contrast: more`, on `html` or any element.
- `.ui-contrast-normal`: sets `--ui-contrast: normal`, on `html` to ignore the OS preference. It can't lower the contrast inside a `.ui-contrast-more` ancestor, where the tokens are already resolved.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

Style queries match the parent, so the values land on `body`, on the children of `.ui-contrast-more` and on the surfaces with their own border colors. To tune them, query with the same selectors:

```css
@container style(--ui-contrast: more) {
  :where(
    body,
    .ui-contrast-more > *,
    .ui-palette,
    .ui-accordion:is(.ui-elevated, .ui-tonal),
    .ui-callout:not(
      .ui-critical,
      .ui-info,
      .ui-neutral,
      .ui-outlined,
      .ui-success,
      .ui-warning
    ),
    .ui-card:is(.ui-elevated, .ui-tonal),
    .ui-list:not(.ui-tonal, .ui-transparent),
    .ui-table th
  ) {
    --ui-border-color: var(--ui-text-muted);
    --ui-field-border-color: var(--ui-border-color);
  }
}
```

Set tokens that read an overridden one, like `--ui-field-border-color`, again in the same rule.

### Forced colors

Under `forced-colors: active`, selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers `CanvasText`, and focused fields a `Highlight` outline. Nothing to configure.

# Theming

The knobs and roles behind colors, density, spacing, corners, fonts, elevation, motion and contrast, and the classes that scope them.

A theme sets [knobs and roles](https://open-props-ui.netlify.app/vue/guide/concepts.md#token-tiers), and every component reads the roles:

1. Knobs

   `--ui-palette-hue` 145 `--ui-palette-chroma` 0.5

2. Palette `--ui-color-1` to `--ui-color-16`

3. Roles

   - `--ui-primary` Filled buttons, links, focus ring
   - `--ui-palette-tint` Tonal fills
   - `--ui-palette-text` Tinted text
   - `--ui-palette-border` Tinted borders

4. Components

   [A link](#token-flow)

Drag a knob: the palette is derived again, the roles that read it follow, and so does every component. A theme sets the knobs once on `html`; this figure is a `.ui-palette` scope with its own.

Snippets on this page belong in `@layer theme.custom`, see [Your theme](https://open-props-ui.netlify.app/vue/guide/customizing.md#your-theme). Every token and its default is on [Theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md), and the [Theme generator](https://open-props-ui.netlify.app/vue/guide/theme-generator.md) writes a theme for you.

## Palette

One hue and chroma in `theme.css` become a source color, `--ui-palette-source`, and `core/palette.css` derives the `--ui-color-1` to `--ui-color-16` steps from it.

```css
:where(html) {
  --ui-palette-chroma: 0.5;
  --ui-palette-hue: 145;
  --ui-palette-hue-rotate-by: 0;
}
```

- `--ui-palette-chroma` scales the saturation, from `0` (gray) to `1`.
- `--ui-palette-hue` is a hue angle in degrees, `145` (green) by default.
- `--ui-palette-hue-rotate-by` turns the hue by this many degrees per step, so `1` spreads 15° across the palette. The severity scopes use `1` for livelier tints.

Or set `--ui-palette-source` to any color: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. The palette is computed on `:root`, `.ui-palette`, `.ui-contrast-more`, the severity classes and the inline `del`, `ins`, `abbr` and `dfn` elements and their classes, so the knobs do nothing anywhere else. Each severity class takes its hue from its intent token, so setting `--ui-critical`, `--ui-info`, `--ui-success` or `--ui-warning` recolors the scope. `.ui-neutral` follows `--ui-gray-hue` and `--ui-gray-chroma` instead:

```css
:where(.ui-warning) {
  --ui-palette-source: oklch(from var(--ui-warning) 0.58 0.21 h);
  --ui-palette-hue-rotate-by: 1;
}
```

## Scopes

A scope class re-themes an element and everything inside it, so one page can carry several brands, a dark panel or one red for every critical component:

- `.ui-palette` re-derives the palette and every derived token (colors, control sizes, spacing, type roles and radii) from the knobs the element sets or inherits, `--ui-primary` and the intent colors included. `.ui-contrast-more` does the same with the contrast knobs tightened.
- `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` and `.ui-warning` swap the palette steps for the intent color and leave `--ui-primary` and the text colors alone. [Concepts](https://open-props-ui.netlify.app/vue/guide/concepts.md#palette-scopes) shows the steps of each one.
- `.ui-light` and `.ui-dark` force a color scheme. On an element they only pick the other side of `light-dark()`: the surface and text colors and `--ui-shadow-elevated` switch, while the shadow color and strength still come from the page.

## Surfaces

Five surfaces, two text colors and two border colors paint everything that isn't an accent:

- `--ui-surface` The page
- `--ui-surface-elevated` Elevated cards and accordions, dialogs, drawers, menus
- `--ui-surface-tonal` Tonal variants
- `--ui-surface-filled` Lists, tracks, table headers
- `--ui-surface-inverse` Tooltips
- `--ui-text-strong` Headings, labels, values
- `--ui-text` Body copy
- `--ui-border-color` Dividers, outlined variants
- `--ui-field-border-color` Fields

Each role with its current value, live with the theme.

A raised component (tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and a `Callout` without a severity) sets `--ui-border-color` to `--ui-border-color-on-raised` and `--ui-field-border-color` to `--ui-field-border-color-on-raised` on its root, so dividers and fields inside it stay visible on the raised fill. Both default to the plain border colors. Filled lists and table headers do the same with the `-on-filled` pair. A theme that wants another border on raised surfaces sets the `-on-raised` tokens.

## Density

`--ui-density` scales the `--ui-control-size*` roles, so fields, buttons and list items grow or shrink together, and their padding shrinks down to the height of the text. Set it on `html`, or on a `.ui-palette` element to change one part of the page.

```css
:where(html) {
  --ui-density: 0.875;
}
```

## Spacing

`--ui-space-1` to `--ui-space-8` pad and space containers, forms and rich text. Each is a fixed step (`0.25rem`, `0.5rem`, `1rem`, `1.25rem`, `1.5rem`, `1.75rem`, `2rem` and `3rem`) times `--ui-space-scale`, set on `html` or a `.ui-palette` element. Controls follow `--ui-density` instead, so a roomy form can keep compact fields.

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

`--ui-radius` rounds every component, and buttons and fields follow it until you set `--ui-button-radius` or `--ui-field-radius`. Small parts like `kbd`, tooltips and checkboxes never get rounder than it, so `0` squares everything. `--ui-radius-x-small`, `--ui-radius-small` and `--ui-radius-large` derive from it (capped at 2px and 5px, and times 1.5), and `--ui-radius-round` is the pill.

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

### Fluid headings

`--ui-font-size-h1` to `--ui-font-size-h4` grow from one step to the next as the viewport widens, together, over one window: `--ui-fluid-min-inline-size` (20rem) to `--ui-fluid-max-inline-size` (48rem). `--ui-fluid-progress` is the position in that window, 0 to 1, from `progress()`, so a theme can ramp other values on the same window. Move the window, reuse the ramp, or pin a heading to a step:

```css
:where(html) {
  /* Headings reach full size on wider screens */
  --ui-fluid-min-inline-size: 24rem;
  --ui-fluid-max-inline-size: 64rem;

  /* Tighter spacing on narrow screens, on the same ramp */
  --ui-space-scale: calc(0.875 + 0.125 * var(--ui-fluid-progress));

  /* Or pin a heading */
  --ui-font-size-h1: var(--ui-font-size-800);
}
```

Browsers without `progress()` (before Firefox 155 and Safari 26) keep `clamp()` heading sizes and have no `--ui-fluid-progress`.

## Elevation

- `--ui-shadow-control`: buttons with a variant, chips, toggle buttons and fields. `none` until a theme sets it, and the optional `--ui-shadow-field` splits off the fields.
- `--ui-shadow-elevated`: elevated cards and accordions.
- `--ui-shadow-overlay`: dialogs, drawers, menus, `select` pickers and the carousel buttons.
- `--ui-shadow-scroll`: the edges of scrolled dialogs, drawers and sticky table headers.
- `--ui-shadow-surface`: tonal and outlined cards and accordions, and callouts. `none` by default.
- `--ui-shadow-selected`: the selected tab.
- `--ui-shadow-color`: the color and base opacity every default shadow is built from, a `light-dark()` pair, so shadows darken in dark mode, also in `.ui-dark` parts of the page. Each layer adds its own opacity on top.

```css
:where(html) {
  --ui-shadow-color: light-dark(hsl(250 30% 20% / 2%), hsl(0 0% 0% / 30%));
  --ui-shadow-elevated: none;
}
```

## Motion

`--ui-motion` multiplies every duration. It is `1`, or `0` under `prefers-reduced-motion: reduce`.

### Global classes

On `html`, these override the OS preference for every transition and animation. Smooth scrolling follows the system setting only, since `normalize.css` keys it on `prefers-reduced-motion`.

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

`--ui-contrast` is `normal`, or `more` under `prefers-contrast: more`. More contrast changes no color directly. It tightens the knobs the roles are derived from, and every role follows: `--ui-text-strength-light` and `--ui-text-strength-dark` (how much of `--ui-text-strong` goes into `--ui-text`), `--ui-border-strength-light`, `--ui-border-strength-dark` and `--ui-field-border-strength` for the borders, `--ui-text-max-lightness`, `--ui-text-min-lightness` and `--ui-text-max-chroma` for the `-text` roles, `--ui-accent-fill-max-lightness` for intent fills, `--ui-primary-max-lightness` and `--ui-primary-min-lightness` for the primary, the `--ui-palette-*-lightness` limits for the palette roles, and `--ui-focus-ring-width`. Their values in both modes are on [Theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md#contrast). Components with translucent fills or text have style queries of their own for the shape changes.

A theme that sets a knob or `--ui-primary-source` keeps working with more contrast. The example themes set their brand color that way and let `--ui-on-primary` and `--ui-primary-text` derive from it, so Bootstrap's blue darkens under more contrast and its text follows. A theme that pins a role directly, such as `--ui-text: #333`, owns that role in every contrast mode. Set the knob instead, or give the role its own value under `@media (prefers-contrast: more)`.

### Classes

- `.ui-contrast-more`: sets `--ui-contrast: more` and the tightened knobs, on `html` or any element. On an element it is a scope like `.ui-palette`, so every role inside is derived again.
- `.ui-contrast-normal`: sets `--ui-contrast: normal`, on `html` to ignore the OS preference. It can't lower the contrast inside a `.ui-contrast-more` ancestor.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

To tune more contrast, set the knobs where the library sets them: on `html` under the media query, and on `.ui-contrast-more`.

```css
@layer theme.custom {
  @media (prefers-contrast: more) {
    :where(html:not(.ui-contrast-normal)) {
      --ui-border-strength-light: 70%;
      --ui-field-border-strength: 80%;
    }
  }

  :where(.ui-contrast-more) {
    --ui-border-strength-light: 70%;
    --ui-field-border-strength: 80%;
  }
}
```

### Forced colors

Under `forced-colors: active`, selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers `CanvasText`, and focused fields a `Highlight` outline. Nothing to configure.

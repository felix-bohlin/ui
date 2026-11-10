# Theming

The knobs and roles behind colors, density, spacing, corners, fonts, elevation, motion and contrast, and the classes that scope them.

A theme sets [knobs and roles](https://open-props-ui.netlify.app/html/guide/concepts.md#token-tiers), and every component reads the roles:

1. Knobs

   `--ui-palette-hue` 223 `--ui-palette-chroma` 0.5

2. Palette `--ui-color-1` to `--ui-color-16`

3. Roles

   - `--ui-primary` Filled buttons, links, checked controls
   - `--ui-palette-tint` Tonal fills
   - `--ui-palette-text` Tinted text
   - `--ui-palette-border` Tinted borders

4. Components

   [A link](#token-flow)

Snippets go in [`@layer theme.custom`](https://open-props-ui.netlify.app/html/guide/customizing.md#your-theme). Every token is on [Theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Palette

One hue and chroma derive the 16 palette steps.

```css
:where(html) {
  --ui-palette-chroma: 0.5;
  --ui-palette-hue: 222.8;
  --ui-palette-hue-rotate-by: 0;
}
```

- `--ui-palette-chroma`: saturation, `0` to `1`.
- `--ui-palette-hue`: a hue angle in degrees.
- `--ui-palette-hue-rotate-by`: degrees of hue per step.

Or set `--ui-palette-source` to any color. Recolor a severity scope through its intent token, like `--ui-warning`. The library's own rule:

```css
:where(.ui-warning) {
  --ui-palette-source: oklch(from var(--ui-warning) 0.58 0.21 h);
  --ui-palette-hue-rotate-by: 1;
}
```

## Scopes

A scope class re-themes an element and everything inside it:

- `.ui-palette`: re-derives every token from the knobs it sets.
- `.ui-critical` and the other severities: swap the palette for the intent color.
- `.ui-light` and `.ui-dark`: force a color scheme. Builds that rewrite `light-dark()` only follow them on `html`, see the [README](https://github.com/felix-bohlin/ui/blob/main/packages/opui/README.md#builds-that-rewrite-light-dark).

## Surfaces

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

Set `--ui-border-color-on-raised` for borders inside raised components, and `--ui-border-color-raised` for their edge.

## Density

Use `--ui-density` to change the size of every control.

```css
:where(html) {
  --ui-density: 0.875;
}
```

## Spacing

Use `--ui-space-scale` to change spacing. Controls follow density instead.

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

Use `--ui-radius` to round every component.

```css
:where(html) {
  --ui-radius: 0;
}
```

## Fonts

Headings follow the body font until you set one.

```css
:where(html) {
  --ui-font-body: "Inter", system-ui, sans-serif;
  --ui-font-code: "JetBrains Mono", ui-monospace, monospace;
  --ui-font-heading: "Fraunces", serif;
}
```

Pin a size role, or replace the scale:

```css
:where(html, .ui-palette, .ui-contrast-more) {
  /* Pin one role */
  --ui-font-size-caption: 0.8125rem;
}

:where(html) {
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

Headings grow with the viewport. Move the window, reuse the ramp, or pin a heading:

```css
:where(html) {
  /* Headings reach full size on wider screens */
  --ui-fluid-min-inline-size: 24rem;
  --ui-fluid-max-inline-size: 64rem;

  /* Tighter spacing on narrow screens, on the same ramp */
  --ui-space-scale: calc(0.875 + 0.125 * var(--ui-fluid-progress));
}

:where(html, .ui-palette, .ui-contrast-more) {
  /* Or pin a heading */
  --ui-font-size-h1: var(--ui-font-size-800);
}
```

## Elevation

- `--ui-shadow-control`: controls. Off by default.
- `--ui-shadow-elevated`: elevated cards and accordions.
- `--ui-shadow-overlay`: dialogs, menus and toasts.
- `--ui-shadow-scroll`: scrolled edges.
- `--ui-shadow-surface`: tonal and outlined surfaces. Off by default.
- `--ui-shadow-selected`: the selected tab.
- `--ui-shadow-color`: every shadow's base color.

```css
:where(html, .ui-palette, .ui-contrast-more) {
  --ui-shadow-color: light-dark(oklch(0.28 0.055 290 / 2%), oklch(0 0 0 / 30%));
  --ui-shadow-elevated: none;
}
```

## Motion

`--ui-motion` multiplies every duration. It's `0` with reduced motion.

### Global classes

On `html`, these override the OS preference:

- `.ui-motion-off`: sets `--ui-motion: 0`.
- `.ui-motion-on`: sets `--ui-motion: 1`.
- `.ui-motion-debug`: sets `--ui-motion: 10`.

```html
<html lang="en" class="ui-motion-debug">
```

### Local overrides

Use `--_motion` on one component:

```html
<button class="ui-button" style="--_motion: 0" type="button">
  Instant interaction
</button>
```

### Springy movement

Off by default. Set `--ui-ease-move` and `--ui-press-scale` to turn them on.

```css
:root {
  --ui-ease-move: linear(0, 0.066, 0.218, 0.4, 0.578, 0.731, 0.852, 0.94, 0.998,
    1.031, 1.047, 1.05, 1.046, 1.038, 1.029, 1.02, 1.012, 1.007, 1.002, 1, 1);
  --ui-press-scale: 0.97;
}
```

To follow it in your own CSS:

```css
transition: transform calc(var(--ui-duration) * var(--ui-motion)) var(--ui-ease);
```

## Contrast

More contrast tightens the knobs, and every role follows. Their values are on [Theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md#contrast).

A role a theme pins stays pinned in every contrast mode. Hand it back with `revert-layer`:

```css
@layer theme.custom {
  :where(html, .ui-palette, .ui-contrast-more) {
    --ui-border-color: oklch(0.95 0 0);
  }

  @media (prefers-contrast: more) {
    :where(
      html:not(.ui-contrast-normal),
      html:not(.ui-contrast-normal) .ui-palette
    ) {
      --ui-border-color: revert-layer;
    }
  }

  :where(.ui-contrast-more, .ui-contrast-more .ui-palette) {
    --ui-border-color: revert-layer;
  }
}
```

### Classes

- `.ui-contrast-more`: more contrast, on `html` or any element.
- `.ui-contrast-normal`: on `html`, ignores the OS preference.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

Set the knobs under the media query and on `.ui-contrast-more`:

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

Handled by the components. Nothing to configure.

## Functions

The tokens get their formulas from custom functions (`@function`). Call them for your own colors and sizes:

```css
:where(html, .ui-palette, .ui-contrast-more) {
  --brand: oklch(0.7 0.17 55);
  --brand-hover: --ui-shade(var(--brand), 0.1);
  --brand-text: --ui-text-of(var(--brand));
  --on-brand: --ui-on(var(--brand));
  --hero-font-size: --ui-fluid(2rem, 4rem);
}
```

- `--ui-dark-text-of(color)`: the dark mode half of `--ui-text-of()`.
- `--ui-fluid(min, max)`: a size on the [fluid heading](#fluid-headings) ramp.
- `--ui-gray-of(color)`: the gray at a color's lightness.
- `--ui-on(fill)`: white or near-black text for a fill, at 4.5:1.
- `--ui-palette-step(step, lightness, chroma)`: a step of the [palette](#palette).
- `--ui-shade(fill, by)`: the hover (`0.1`) or pressed (`0.15`) shade of a fill.
- `--ui-shadow-layer(alpha)`: `--ui-shadow-color` with more opacity.
- `--ui-text-of(color)`: a color as text, readable in both color schemes.

Replace one in your theme:

```css
@layer theme.custom {
  /* Black or white, by the lightness of the fill */
  @function --ui-on(--fill) {
    result: oklch(from var(--fill) clamp(0, (0.6 - l) * 1000, 1) 0 0);
  }
}
```

Custom functions have no fallback: a browser without them resolves none of the tokens that call one. In Chromium, don't pass a function a token that the same element derives with the same function, such as `--ui-text-of(var(--ui-primary-text))` on `html`: neither resolves.

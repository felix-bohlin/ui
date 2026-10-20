# Theming

Colors, density, spacing, corners, fonts, elevation, motion and contrast. Each is a few custom properties on `html`, and a few classes change them for one part of the page.

## Palette

The basic idea is to pick one hue and chroma, and derive a 16-step palette from them. `theme.css` sets `--ui-palette-hue` and `--ui-palette-chroma`, and `core/palette.css` turns them into a source color, `--ui-palette-source`, and the `--ui-color-1` to `--ui-color-16` steps.

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

- **`--ui-palette-hue`** is a hue angle in degrees. Open Props' `--hue-*` tokens work here. The default is green in light mode and blue in dark mode.
- **`--ui-palette-chroma`** scales the saturation, from `0` (gray) to `1`.
- **`--ui-palette-hue-rotate-by`** shifts the hue a little more on each step, in degrees. Step 2 turns by the value once, step 3 twice, and so on, so `1` spreads 15° from `--ui-color-1` to `--ui-color-16`. The severity scopes use `1` for livelier tints, the brand palette `0`.

You can also set `--ui-palette-source` directly. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. Set it on `:root`, or on an element with `.ui-palette` to re-theme that part of the page. Anywhere else it has no effect: the palette is computed where `core/palette.css` declares it and only inherited from there. The same goes for `--ui-palette-hue`, `--ui-palette-chroma` and `--ui-palette-hue-rotate-by`.

This is how the severity classes get their colors:

```css
:where(.ui-warning) {
  --ui-palette-source: oklch(0.58 0.21 var(--hue-orange));
}
```

Every token with its default is listed on the [Theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) page, and the [Theme generator](https://open-props-ui.netlify.app/vue/guide/theme-generator.md) writes a complete `theme.css` for you.

## Scopes

A scope is a class that changes the theme for one element and everything inside it.

- `.ui-light` and `.ui-dark` force a color scheme. Put them on `html` for the whole page, or on any element for just that part.
- `.ui-critical`, `.ui-info`, `.ui-success`, `.ui-warning` and `.ui-neutral` swap the palette to red, blue, green, orange or gray. The `--ui-color-1` to `--ui-color-16` steps inside follow, while `--ui-primary` and the text colors keep the page values.
- `.ui-palette` re-derives the palette and every color token from the knobs set on that element, so one page can carry several brands.

On an element, `.ui-dark` and `.ui-light` only switch between light and dark colors. The palette hue and the shadows still come from the page. So on a light page, a `.ui-dark` box stays green and keeps the light shadows, while a dark page is blue. Add `.ui-palette` with the dark hue to make the box match dark mode:

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

`--ui-density` scales the `--ui-control-size*` tokens, so fields, buttons and list items grow or shrink together. Field and button padding shrinks to fit, down to the height of the text. The sizes resolve on `html`, so set `--ui-density` there.

```css
:where(html) {
  --ui-density: 0.875;
}
```

## Spacing

Containers space their content with the `--ui-space-1` to `--ui-space-8` steps: the padding of cards, callouts, dialogs, drawers, toasts and table cells, the gaps in forms, and the margins in rich text. Each step is the Open Props size of the same number times `--ui-space-scale`, so one value makes the whole page roomier or tighter. Controls keep following `--ui-density`, so a form can be spacious while its fields stay compact.

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

Like the control sizes, the steps resolve on `html`, so set `--ui-space-scale` there.

## Corners

`--ui-border-radius` rounds every component. Cards, callouts, menus and dialogs read it directly, and buttons and fields follow it until you set `--ui-button-border-radius` or `--ui-field-border-radius`. Small parts, such as `kbd`, tooltips and checkboxes, keep their smaller radius but never get rounder than `--ui-border-radius`, so `0` squares everything. It works on a part of the page too.

```css
:where(html) {
  --ui-border-radius: 0;
}
```

## Fonts

`--ui-font-body` sets the text, fields and buttons, `--ui-font-heading` the headings and the `.ui-h1` to `.ui-h6` classes, and `--ui-font-code` code, `kbd` and `samp`. Headings follow the body font until you set their own, also where you set `--ui-font-body` on a part of the page.

```css
:where(html) {
  --ui-font-body: "Inter", var(--font-sans);
  --ui-font-code: "JetBrains Mono", var(--font-mono);
  --ui-font-heading: "Fraunces", var(--font-serif);
}
```

Sizes come in two tiers. `--ui-font-size-100` to `--ui-font-size-900` are the nine steps of the type scale, 12px to 56px. The roles read them: `--ui-font-size-caption`, `--ui-font-size-small`, `--ui-font-size-body`, `--ui-font-size-control`, `--ui-font-size-large` and `--ui-font-size-h1` to `--ui-font-size-h6`, and every component reads a role. So you have three moves: pin one role, move one step and every role on it follows, or replace the scale with your own. `--ui-line-height-tight`, `--ui-line-height`, `--ui-line-height-body` and `--ui-line-height-relaxed` set the line heights, and `--ui-letter-spacing-display`, `--ui-letter-spacing-heading` and `--ui-letter-spacing-caps` the tracking of large headings, smaller headings and uppercase text.

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

Five shadows lift things off the page. `--ui-shadow-raised` is for surfaces in the page, like elevated cards and accordions. It switches between `--ui-shadow-raised-light` and `--ui-shadow-raised-dark` with the color scheme, also in `.ui-light` and `.ui-dark` parts of the page, so set those two. `--ui-shadow-overlay` is for layers above the page: menus, `select` pickers, drawers and toasts. `--ui-shadow-control` is for buttons with a variant and fields, and is `none` until a theme sets it, like a hard offset shadow. Set the optional `--ui-shadow-field` to give fields their own. `--ui-shadow-tab` is for the selected tab. `--ui-shadow-surface` is `none` too, for tonal and outlined cards and accordions, and callouts.

```css
:where(html) {
  --ui-shadow-overlay: var(--shadow-4);
  --ui-shadow-raised-dark: none;
  --ui-shadow-raised-light: none;
}
```

## Motion

Use the `--ui-motion` variable to turn motion on or off. The default value is `1`. If a user has `prefers-reduced-motion: reduce` enabled, `--ui-motion` will be set to `0` by default.

### Global classes

Adding these utility classes to the `html` element will override the OS preference.

- `.ui-motion-off`: sets `--ui-motion: 0`.
- `.ui-motion-on`: sets `--ui-motion: 1`.
- `.ui-motion-debug`: sets `--ui-motion: 10` (slows down transitions 10x).

```html
<html lang="en" class="ui-motion-debug">
```

### Local overrides

Components use a local `--_motion` variable that allows you to disable motion for each component individually if you want.

```html
<button class="ui-button" style="--_motion: 0" type="button">
  Instant interaction
</button>
```

Additionally, this is how you could include `--ui-motion` in your CSS:

```css
transition: transform calc(var(--ui-duration) * var(--ui-motion)) var(--ui-ease);
```

## Contrast

The `--ui-contrast` variable is `normal` by default. If a user has `prefers-contrast: more` enabled, it is set to `more`, and a style query raises the contrast of muted text, borders, field borders, the primary color, intent colors and the focus ring. Components with translucent text, such as Tabs, keyboard hints and inline code, follow along.

Optional theme tokens that carry contrast, such as `--ui-control-border-color`, `--ui-selected` and `--ui-primary-text`, are reset under more contrast, so the library's values win over a theme's. A theme that wants its own value there sets the token again inside its own `@container style(--ui-contrast: more)` block, as the example themes do for `--ui-button-accent`. Declared tokens, such as `--ui-primary` and `--ui-border-color`, are overridden the same way: the block in `theme.css` sets them on `body`, so a theme's `html` value gives way until the theme re-sets it there.

Try it with the **High contrast** switch in the theme config drawer.

### Classes

- `.ui-contrast-more`: sets `--ui-contrast: more`. Put it on `html` for the whole page, or on any element to raise the contrast of its children.
- `.ui-contrast-normal`: sets `--ui-contrast: normal`. Put it on `html` to ignore the OS preference. It doesn't lower the contrast inside a `.ui-contrast-more` ancestor, since the tokens are already resolved on the parent.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

Style queries match against the parent element, so the high-contrast values are set on `body` instead of `html`. They are set again on the children of `.ui-contrast-more` and on the surfaces that have their own border colors: `.ui-palette`, elevated and tonal accordions and cards, default callouts, filled lists and table headers. They replace any value you set on `html` for the same tokens. To tune them, write your own style query with the same selectors:

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

Tokens that reference an overridden token, like `--ui-field-border-color` above, have to be set again in the same rule.

### Forced colors

When an OS contrast theme forces its own palette (`forced-colors: active`), components switch to system colors so their state stays visible. Selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers are drawn with `CanvasText`, and focused fields get a `Highlight` outline. There is nothing to configure.

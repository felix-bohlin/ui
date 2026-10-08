# Theming

Colors, density, motion and contrast. Each is a few custom properties on `html`, and a few classes change them for one part of the page.

## Palette

The basic idea is to pick one hue and chroma, and derive a 16-step palette from them. `theme.css` sets `--palette-hue` and `--palette-chroma`, and `core/palette.css` turns them into a source color, `--palette-source`, and the `--color-1` to `--color-16` steps.

```css
:where(html) {
  --palette-chroma: 0.5;
  --palette-hue: var(--hue-green);
  --palette-hue-rotate-by: 0;
}

:where(html.ui-dark) {
  --palette-hue: var(--hue-blue);
}
```

- **`--palette-hue`** is a hue angle in degrees. Open Props' `--hue-*` tokens work here. The default is green in light mode and blue in dark mode.
- **`--palette-chroma`** scales the saturation, from `0` (gray) to `1`.
- **`--palette-hue-rotate-by`** shifts the hue a little more on each step, in degrees. Step 2 turns by the value once, step 3 twice, and so on, so `1` spreads 15° from `--color-1` to `--color-16`. The severity scopes use `1` for livelier tints, the brand palette `0`.

You can also set `--palette-source` directly. Any color works: the palette keeps its oklch hue, scales its chroma and sets the lightness per step. Set it on `:root`, or on an element with `.ui-palette` to re-theme that part of the page. Anywhere else it has no effect: the palette is computed where `core/palette.css` declares it and only inherited from there. The same goes for `--palette-hue`, `--palette-chroma` and `--palette-hue-rotate-by`.

This is how the severity classes get their colors:

```css
:where(.ui-warning) {
  --palette-source: oklch(0.58 0.21 var(--hue-orange));
}
```

Every token with its default is listed on the [Theme tokens](https://open-props-ui.netlify.app/svelte/guide/theme-tokens.md) page, and the [Theme generator](https://open-props-ui.netlify.app/svelte/guide/theme-generator.md) writes a complete `theme.css` for you.

## Scopes

A scope is a class that changes the theme for one element and everything inside it.

- `.ui-light` and `.ui-dark` force a color scheme. Put them on `html` for the whole page, or on any element for just that part.
- `.ui-critical`, `.ui-info`, `.ui-success`, `.ui-warning` and `.ui-neutral` swap the palette to red, blue, green, orange or gray. The `--color-1` to `--color-16` steps inside follow, while `--primary` and the text colors keep the page values.
- `.ui-palette` re-derives the palette and every color token from the knobs set on that element, so one page can carry several brands.

```html
<aside class="ui-dark">Always dark</aside>

<section class="ui-palette" style="--palette-hue: 30">
  <button class="ui-button ui-primary ui-filled" type="button">
    Orange brand
  </button>
</section>
```

## Density

`--density` scales the `--control-size*` tokens, so fields, buttons and list items grow or shrink together. Field and button padding shrinks to fit, down to the height of the text. The sizes resolve on `html`, so set `--density` there.

```css
:where(html) {
  --density: 0.875;
}
```

## Motion

Use the `--motion` variable to turn motion on or off. The default value is `1`. If a user has `prefers-reduced-motion: reduce` enabled, `--motion` will be set to `0` by default.

### Global classes

Adding these utility classes to the `html` element will override the OS preference.

- `.ui-motion-off`: sets `--motion: 0`.
- `.ui-motion-on`: sets `--motion: 1`.
- `.ui-motion-debug`: sets `--motion: 10` (slows down transitions 10x).

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

Additionally, this is how you could include `--motion` in your CSS:

```css
transition: transform calc(var(--duration) * var(--motion, 1)) var(--ease);
```

## Contrast

The `--contrast` variable is `normal` by default. If a user has `prefers-contrast: more` enabled, it is set to `more`, and a style query raises the contrast of muted text, borders, field borders, the primary color, intent colors and the focus ring. Components with translucent text, such as Tabs, keyboard hints and inline code, follow along.

Try it with the **High contrast** switch in the theme config drawer.

### Classes

- `.ui-contrast-more`: sets `--contrast: more`. Put it on `html` for the whole page, or on any element to raise the contrast of its children.
- `.ui-contrast-normal`: sets `--contrast: normal`. Put it on `html` to ignore the OS preference. It doesn't lower the contrast inside a `.ui-contrast-more` ancestor, since the tokens are already resolved on the parent.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

Style queries match against the parent element, so the high-contrast values are set on `body` instead of `html`. They are set again on the children of `.ui-contrast-more` and on the surfaces that have their own border colors: `.ui-palette`, elevated and tonal cards, filled lists and table headers. They replace any value you set on `html` for the same tokens. To tune them, write your own style query with the same selectors:

```css
@container style(--contrast: more) {
  :where(
    body,
    .ui-contrast-more > *,
    .ui-palette,
    .ui-card.ui-elevated,
    .ui-card.ui-tonal,
    .ui-list:not(.ui-tonal, .ui-transparent),
    .ui-table th
  ) {
    --border-color: var(--text-muted);
    --field-border-color: var(--border-color);
  }
}
```

Tokens that reference an overridden token, like `--field-border-color` above, have to be set again in the same rule.

### Forced colors

When an OS contrast theme forces its own palette (`forced-colors: active`), components switch to system colors so their state stays visible. Selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers are drawn with `CanvasText`, and focused fields get a `Highlight` outline. There is nothing to configure.

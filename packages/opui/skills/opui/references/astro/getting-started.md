# Getting started

OPUI ships first-class Astro components. Install the package, import what you need, and you're set.

## Install via NPM

`pnpm`

```sh
pnpm add opui-css open-props astro -S
```

`npm`

```sh
npm install opui-css open-props astro -S
```

## Import the CSS

Astro components ship markup only - the CSS still has to be imported once. The frontmatter of the layout every page uses is a good spot. Import everything:

```astro
---
import "opui-css/css/imports.css"
---
```

Or pick and choose in a CSS file, and import that file in the layout instead:

```css
@import "opui-css/css/layers.css";
@import "opui-css/open-props.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components.css";
@import "opui-css/core/utils.css";
```

```astro
---
import "../styles/global.css"
---
```

## How to use

```astro
---
import { Button } from "opui-css/astro"
---


<Button variant="filled">Click me</Button>
```

## Theming

The basic idea is to pick one hue and chroma, and derive a 16-step palette from them. `theme.css` sets `--palette-hue` and `--palette-chroma`, and `core/palette.css` turns them into a source color, `--palette-source`, and the `--color-1` to `--color-16` steps.

```css
:where(html) {
  --palette-hue: 264;
  --palette-chroma: 0.5;
  --palette-hue-rotate-by: 0;
}
```

- **`--palette-hue`** is a hue angle in degrees. Open Props' `--hue-*` tokens work here. The default is green in light mode and blue in dark mode.
- **`--palette-chroma`** scales the saturation, from `0` (gray) to `1`.
- **`--palette-hue-rotate-by`** is a separate knob for per-step warm/cool drift, in degrees.

You can also set `--palette-source` directly (it must be an `oklch()` color), and you can override it anywhere you want for useful or cool effect:

```css
:where(.ui-warning) {
  --palette-source: oklch(0.58 0.21 var(--hue-orange));
}
```

Every token with its default is listed on the [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) page.

### `theme.css` generator

There's a WIP visual editor for editing `theme.css` - [try it out](https://open-props-ui.netlify.app/astro/guide/theme-generator.md)!

### Scopes

`.ui-light` and `.ui-dark` force a color scheme. Put them on `html` to control the whole page, or on any element to force a subtree. `.ui-palette` re-derives the palette and all color tokens from the knobs set on that element, so one page can carry several brands.

```html
<aside class="ui-dark">Always dark</aside>


<section class="ui-palette" style="--palette-hue: 30">
  <button class="ui-button ui-primary ui-filled">Orange brand</button>
</section>
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
<button class="ui-button" style="--_motion: 0">
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
- `.ui-contrast-normal`: sets `--contrast: normal`. Put it on `html` to ignore the OS preference.

```html
<html lang="en" class="ui-contrast-more">
```

### Custom values

Style queries match against the parent element, so the overrides are set on `body` instead of `html`. They replace any value you set on `html` for the same tokens. To tune them, write your own style query:

```css
@container style(--contrast: more) {
  :where(body) {
    --border-color: var(--text-muted);
    --field-border-color: var(--border-color);
  }
}
```

Tokens that reference an overridden token, like `--field-border-color` above, have to be set again in the same rule.

### Forced colors

When an OS contrast theme forces its own palette (`forced-colors: active`), components switch to system colors so their state stays visible. Selected tabs, toggles and list items use `SelectedItem`, switches, ranges, progress bars and dividers are drawn with `CanvasText`, and focused fields get a `Highlight` outline. There is nothing to configure.

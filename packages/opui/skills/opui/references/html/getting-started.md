# Getting started

Open Props UI is a CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Designed to be used by professional teams as well as tinkering hobbyists.

Open Props UI is *just CSS*. You can copy any [component](https://open-props-ui.netlify.app/html/components.md) CSS straight from the docs - no install required. It reads tokens from Open Props, `palette.css` and `theme.css`, so those need to be on the page too. The CDN link below has all of it in one file.

## Install via CDN

The quickest way to get going. One file with Open Props, the theme, the reset, every component and the utility classes, in the right cascade layers.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css" />
```

`@6` loads the newest 6.x release, so a new major version never changes your site. Pin an exact version, such as `@6.0.0`, for full control.

## Install via NPM

For when you have a bundler that resolves CSS `@import`s from `node_modules`, like Vite or webpack. No bundler? Use the CDN or install manually.

`pnpm`

```sh
pnpm add opui-css open-props
```

`npm`

```sh
npm install opui-css open-props
```

### Import the CSS

Either import everything in your main CSS file:

```css
@import "opui-css/css/imports.css";
```

Or pick and choose the parts you want to include:

```css
@import "opui-css/css/layers.css";
@import "opui-css/open-props.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components.css";
@import "opui-css/core/utils.css";
```

## Install manually

The most flexible way to use OPUI, and it works without a build step. Download these files from the [`packages/opui/` folder on GitHub](https://github.com/felix-bohlin/ui/tree/main/packages/opui) and drop them into your project.

```text
opui
├─ core
│  ├─ normalize.css
│  ├─ palette.css
│  └─ utils.css
├─ css
│  ├─ components
│  │  ├─ accordion.css
│  │  └─ ...
│  ├─ js
│  │  ├─ checkbox.js
│  │  └─ toast.js
│  ├─ components.css
│  ├─ layers.css
│  └─ theme.css
└─ op.css
```

`op.css` is Open Props, pre-bundled in the `openprops` layer. It isn't in the repo, so grab it from [the CDN](https://cdn.jsdelivr.net/npm/opui-css@6/dist/op.css) (or `dist/op.css` in the npm package). The package's `open-props.css` imports Open Props from `node_modules`, which only works with a bundler.

Put it all together something like this in your main CSS. If you have your files in a different folder structure you'd of course need to change the paths.

```css
@import "./opui/css/layers.css";


@import "./opui/op.css";
@import "./opui/core/palette.css";
@import "./opui/css/theme.css";
@import "./opui/core/normalize.css";
@import "./opui/css/components.css";
@import "./opui/core/utils.css";
```

## Your first component

With the CSS on the page, a component is a class on the right element. The modifiers are classes too.

A few components need a bit of JavaScript in plain HTML: the Toast manager in `css/js/toast.js` and indeterminate checkboxes in `css/js/checkbox.js`. [Concepts](https://open-props-ui.netlify.app/html/guide/concepts.md) explains the class names, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/html/components.md).

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

Every token with its default is listed on the [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) page.

### `theme.css` generator

There's a WIP visual editor for editing `theme.css` - [try it out](https://open-props-ui.netlify.app/html/guide/theme-generator.md)!

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

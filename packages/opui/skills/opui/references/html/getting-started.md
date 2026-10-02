# Getting started

Open Props UI is a CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Designed to be used by professional teams as well as tinkering hobbyists.

Open Props UI is *just CSS*. You can copy any [component](https://open-props-ui.netlify.app/html/components.md) CSS straight from the docs - no install required. The rest of this page is for when you want the full setup.

## Install manually

The most flexible way to use OPUI. Download these files from the [`packages/opui/` folder on GitHub](https://github.com/felix-bohlin/ui/tree/main/packages/opui) and drop them into your project.

```text
├─ opui
  └─ core
     ├─ normalize.css
     ├─ palette.css
     └─ utils.css
  └─ css
     ├─ components.css
     └─ theme.css
  └─ open-props.css
```

Put it all together something like this in your main CSS. If you have your files in a different folder structure you'd of course need to change the paths.

```css
@layer openprops, theme, normalize, components.prose, components.root, components.extended, utils;


@import "./open-props.css";
@import "./core/palette.css";
@import "./css/theme.css";
@import "./core/normalize.css";
@import "./css/components.css";
@import "./core/utils.css";
```

### `theme.css` generator

There's a WIP visual editor for editing `theme.css` - [try it out](https://open-props-ui.netlify.app/html/guide/theme-generator.md)!

## Theming

The basic idea is to define one source color, `--palette-source`, and then derive the rest of the 16-step palette from it.

```css
:where(html) {
  --palette-source: oklch(0.58 0.18 264);
  --palette-hue-rotate-by: 0;
}
```

- **Must be `oklch()`.**
- **`--palette-hue-rotate-by`** is a separate knob for per-step warm/cool drift, in degrees.

  You can override the source color anywhere you want for useful or cool effect:
  ```css
  :where(.ui-warning) {
    --palette-source: oklch(0.58 0.21 var(--hue-orange));
  }
  ```

## Motion

Use the `--motion` variable to turn motion on or off. The default value is `1`. If a user has `prefers-reduced-motion: reduce` enabled,`--motion` will be set to `0` by default.

### Global Classes

Adding these utility classes to the `html` element will override the OS preference.

- `.ui-motion-off`: sets `--motion: 0`.
- `.ui-motion-on`: sets `--motion: 1`.
- `.ui-motion-debug`: sets `--motion: 10` (slows down transitions 10x).

```html
<html lang="en" class="ui-motion-debug">
```

### Local Overrides

Components use a local `--_motion` variable that allows you to disable motion for each component individually if you want.

```html
<button class="ui-button" style="--_motion: 0">
  Instant interaction
</button>
```

Additionally, this is how you could include `--motion` in your CSS:

```css
transition: transform calc(0.2s * var(--motion, 1)) ease;
```

## Install via NPM

`pnpm`

```sh
pnpm add opui-css open-props -S
```

`npm`

```sh
npm install opui-css open-props -S
```

### Usage

Either import everything:

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

## Install via CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

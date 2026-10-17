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
@import "opui-css/css/components/button.css";
@import "opui-css/css/components/choice.css";
@import "opui-css/css/components/checkbox.css";
@import "opui-css/core/utils.css";
```

```astro
---
import "../styles/global.css"
---
```

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. `choice.css` goes before `checkbox.css`, `radio.css` and `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component.

## How to use

```astro
---
import { Button } from "opui-css/astro"
---

<Button variant="filled">Click me</Button>
```

Containers take parts, such as `CardHeader` and `DialogActions`. Other components take named slots for rich content, such as `end-text` on a `TextField`.

[Concepts](https://open-props-ui.netlify.app/astro/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/astro/components.md). [Theming](https://open-props-ui.netlify.app/astro/guide/theming.md) covers colors, density, motion and contrast.

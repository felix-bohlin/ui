# Getting started

Add the CSS from the CDN, from npm or by copying the files, then write the class names.

Open Props UI is *just CSS*. You can copy any [component](https://open-props-ui.netlify.app/html/components.md) CSS straight from the docs - no install required. Each component page has its CSS under Installation, with the files it depends on and a button that copies them all. It reads tokens from `palette.css` and `theme.css`, so those need to be on the page too, after `layers.css` sets the layer order. `normalize.css` adds the focus ring and `utils.css` adds `.ui-sr-only` and the motion classes. The CDN link below has all of it in one file.

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
pnpm add opui-css
```

`npm`

```sh
npm install opui-css
```

### Import the CSS

Either import everything in your main CSS file:

```css
@import "opui-css/css/imports.css";
```

Or pick and choose the parts you want to include:

```css
@import "opui-css/css/layers.css";
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components/button.css";
@import "opui-css/css/components/choice.css";
@import "opui-css/css/components/checkbox.css";
@import "opui-css/core/utils.css";
```

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component.

## Install manually

The most flexible way to use OPUI, and it works without a build step. Download the package (`npm pack opui-css`, or browse it on [jsDelivr](https://cdn.jsdelivr.net/npm/opui-css@6/)) and drop these files into your project:

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
│  │  └─ range.js
│  ├─ components.css
│  ├─ imports.css
│  ├─ layers.css
│  └─ theme.css
├─ dist
│  ├─ op.css
│  ├─ opui.components.css
│  └─ opui.css
├─ themes
│  ├─ bootstrap.css
│  ├─ brutalist.css
│  ├─ m3.css
│  └─ shadcn.css
├─ open-props.css
└─ tokens.json
```

`dist/op.css` is Open Props, pre-bundled in the `openprops` layer, and `open-props.css` imports it from `node_modules` for bundlers. The components don't read it, so both are optional and only there for your own CSS. `dist/opui.css` is the CDN file. `themes/` holds the [example themes](https://open-props-ui.netlify.app/html/guide/customizing.md#example-themes) and `tokens.json` the [design tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md#tokens-json).

Then import the files in your main CSS, in this order:

```css
@import "./opui/css/layers.css";

@import "./opui/dist/op.css";
@import "./opui/core/palette.css";
@import "./opui/css/theme.css";
@import "./opui/core/normalize.css";
@import "./opui/css/components.css";
@import "./opui/core/utils.css";
```

## Your first component

With the CSS on the page, a component is a class on the right element. The modifiers are classes too.

Two things need a bit of JavaScript in plain HTML: indeterminate checkboxes (`css/js/checkbox.js`) and the Range value (`css/js/range.js`). Import them in a `<script type="module">`, from `https://cdn.jsdelivr.net/npm/opui-css@6/css/js/` without a bundler.

[Concepts](https://open-props-ui.netlify.app/html/guide/concepts.md#javascript) shows the imports and explains the class names, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/html/components.md). [Theming](https://open-props-ui.netlify.app/html/guide/theming.md) covers colors, density, motion and contrast.

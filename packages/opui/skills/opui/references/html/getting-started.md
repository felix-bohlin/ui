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

A few components need a bit of JavaScript in plain HTML: the Toast manager in `css/js/toast.js` and indeterminate checkboxes in `css/js/checkbox.js`. [Concepts](https://open-props-ui.netlify.app/html/guide/concepts.md) explains the class names, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/html/components.md). [Theming](https://open-props-ui.netlify.app/html/guide/theming.md) covers colors, density, motion and contrast.

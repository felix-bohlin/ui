# Getting started

OPUI ships first-class React 19 components. Install the package, import what you need, and you're set.

## Install via NPM

The components ship as uncompiled TypeScript (`.tsx` and `.ts`), so your build has to compile them. They need React 19 or later. Vite with `@vitejs/plugin-react` and Astro with `@astrojs/react` compile them as they are. In Next.js, add `transpilePackages: ["opui-css"]` to `next.config`.

`pnpm`

```sh
pnpm add opui-css open-props react react-dom -S
```

`npm`

```sh
npm install opui-css open-props react react-dom -S
```

## Import the CSS

React components ship markup only - the CSS still has to be imported once, in your root layout or the entry file that renders your app. Import everything:

```tsx
import "opui-css/css/imports.css"
```

Or pick and choose in a CSS file, and import that file in your entry instead:

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

```tsx
import "./styles/main.css"
```

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component.

## How to use

```tsx
import { Button } from "opui-css/react"

export default function App() {
  return <Button variant="filled">Click me</Button>
}
```

Containers take parts, such as `CardHeader` and `DialogActions`. Other slots are props: the default slot is `children` and named slots are camelCased, such as `endText`. Form controls take the native `value` or `defaultValue`, `checked` or `defaultChecked`, and `onChange` props.

[Concepts](https://open-props-ui.netlify.app/react/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/react/components.md). [Theming](https://open-props-ui.netlify.app/react/guide/theming.md) covers colors, density, motion and contrast.

## Server rendering

Components that need context, state or effects ([Anchor](https://open-props-ui.netlify.app/react/components/anchor.md), [Callout](https://open-props-ui.netlify.app/react/components/callout.md), [Dialog](https://open-props-ui.netlify.app/react/components/dialog.md), [Drawer](https://open-props-ui.netlify.app/react/components/drawer.md), [Field group](https://open-props-ui.netlify.app/react/components/form.md), [Tabs](https://open-props-ui.netlify.app/react/components/tabs.md), [Toggle group](https://open-props-ui.netlify.app/react/components/toggle.md), [Tooltip](https://open-props-ui.netlify.app/react/components/tooltip.md) and the form controls) are marked `"use client"`. The rest also render as React Server Components.

Without hydration (Astro with `@astrojs/react` and no `client:*` directive, or `renderToString` on its own), every component renders complete HTML. The native controls work and submit with their form. A few things only update on the client:

- [Checkbox](https://open-props-ui.netlify.app/react/components/checkbox.md#indeterminate) `indeterminate`: it's a DOM property, so the box looks unchecked. Or call `activateIndeterminate()` from `opui-css/css/js/checkbox.js`.
- [Range](https://open-props-ui.netlify.app/react/components/range.md#value) value: the `<output>` doesn't follow the thumb. The track fill is CSS, so it's fine.

Hydrate those (`client:load` in Astro) or render them on the client. Component pages say what needs hydration next to the browser support chips, and the API tables mark each prop with a crossed-out server icon.

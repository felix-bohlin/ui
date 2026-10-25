# Getting started

OPUI ships first-class Astro components. Install the package, import what you need, and you're set.

## Install via NPM

The components ship as uncompiled `.astro` files, which Astro compiles as they are. They need Astro 7 or later.

`pnpm`

```sh
pnpm add opui-css
```

`npm`

```sh
npm install opui-css
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
@import "opui-css/core/palette.css";
@import "opui-css/css/theme.css";
@import "opui-css/core/normalize.css";
@import "opui-css/css/components/button.css";
@import "opui-css/css/components/choice.css";
@import "opui-css/css/components/checkbox.css";
@import "opui-css/core/utils.css";
```

Import `layers.css` first and `utils.css` last, it holds `.ui-sr-only` and the motion classes. Add `choice.css` with `checkbox.css`, `radio.css` or `switch.css`. Import `opui-css/css/components.css` instead of single component files to get every component.

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

Containers take parts, such as `CardHeader` and `DialogActions`. Other components take named slots for rich content, such as `end-text` on a `TextField`.

[Concepts](https://open-props-ui.netlify.app/astro/guide/concepts.md) explains how props map to classes, the cascade layers and what needs JavaScript. Then browse the [components](https://open-props-ui.netlify.app/astro/components.md). [Theming](https://open-props-ui.netlify.app/astro/guide/theming.md) covers colors, density, motion and contrast.

## Server runtime

The components pass settings to their parts with `AsyncLocalStorage` from `node:async_hooks`, so they run on Node, Deno and Bun. On Cloudflare, enable the `nodejs_compat` compatibility flag.

### Ids

Components that link elements with ids (form fields, Tabs, Drawer, Menu) read `Astro.locals.$id` when it exists and otherwise generate a random id per render. For stable, per-request ids, useful for snapshot tests, define it in a middleware:

```ts
import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware((context, next) => {
  const counts = new Map<string, number>()
  context.locals.$id = (prefix) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
  return next()
})
```

Add `/// <reference types="opui-css/env.d.ts" />` to your `env.d.ts` to type `$id` and the `interestfor` attribute on `a` and `button`.

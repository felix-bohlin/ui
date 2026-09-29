# Anchor

A structural primitive to enable CSS Anchor Positioning on stuff.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```astro
---
import "opui-css/css/components/anchor.css"
import { Anchor } from "opui-css/astro"
---
```

[Full setup guide](https://open-props-ui.netlify.app/astro/guide/getting-started.md)

## Always Visible

Floating content that is always shown.

```astro
---
import { Anchor } from "opui-css/astro"
---


<Anchor>
  <button>Hover me</button>
  <span
    slot="anchored"
    style="background: var(--surface-2); padding: var(--size-2) var(--size-3); border-radius: var(--radius-2); box-shadow: var(--shadow-3);"
    >Floating content</span
  >
</Anchor>
```

## Hover Trigger

Set `trigger="hover"`. The component adds `interestfor` and `popover="hint"` declaratively.

Add `interestfor`, `commandfor`, and `command="toggle-popover"` to the anchor trigger so touch devices can tap to show the floating content.

```astro
---
import { Anchor, Button } from "opui-css/astro"
---


<Anchor trigger="hover" id="anchor-hover">
  <Button
    interestfor="anchor-hover"
    commandfor="anchor-hover"
    command="toggle-popover">Hover me</Button
  >
  <span slot="anchored"
    ><div class="ui-card ui-elevated">Tooltip content</div></span
  >
</Anchor>
```

## Used By

- [Badge](https://open-props-ui.netlify.app/astro/components/badge.md)
- [Tooltip](https://open-props-ui.netlify.app/astro/components/tooltip.md)

## API

| Prop        | Type                  | Default       | Description                                                                                                                |
| ----------- | --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `alignment` | `string`              | `"start end"` | Any valid `position-area` value. Controls where the floating content is placed.                                            |
| `trigger`   | `"always" \| "hover"` | `"always"`    | When set to `"hover"`, wraps the anchor slot in an`interestfor` invoker and uses `popover="hint"` on the floating element. |

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Full support Supported since v151.
- Safari: Partial support Missing: popover-hint.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/anchor.css`


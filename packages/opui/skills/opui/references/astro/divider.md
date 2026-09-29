# Divider

It's just a line.

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) for the full setup.

```astro
---
import "opui-css/css/components/divider.css"
import { Divider } from "opui-css/astro"
---
```

## Default

```astro
---
import { Divider } from "opui-css/astro"
---


This text is placed over
<Divider />
This text is placed under
```

## Variants

```astro
---
import { Divider } from "opui-css/astro"
---


Tonal
<Divider variant="tonal" />


Filled
<Divider variant="filled" />


Primary
<Divider variant="primary" />
```

## API

| Prop      | Type                               | Default | Description                        |
| --------- | ---------------------------------- | ------- | ---------------------------------- |
| `variant` | `"tonal" \| "filled" \| "primary"` | -       | The visual variant of the divider. |

## Source

- `opui-css/css/components/divider.css`


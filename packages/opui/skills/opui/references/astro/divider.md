# Divider

It's just a line.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```astro
---
import "opui-css/css/components/divider.css"
import { Divider } from "opui-css/astro"
---
```

[Full setup guide](https://open-props-ui.netlify.app/astro/guide/getting-started.md)

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


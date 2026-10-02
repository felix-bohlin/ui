# Divider

It's just a line.

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

### Divider API

| Prop      | Type                               | Default | Description         |
| --------- | ---------------------------------- | ------- | ------------------- |
| `variant` | `"tonal"`, `"primary"`, `"filled"` | -       | The variant to use. |

#### CSS variables

| Variable           | Default                                     | Description                                                           |
| ------------------ | ------------------------------------------- | --------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.           |
| `--primary`        | `var(--color-8)`                            | Brand color for primary actions and accents.                          |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                         |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Installation

- `opui-css/css/components/divider.css`


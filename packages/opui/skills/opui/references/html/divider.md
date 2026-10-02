# Divider

It's just a line.

## Default

```html
This text is placed over
<hr class="ui-divider" />
This text is placed under
```

## Variants

```html
Tonal
<hr class="ui-divider ui-border-tonal" />


Filled
<hr class="ui-divider ui-border-filled" />


Primary
<hr class="ui-divider ui-border-primary" />
```

## API

### Divider API

| Type     | Modifiers                                                     | Default | Description         |
| -------- | ------------------------------------------------------------- | ------- | ------------------- |
| Variants | `.ui-border-filled`, `.ui-border-primary`, `.ui-border-tonal` | -       | The variant to use. |

#### Parts

| Part            | Description       |
| --------------- | ----------------- |
| `hr.ui-divider` | The divider line. |

#### CSS variables

| Variable           | Default                                     | Description                                                           |
| ------------------ | ------------------------------------------- | --------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.           |
| `--primary`        | `var(--color-8)`                            | Brand color for primary actions and accents.                          |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                         |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Installation

- `opui-css/css/components/divider.css`


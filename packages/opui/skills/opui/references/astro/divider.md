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

| Variable           | Default                                      | Description                                                           |
| ------------------ | -------------------------------------------- | --------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.           |
| `--primary`        | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                          |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes. |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                         |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Element

   - `<hr>`: a thematic break, semantics included
   - The normalize removes its border, so you are now looking at nothing
   - Some would call this the purest divider

2. Height

   - It has a height now
   - You still can't see it
   - Trust the process

3. Paint

   - There it is
   - Please hold your applause

4. Breathe

   - Keeps the text from touching the line
   - Without it the divider still divides, just aggressively

5. Ship it

   - No JavaScript, no `:has()`, no anchor positioning
   - Drag **Excitement**: nothing reads it, and nothing changes
   - Coming in v3: a second line

Step 1 of 5: Element

- [\<hr>](https://webstatus.dev/features/hr) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 3+

```html
<p>Above the line</p>
<hr class="divider" />
<p>Below the line</p>
```

Step 2 of 5: Height

```css
.divider {
  block-size: 1px;
}
```

Step 3 of 5: Paint

- [`background-color`](https://webstatus.dev/features/background-color) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  background-color: var(--border-color);
}
```

Step 4 of 5: Breathe

- [Logical properties](https://webstatus.dev/features/logical-properties) (Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [`margin`](https://webstatus.dev/features/margin) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  margin-block: var(--size-fluid-3);
}
```

Step 5 of 5: Ship it

## Installation

- `opui-css/css/components/divider.css`


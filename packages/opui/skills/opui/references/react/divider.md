# Divider

It's just a line.

## Default

```tsx
import { Divider } from "opui-css/react"

export default function Default() {
  return (
    <>
      This text is placed over <Divider /> This text is placed under
    </>
  )
}
```

## Variants

Use the `variant` prop to change the line color.

```tsx
import { Divider } from "opui-css/react"

export default function Variants() {
  return (
    <>
      Tonal <Divider variant="tonal" /> Filled <Divider variant="filled" />{" "}
      Primary <Divider variant="primary" />
    </>
  )
}
```

## Content

Pass text or any element as children to place it in the middle of the line. The divider then renders a `<div>` instead of an `<hr>`, so screen readers read the content in order. Set `align` to `start` or `end` to move it to one side. The lines follow the `variant`.

```tsx
import { Button, Divider } from "opui-css/react"

export default function Content() {
  return (
    <>
      <Divider>or continue with email</Divider>

      <Divider align="start">Billing</Divider>

      <Divider align="end" variant="primary">
        Today
      </Divider>

      <Divider>
        <Button rounded size="small" variant="outlined">
          Show 12 more replies
        </Button>
      </Divider>
    </>
  )
}
```

## Spacing

The space above and below a divider is `--divider-space`. Cards, callouts, dialogs and drawers set a tighter value, and a divider that is a direct child of a card has no margin, since the card's gap already spaces it. Set `--divider-space` on any wrapper to change it for every divider inside.

```tsx
import { Card, CardContent, Divider } from "opui-css/react"

export default function Spacing() {
  return (
    <>
      <Card variant="outlined">
        <CardContent>Inside a card, the gap spaces the divider.</CardContent>
        <Divider />
        <CardContent>
          Nested deeper, it uses the card's tighter space. <Divider /> So
          everything stays close together.
        </CardContent>
      </Card>

      <div style={{ "--divider-space": "var(--size-1)" }}>
        A custom space on any wrapper <Divider /> reaches every divider inside
        it.
      </div>
    </>
  )
}
```

## API

### Divider API

| Prop       | Type                                 | Default    | Description                                                    |
| ---------- | ------------------------------------ | ---------- | -------------------------------------------------------------- |
| `align`    | `"center"` , `"start"` , `"end"`     | `"center"` | Where the content sits on the line.                            |
| `children` | `ReactNode`                          | -          | Optional content in the middle of the line. Renders a `<div>`. |
| `variant`  | `"tonal"` , `"primary"` , `"filled"` | -          | The variant to use.                                            |

#### CSS variables

| Variable           | Default                                          | Description                                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`   | `light-dark(var(--gray-4), var(--gray-12))`      | Default border color for cards, lists, tables and dividers.                                                                                                                                                           |
| `--divider-space`  | `calc(var(--size-fluid-3) * var(--space-scale))` | Block margin around a `Divider`, times `--space-scale`. Cards, callouts, dialogs and drawers set it to `--space-3`. A divider that is a direct child of a card has no margin, since the card's gap already spaces it. |
| `--primary`        | `light-dark(var(--color-9), var(--color-6))`     | Brand color for primary actions and accents.                                                                                                                                                                          |
| `--space-3`        | `calc(var(--size-3) * var(--space-scale))`       | Spacing step 3: Open Props `--size-3` times `--space-scale`.                                                                                                                                                          |
| `--surface-filled` | `light-dark(var(--gray-4), var(--gray-15))`      | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                 |
| `--surface-tonal`  | `light-dark(var(--gray-3), var(--gray-12))`      | Background of tonal variants.                                                                                                                                                                                         |
| `--text-muted`     | `light-dark(var(--gray-13), var(--gray-4))`      | Body text color.                                                                                                                                                                                                      |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property   | Kind  | Description                                                                                       |
| ---------- | ----- | ------------------------------------------------------------------------------------------------- |
| `--_color` | Input | The line color. Defaults to `--border-color`, `.ui-filled`, `.ui-primary` and `.ui-tonal` set it. |

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

- [\<hr> ](https://webstatus.dev/features/hr)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 3+

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

- [`background-color` ](https://webstatus.dev/features/background-color)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  background-color: var(--border-color);
}
```

Step 4 of 5: Breathe

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+
- [`margin` ](https://webstatus.dev/features/margin)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 1+

```css
.divider {
  margin-block: var(--size-fluid-3);
}
```

Step 5 of 5: Ship it

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Divider.md).

## Installation

Import the component from `opui-css/react`:

- `opui-css/css/components/divider.css`

## Changelog

### What's new

- [Spacing](#spacing) comes from `--divider-space`, which cards, callouts, dialogs and drawers make tighter.
- [Content](#content) in the middle of the line as children, aligned with `align`.

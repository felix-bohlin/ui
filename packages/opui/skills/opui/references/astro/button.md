# Button

## Variants

Change the button variant with the `variant` prop.

```astro
---
import { Button } from "opui-css/astro"
---


<div class="example-row">
  <Button>Text</Button>
  <Button disabled>Disabled</Button>
  <Button href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="outlined">Outlined</Button>
  <Button variant="outlined" disabled>Disabled</Button>
  <Button variant="outlined" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="tonal">Tonal</Button>
  <Button variant="tonal" disabled>Disabled</Button>
  <Button variant="tonal" href="#">Link</Button>
</div>
<div class="example-row">
  <Button variant="filled">Filled</Button>
  <Button variant="filled" disabled>Disabled</Button>
  <Button variant="filled" href="#">Link</Button>
</div>
```

## Colors

Pass `color` to apply a brand or destructive color: `primary` or `critical`. The default is a neutral gray.

```astro
---
import { Button } from "opui-css/astro"
---


<div class="example-row">
  <Button color="primary">Primary</Button>
  <Button color="primary" variant="outlined">Outlined</Button>
  <Button color="primary" variant="tonal">Tonal</Button>
  <Button color="primary" variant="filled">Filled</Button>
</div>
<div class="example-row">
  <Button color="critical">Critical</Button>
  <Button color="critical" variant="outlined">Outlined</Button>
  <Button color="critical" variant="tonal">Tonal</Button>
  <Button color="critical" variant="filled">Filled</Button>
</div>
```

## Buttons with icon and label

Include an icon alongside text by nesting it within the component. Wrap the label in a `<span>` to tighten the padding on the icon side.

```astro
---
import { Button } from "opui-css/astro"
---


<Button>
  <span>Text</span>
  <svg> <!-- --> </svg>
</Button>
<Button variant="outlined">
  <span>Outlined</span>
  <svg> <!-- --> </svg>
</Button>
<Button variant="tonal">
  <span>Tonal</span>
  <svg> <!-- --> </svg>
</Button>
<Button variant="filled">
  <span>Filled</span>
  <svg> <!-- --> </svg>
</Button>


<Button>
  <svg> <!-- --> </svg>
  <span>Text</span>
</Button>
<Button variant="outlined">
  <svg> <!-- --> </svg>
  <span>Outlined</span>
</Button>
<Button variant="tonal">
  <svg> <!-- --> </svg>
  <span>Tonal</span>
</Button>
<Button variant="filled">
  <svg> <!-- --> </svg>
  <span>Filled</span>
</Button>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```astro
---
import { Button } from "opui-css/astro"
---


<Button>
  Search <kbd>⌘K</kbd>
</Button>
<Button variant="outlined">
  Save <kbd>⌘S</kbd>
</Button>
<Button variant="tonal">
  Copy <kbd>⌘C</kbd>
</Button>
<Button variant="filled">
  Delete <kbd>⌘⌫</kbd>
</Button>
```

## Icon-only

A button whose only child is an `svg` is square. Give it an`aria-label`. See [Icon button](https://open-props-ui.netlify.app/astro/components/icon-button.md) for a round one.

## Sizes

Resize any button using the `size` prop.

```astro
---
import { Button } from "opui-css/astro"
---


<Button size="small">Small</Button>
<Button>Default</Button>
<Button size="large">Large</Button>


<Button variant="filled" size="small">Small</Button>
<Button variant="filled">Default</Button>
<Button variant="filled" size="large">Large</Button>


<Button size="small" variant="outlined">
  <span>Small</span>
  <svg> <!-- --> </svg>
</Button>
<Button variant="outlined">
  <span>Default</span>
  <svg> <!-- --> </svg>
</Button>
<Button variant="outlined" size="large">
  <span>Large</span>
  <svg> <!-- --> </svg>
</Button>
```

## Disabled

Disable the button with the `disabled` prop.

```astro
---
import { Button } from "opui-css/astro"
---


<Button disabled>Text</Button>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/astro/components/text-field.md#file) at least.

## Anatomy

1. Container
2. Label text (optional)
3. Icon (optional)

## API

| Prop       | Type                                | Default | Description                                         |
| ---------- | ----------------------------------- | ------- | --------------------------------------------------- |
| `size`     | `"small"`, `"large"`                | -       | The size of the button.                             |
| `variant`  | `"outlined"`, `"tonal"`, `"filled"` | -       | The visual variant of the button.                   |
| `color`    | `"critical"`, `"primary"`           | -       | The color of the button. Default is a neutral gray. |
| `href`     | `string`                            | -       | Renders as an `<a>` tag if an href is provided.     |
| `disabled` | `boolean`                           | -       | Button disabled state.                              |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

- `opui-css/css/components/button.css`


# Button

### What's new

- [Icon-only](#icon-only) buttons are square. `rounded` makes them round and `ripple` adds a hover halo.
- Replaces `IconButton`.
- Wrap the label in a `<span>` to [tighten the padding](#buttons-with-icon-and-label) next to an icon.
- Links with `aria-disabled="true"` look and act disabled.
- [Primary and critical](#colors) colors pass contrast in light and dark mode.
- Breaking: buttons render `type="button"` by default. Pass `type="submit"` for submit buttons.

## Anatomy

- `<Button>`

  Container element.

- `<svg>`

  An optional icon.

- `<span>`

  The label.

## Variants

Change the button variant with the `variant` prop.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Colors

Pass `color` to apply a brand or destructive color: `primary` or `critical`. The default is a neutral gray.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Buttons with icon and label

Include an icon alongside text by nesting it within the component. Always wrap the label in a `<span>`: it tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button>
    <span>Text</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined">
    <span>Outlined</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="tonal">
    <span>Tonal</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="filled">
    <span>Filled</span>
    <svg><!-- --></svg>
  </Button>


  <Button>
    <svg><!-- --></svg>
    <span>Text</span>
  </Button>
  <Button variant="outlined">
    <svg><!-- --></svg>
    <span>Outlined</span>
  </Button>
  <Button variant="tonal">
    <svg><!-- --></svg>
    <span>Tonal</span>
  </Button>
  <Button variant="filled">
    <svg><!-- --></svg>
    <span>Filled</span>
  </Button>
</template>
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button> Search <kbd>⌘K</kbd> </Button>
  <Button variant="outlined"> Save <kbd>⌘S</kbd> </Button>
  <Button variant="tonal"> Copy <kbd>⌘C</kbd> </Button>
  <Button variant="filled"> Delete <kbd>⌘⌫</kbd> </Button>
</template>
```

## Icon-only

A button whose only child is an `svg` is square. Give it an `aria-label`. Add `rounded` for a circle and `ripple` for a hover halo instead of a background change.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button aria-label="Edit">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
  <Button aria-label="Edit" rounded>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
  <Button aria-label="Edit" ripple rounded>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
  <Button aria-label="Edit" ripple rounded variant="tonal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
  <Button aria-label="Edit" color="primary" ripple rounded variant="filled">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
  <Button aria-label="Edit" ripple rounded size="small">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
      ></path>
    </svg>
  </Button>
</template>
```

## Sizes

Resize any button using the `size` prop.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button size="small">Small</Button>
  <Button>Default</Button>
  <Button size="large">Large</Button>


  <Button variant="filled" size="small">Small</Button>
  <Button variant="filled">Default</Button>
  <Button variant="filled" size="large">Large</Button>


  <Button size="small" variant="outlined">
    <span>Small</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined">
    <span>Default</span>
    <svg><!-- --></svg>
  </Button>
  <Button variant="outlined" size="large">
    <span>Large</span>
    <svg><!-- --></svg>
  </Button>
</template>
```

## Disabled

Disable the button with the `disabled` prop.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <Button disabled>Text</Button>
</template>
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/vue/components/text-field.md#file) at least.

## API

### Button API

| Prop       | Type                                | Default | Description                                                                 |
| ---------- | ----------------------------------- | ------- | --------------------------------------------------------------------------- |
| `as`       | `"button"`, `"a"`                   | -       | The element to render. Defaults to `"a"` with `href`, otherwise `"button"`. |
| `color`    | `"critical"`, `"primary"`           | -       | Optional colors.                                                            |
| `disabled` | `boolean`                           | `false` | Disables the button.                                                        |
| `href`     | `string`                            | -       | The link to use. Renders an `<a>`.                                          |
| `label`    | `string`                            | -       | The accessible name. Use it on icon-only buttons.                           |
| `ripple`   | `boolean`                           | `false` | A halo behind the button on hover instead of a background change.           |
| `rounded`  | `boolean`                           | `false` | Fully rounded corners, a circle when icon-only.                             |
| `size`     | `"x-small"`, `"small"`, `"large"`   | -       | The size of the element.                                                    |
| `variant`  | `"outlined"`, `"tonal"`, `"filled"` | -       | The variant to use.                                                         |

#### Slots

| Slot      | Description                     |
| --------- | ------------------------------- |
| `default` | The label and an optional icon. |

#### CSS variables

| Variable                      | Default                                                                               | Description                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--button-border-radius`      | `var(--size-2)`                                                                       | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                                               |
| `--button-size`               | `var(--control-size)`                                                                 | Default `Button` height.                                                                                                   |
| `--button-size-large`         | `var(--control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                          |
| `--button-size-small`         | `var(--control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                          |
| `--button-size-x-small`       | `var(--control-size-x-small)`                                                         | `Button` and `IconButton` height with `.ui-x-small`.                                                                       |
| `--critical`                  | `var(--red)`                                                                          | Severity color for errors and destructive actions.                                                                         |
| `--disabled-opacity`          | `0.64`                                                                                | Opacity applied to disabled controls.                                                                                      |
| `--duration`                  | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--duration-fast`             | `0.1s`                                                                                | Transition duration for hover and press feedback.                                                                          |
| `--ease`                      | `ease`                                                                                | Default easing for transitions.                                                                                            |
| `--font-size-05`              | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-bold`          | `var(--font-weight-7)`                                                                | Font weight for headings, buttons and terms.                                                                               |
| `--motion`                    | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`          | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on a `--primary` background.                                                                                    |
| `--state-active-alpha`        | `20%`                                                                                 | Alpha of the pressed state layer on neutral buttons in light mode.                                                         |
| `--state-active-alpha-accent` | `25%`                                                                                 | Alpha of the pressed state layer on primary and critical buttons.                                                          |
| `--state-active-alpha-dark`   | `30%`                                                                                 | Alpha of the pressed state layer on neutral buttons in dark mode.                                                          |
| `--state-hover-alpha`         | `10%`                                                                                 | Alpha of the hover state layer on neutral buttons in light mode.                                                           |
| `--state-hover-alpha-accent`  | `15%`                                                                                 | Alpha of the hover state layer on primary and critical buttons.                                                            |
| `--state-hover-alpha-dark`    | `20%`                                                                                 | Alpha of the hover state layer on neutral buttons in dark mode.                                                            |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`                                           | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                              |
| `--text-disabled`             | `color-mix( in oklch, var(--text-muted) 50%, var(--surface-default) )`                | Text color of disabled buttons and chips.                                                                                  |
| `--text-muted-contrast`       | `light-dark(var(--gray-4), var(--gray-13))`                                           | Muted text color on an inverted surface.                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

1. Base

   - Padding in `ex` so it scales with the font
   - One custom property per size, every size reuses the same rules

2. Icon-only

   - `:has(> svg:only-child)` spots an icon-only button
   - Square at every size: no `IconButton`, no extra class

3. Icon side

   - Tighter padding on the icon side balances the optical weight
   - Text nodes aren't elements, so the label needs a `<span>`

4. Ripple

   - `translateZ(-1px)` + `preserve-3d` puts the halo behind the button, no `z-index`
   - `clip-path: circle()` keeps the halo round
   - Hover the last button

Step 1 of 4: Base

```css
.button {
  align-items: center;
  background-color: var(--surface-tonal);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  color: var(--text-primary);
  display: inline-flex;
  gap: 1ex;
  min-block-size: var(--size);
  padding-inline: var(--padding-inline);
}


.button > svg {
  flex-shrink: 0;
  max-block-size: 1.25em;
}
```

Step 2 of 4: Icon-only

- [`:has()`](https://webstatus.dev/features/has) (Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  justify-content: center;
  min-inline-size: var(--size);
  padding-inline: 0;
}
```

Step 3 of 4: Icon side

```html
<button class="button">
  <svg>…</svg>
  <span>Download</span>
</button>
```

```css
.button:has(> svg:first-child + *) {
  padding-inline-start: calc(var(--padding-inline) * 0.75);
}


.button:has(> * + svg:last-child) {
  padding-inline-end: calc(var(--padding-inline) * 0.75);
}
```

Step 4 of 4: Ripple

```css
.ripple {
  --ripple-scale: 0.01;
  border-radius: 50%;
  position: relative;
  transform-style: preserve-3d;
}


.ripple::before {
  background-color: oklch(0.6 0 0 / 0.2);
  block-size: 130%;
  clip-path: circle(50%);
  content: "";
  inline-size: 130%;
  inset: 50% auto auto 50%;
  position: absolute;
  transform: translate(-50%, -50%) translateZ(-1px)
    scale(var(--ripple-scale));
  transition: transform 0.2s ease;
}


.ripple:hover {
  --ripple-scale: 1;
}


.ripple:hover:active {
  --ripple-scale: 1.1;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Button.md).

## Installation

- `opui-css/css/components/button.css`


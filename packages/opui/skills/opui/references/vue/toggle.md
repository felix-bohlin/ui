# Toggle

Buttons (disguised as input checkbox/radio) that can be toggled on and off. Use them for options in a toolbar, like bold or text alignment. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/vue/components/switch.md), and for choices in a form a [Checkbox](https://open-props-ui.netlify.app/vue/components/checkbox.md). To switch between panels of content, use [Tabs](https://open-props-ui.netlify.app/vue/components/tabs.md).

### What's new

- [Large](#sizes) size with `size="large"`.
- [Small and x-small](#sizes) toggles use smaller text, like `Button`.
- [Groups wrap](#overflow) when they don't fit, or scrolls with `scrollable` or truncates with `shrink`.

## Anatomy

Day Week Month

- `<ToggleGroup>`

  Container element.

- `<ToggleButton>`

  A toggle button.

## Toggle button

```vue
<script setup lang="ts">
import { ToggleButton } from "opui-css/vue"
</script>


<template>
  <ToggleButton name="standalone-demo-1">Toggle me</ToggleButton>
  <ToggleButton name="standalone-demo-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>
    Toggle with icon
  </ToggleButton>
</template>
```

## Toggle group

Group toggle buttons by wrapping them in a `ToggleGroup` component.

### Multi-select

Use `selection="multiple"` for multi-select groups.

```vue
<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>


<template>
  <ToggleGroup name="text-style">
    <ToggleButton value="bold" aria-label="Bold"
      ><strong>B</strong></ToggleButton
    >
    <ToggleButton value="italic" aria-label="Italic"><i>I</i></ToggleButton>
    <ToggleButton value="underline" aria-label="Underline"
      ><u>U</u></ToggleButton
    >
  </ToggleGroup>
</template>
```

### Single-select

Use `selection="single"` for single-select groups. Every button is a radio then, and a `type` on a button is ignored. Set `pressed` on the button that starts pressed.

```vue
<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>


<template>
  <ToggleGroup selection="single" name="alignment">
    <ToggleButton value="left" aria-label="Align left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
    <ToggleButton value="center" pressed aria-label="Align center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
    <ToggleButton value="right" aria-label="Align right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
  </ToggleGroup>
</template>
```

### Text + icon

```vue
<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>


<template>
  <ToggleGroup selection="single" name="transport">
    <ToggleButton value="walking" pressed>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"
        ></path>
      </svg>
      Walking
    </ToggleButton>
    <ToggleButton value="cycling">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"
        ></path>
      </svg>
      Cycling
    </ToggleButton>
    <ToggleButton value="commuting">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
        ></path>
      </svg>
      Commuting
    </ToggleButton>
  </ToggleGroup>
</template>
```

### Vertical orientation

Change the layout of the group with the `orientation="vertical"` prop.

```vue
<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>


<template>
  <ToggleGroup
    selection="single"
    name="alignment-vertical"
    orientation="vertical"
  >
    <ToggleButton value="left" aria-label="Align left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
    <ToggleButton value="center" pressed aria-label="Align center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
    <ToggleButton value="right" aria-label="Align right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
        ></path>
      </svg>
    </ToggleButton>
  </ToggleGroup>
</template>
```

### Sizes

Choose between four sizes with the `size` prop: `x-small`, `small`, default and `large`.

```vue
<script setup lang="ts">
import { ToggleButton } from "opui-css/vue"
</script>


<template>
  <ToggleButton size="x-small"> x-small </ToggleButton>
  <ToggleButton size="small"> small </ToggleButton>
  <ToggleButton> default </ToggleButton>
  <ToggleButton size="large"> large </ToggleButton>
</template>
```

### Overflow

Toggle buttons in a group wrap onto more rows when they don't fit. Use `scrollable` to keep them on one row and scroll them sideways, or `shrink` to keep them on one row and truncate their labels. Icon-only items keep their size.

```vue
<script setup lang="ts">
import { ToggleButton, ToggleGroup } from "opui-css/vue"
</script>


<template>
  <div style="display: grid; gap: var(--size-3); max-inline-size: 18rem">
    <ToggleGroup name="overflow-wrap">
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
    <ToggleGroup name="overflow-scrollable" scrollable>
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
    <ToggleGroup name="overflow-shrink" shrink>
      <ToggleButton value="all">Everything</ToggleButton>
      <ToggleButton value="mentions">Mentions</ToggleButton>
      <ToggleButton value="none">Nothing at all</ToggleButton>
    </ToggleGroup>
  </div>
</template>
```

## API

### Toggle group API

| Prop          | Type                                              | Default      | Description                                                                                                       |
| ------------- | ------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `name`        | `string`                                          | -            | The name shared by the inputs. Generated when omitted.                                                            |
| `orientation` | `"vertical"`                                      | -            | The orientation of the element.                                                                                   |
| `scrollable`  | `boolean`                                         | `false`      | Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.    |
| `selection`   | `"multiple"` , `"single"`                         | `"multiple"` | Whether one or several buttons can be selected. `"single"` uses radio inputs.                                     |
| `shrink`      | `boolean`                                         | `false`      | Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size. |
| `size`        | `"default"` , `"x-small"` , `"small"` , `"large"` | `"default"`  | The size of the buttons.                                                                                          |

#### Slots

| Slot      | Description         |
| --------- | ------------------- |
| `default` | The toggle buttons. |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                           |
| `--border-width`         | `1px`                                                                                 | Default border width for components that draw a border.                                               |
| `--button-border-radius` | `var(--size-2)`                                                                       | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                          |
| `--field-size`           | `var(--control-size)`                                                                 | Default field height.                                                                                 |
| `--field-size-large`     | `var(--control-size-large)`                                                           | Field height with `.ui-large`.                                                                        |
| `--field-size-small`     | `var(--control-size-small)`                                                           | Field height with `.ui-small`.                                                                        |
| `--field-size-x-small`   | `var(--control-size-x-small)`                                                         | Field height with `.ui-x-small`.                                                                      |
| `--focus-ring-color`     | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.       |
| `--focus-ring-offset`    | `2px`                                                                                 | Distance between a control and its focus ring.                                                        |
| `--focus-ring-style`     | `solid`                                                                               | Outline style of the focus ring.                                                                      |
| `--focus-ring-width`     | `2px`                                                                                 | Width of the focus ring.                                                                              |
| `--font-size-05`         | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--icon-size`            | `var(--size-4)`                                                                       | Default icon size inside components.                                                                  |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                          |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on a `--primary` background.                                                               |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                             |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                      |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Toggle button API

| Prop       | Type                                | Default      | Description                                                |
| ---------- | ----------------------------------- | ------------ | ---------------------------------------------------------- |
| `disabled` | `boolean`                           | `false`      | Disables the button.                                       |
| `id`       | `string`                            | -            | The id of the `<input>`. Generated when omitted.           |
| `label`    | `string`                            | -            | The input value when `value` is omitted.                   |
| `name`     | `string`                            | -            | The name of the input. Set by the group.                   |
| `pressed`  | `boolean`                           | `false`      | Selects the button.                                        |
| `size`     | `"x-small"` , `"small"` , `"large"` | -            | The size of the element.                                   |
| `type`     | `"checkbox"` , `"radio"`            | `"checkbox"` | The input type. `"radio"` allows one selection in a group. |
| `value`    | `string`                            | -            | The value of the input.                                    |

#### Slots

| Slot      | Description                     |
| --------- | ------------------------------- |
| `default` | The label and an optional icon. |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                           |
| `--border-width`         | `1px`                                                                                 | Default border width for components that draw a border.                                               |
| `--button-border-radius` | `var(--size-2)`                                                                       | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                          |
| `--field-size`           | `var(--control-size)`                                                                 | Default field height.                                                                                 |
| `--field-size-large`     | `var(--control-size-large)`                                                           | Field height with `.ui-large`.                                                                        |
| `--field-size-small`     | `var(--control-size-small)`                                                           | Field height with `.ui-small`.                                                                        |
| `--field-size-x-small`   | `var(--control-size-x-small)`                                                         | Field height with `.ui-x-small`.                                                                      |
| `--focus-ring-color`     | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.       |
| `--focus-ring-offset`    | `2px`                                                                                 | Distance between a control and its focus ring.                                                        |
| `--focus-ring-style`     | `solid`                                                                               | Outline style of the focus ring.                                                                      |
| `--focus-ring-width`     | `2px`                                                                                 | Width of the focus ring.                                                                              |
| `--font-size-05`         | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text. |
| `--icon-size`            | `var(--size-4)`                                                                       | Default icon size inside components.                                                                  |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                          |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on a `--primary` background.                                                               |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                      |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Under the hood

1. Label

   - A `<label>` wrapping a checkbox: click, keyboard and form value for free
   - The checkbox holds the state, no `aria-pressed` to keep in sync

2. Pressed

   - `:has(input:checked)`: the label styles itself from the checkbox state
   - Relative color turns `--primary` into a 25% tint
   - `light-dark()` picks the hover tint per color scheme

3. Hide input

   - Visually hidden, still focusable and announced
   - `:has(input:focus-visible)` draws an inset focus ring on the label
   - `Tab` to a toggle and press `Space`

4. Group

   - Radios with a shared `name`: single select, no JavaScript
   - Checkboxes for multi-select, with `role="group"`
   - Each toggle draws a divider on its start and top edge, the group clips the outer ones

Step 1 of 4: Label

```html
<label class="toggle">
  <input type="checkbox" />
  Bold
</label>
```

```css
.toggle {
  align-items: center;
  block-size: var(--field-size);
  border: 1px solid var(--border-color);
  border-radius: var(--button-border-radius);
  color: var(--text-primary);
  cursor: pointer;
  display: inline-flex;
  gap: var(--size-2);
  justify-content: center;
  min-inline-size: var(--field-size);
  padding: 0 var(--size-2);
  position: relative;
  user-select: none;
}
```

Step 2 of 4: Pressed

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.toggle {
  --bg: transparent;
  background-color: var(--bg);
}


.toggle:hover {
  --bg: light-dark(oklch(0% 0 0 / 0.04), oklch(100% 0 0 / 0.08));
}


.toggle:has(input:checked) {
  --bg: oklch(from var(--primary) l c h / 25%);
}
```

Step 3 of 4: Hide input

- [`:focus-visible` ](https://webstatus.dev/features/focus-visible)(Widely available): Chrome 86+, Edge 86+, Firefox 85+, Safari 15.4+

```css
.toggle input {
  block-size: 1px;
  clip-path: inset(50%);
  inline-size: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}


.toggle:has(input:focus-visible) {
  outline: 2px solid var(--text-muted);
  outline-offset: -6px;
}
```

Step 4 of 4: Group

```html
<div class="toggle-group" role="radiogroup">
  <label class="toggle">
    <input type="radio" name="view" checked />
    Day
  </label>
  …
</div>
```

```css
.toggle-group {
  background-color: var(--surface-default);
  border-radius: var(--button-border-radius);
  display: inline-flex;
  flex-wrap: wrap;
  outline: 1px solid var(--border-color);
  outline-offset: -1px;
  overflow: hidden;
}


.toggle-group .toggle {
  border: 0;
  border-radius: 0;
  box-shadow:
    -1px 0 0 0 var(--border-color),
    0 -1px 0 0 var(--border-color);
  flex: auto;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Toggle.md).

## Installation

- `opui-css/css/components/toggle-group.css`
- `opui-css/css/components/toggle-button.css`


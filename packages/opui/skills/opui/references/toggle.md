# Toggle

Toggle buttons and toggle groups switch options on and off, alone or as a set.

- CSS: `opui-css/css/components/toggle-group.css` and `opui-css/css/components/toggle-button.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/toggle.md), [Astro](https://open-props-ui.netlify.app/astro/components/toggle.md), [React](https://open-props-ui.netlify.app/react/components/toggle.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/toggle.md), [Vue](https://open-props-ui.netlify.app/vue/components/toggle.md).

## ToggleGroup

### Parts

- `.ui-toggle-group` (root): Container element.
- `.ui-toggle-button` (`ToggleButton`): A toggle button.

### Props and modifiers

- `defaultValue` (React): `string | string[]`. The starting selection when `value` is omitted.
- `multiple`: `boolean`, `[role="group"]`. Lets several buttons be checked, with checkbox inputs. Without it, one button is checked at a time, with radio inputs in a `[role="radiogroup"]`.
- `name`: `string`. The name shared by the inputs. Generated when omitted.
- `onValueChange` (React): `(value: string | string[]) => void`. Called with the new selection when a button is toggled.
- `orientation`: `"horizontal"` (default), `"vertical"` (`.ui-vertical`). The orientation of the element.
- `overflow`: `"scroll"` (`.ui-overflow-scroll`), `"shrink"` (`.ui-overflow-shrink`), `"wrap"` (default). What the items do when they don't fit. `"wrap"` wraps them onto more rows, `"scroll"` keeps them on one row and scrolls it sideways, and `"shrink"` keeps them on one row and truncates labels with an ellipsis. Icon-only items keep their size.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the buttons.
- `value` (React): `string | string[]`. The value of the checked button, or the values of the checked buttons with `multiple`.

### Slots

- `default`: The toggle buttons.

Model: `value` (`string | string[]`), the value of the checked button, or the values of the checked buttons with `multiple`. Astro and React `value`, Svelte `bind:value`, Vue `v-model`.

### Notes

- Astro: The selection lives in the inputs. Read it from the form, or listen for `change` in a script.
- React: Use `value` with `onValueChange`, or `defaultValue`. Without them the buttons keep their own state, and `onValueChange` still reports changes.
- Svelte: Bind `value` with a starting value to control the selection, `""` or `[]` for none. Without it, or bound to `undefined`, the buttons keep their own state.
- Vue: Bind `v-model` with a starting value to control the selection, `""` or `[]` for none. Without it, or bound to `undefined`, the buttons keep their own state.

## ToggleButton

### Parts

- `label.ui-toggle-button` (root): Container element.
- `<input>`: A visually hidden checkbox or radio input.

### Props and modifiers

- `checked`: `boolean`, `input[checked]`. Selects the button.
- `disabled`: `boolean`, `input[disabled]`. Disables the button.
- `id`: `string`. The id of the `<input>`.
- `label`: `string`. The button text when there is no child content.
- `name`: `string`. The name of the input. Set by the group.
- `required`: `boolean`. The form won't submit until it's checked. A `ToggleGroup` without `multiple` needs it on one button only.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `type`: `"checkbox"` (`input[type="checkbox"]`, default), `"radio"` (`input[type="radio"]`). The input type. `"radio"` allows one selection in a group. A `ToggleGroup` without `multiple` makes every button a radio.
- `value`: `string`. The value of the input.

### Slots

- `default`: The label and an optional icon.

Model: `checked` (`boolean`), the checked state of a standalone button. Astro and React `checked`, Svelte `bind:checked`, Vue `v-model`.

### Notes

- Astro: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`.
- React: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `className` and `style` go to the root `<label>`. `defaultChecked` sets the starting state, and `checked` with `onChange` controls it, like on any input. In a `ToggleGroup` with a `value` or `defaultValue`, the group's value wins and a button's own `checked` and `defaultChecked` are ignored.
- Svelte: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. `bind:checked` binds a standalone checkbox button. A radio fires no `change` when another one takes the check, so for a choice of one, use a `ToggleGroup` with `bind:value`. In a `ToggleGroup`, `checked` only sets the starting state: the group's value wins once it has one.
- Vue: Attributes that aren't props go to the `<input>`, like `autofocus` and `form`, and `class` and `style` go to the root `<label>`. `v-model` binds a standalone checkbox button. A radio fires no `change` when another one takes the check, so for a choice of one, use a `ToggleGroup` with `v-model`. In a `ToggleGroup`, `checked` only sets the starting state: the group's value wins once it has one.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### toggle-group.css

- `--_bg-color`: Background of the group. Defaults to `--ui-surface`.
- `--_border-color`: Color of the outline around the group and the lines between buttons. Defaults to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it.
- `--_radius`: Corner radius of the group. Defaults to `--ui-button-radius`, or `--ui-radius` when the theme doesn't set it, capped at half a button height so a round radius doesn't clip the end items.

### toggle-button.css

- `--_ease`: Easing of the focus ring animation. Defaults to `--ui-ease`.
- `--_font-size`: The font size. Defaults to `--ui-font-size-control`. Set by the size classes on the button or its group.
- `--_icon-size`: Size of a direct child `svg`. Defaults to `--ui-icon-size`.
- `--_motion`: Motion multiplier for the focus ring animation. `0` turns it off.
- `--_selected-bg-color`: Background of the checked button. `--ui-selected` when the theme sets it, otherwise `--ui-primary`.
- `--_size`: Height and minimum width. Defaults to `--ui-button-size`, set by the size classes on the button or its group.

Outputs: `--_bg-color` and `--_duration`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-button-radius`, `--ui-button-size`, `--ui-button-size-large`, `--ui-button-size-small`, `--ui-button-size-x-small`, `--ui-control-border-color`, `--ui-control-border-color-filled`, `--ui-disabled-opacity`, `--ui-duration`, `--ui-ease`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-caption`, `--ui-font-size-control`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-motion`, `--ui-on-primary`, `--ui-on-selected`, `--ui-primary`, `--ui-radius`, `--ui-selected`, `--ui-shadow-control`, `--ui-space-2`, `--ui-space-3`, `--ui-state-hover-alpha-dark`, `--ui-state-hover-alpha-light`, `--ui-surface`, `--ui-text-disabled` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Standalone

```html
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-1" />
  Toggle me
</label>
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-2" />
  <svg
    aria-hidden="true"
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
</label>
```

## Astro

`import { ToggleButton, ToggleGroup } from "opui-css/astro"`

### Example: Standalone

```astro
---
import { ToggleButton } from "opui-css/astro"
---

<ToggleButton label="Toggle me" name="standalone-demo-1" />
<ToggleButton name="standalone-demo-2">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path><path d="M12 8v4"
    ></path><path d="M12 16h.01"></path></svg
  >
  Toggle with icon
</ToggleButton>
```

## React

`import { ToggleButton, ToggleGroup } from "opui-css/react"`

- Client components (`"use client"`): `ToggleGroup` and `ToggleButton`.

### Example: Standalone

```tsx
import { ToggleButton } from "opui-css/react"

export default function Standalone() {
  return (
    <>
      <ToggleButton label="Toggle me" name="standalone-demo-1" />
      <ToggleButton name="standalone-demo-2">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
        Toggle with icon
      </ToggleButton>
    </>
  )
}
```

## Svelte

`import { ToggleButton, ToggleGroup } from "opui-css/svelte"`

- Hydration: `bind:value` on `ToggleGroup` and `bind:checked` on `ToggleButton`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Standalone

```svelte
<script lang="ts">
  import { ToggleButton } from "opui-css/svelte"
</script>

<ToggleButton label="Toggle me" name="standalone-demo-1" />
<ToggleButton name="standalone-demo-2">
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
  Toggle with icon
</ToggleButton>
```

## Vue

`import { ToggleButton, ToggleGroup } from "opui-css/vue"`

- Hydration: `v-model` on `ToggleGroup` and `ToggleButton`. The bound value only updates on the client. The native control still changes and submits with its form. Without hydration: Read the value from the form instead.

### Example: Standalone

```vue
<script setup lang="ts">
import { ToggleButton } from "opui-css/vue"
</script>

<template>
  <ToggleButton label="Toggle me" name="standalone-demo-1" />
  <ToggleButton name="standalone-demo-2">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
    Toggle with icon
  </ToggleButton>
</template>
```

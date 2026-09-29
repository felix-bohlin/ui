# Chip

Chips are compact elements that represent an input, attribute, or action.

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md) for the full setup.

```vue
<script setup lang="ts">
import "opui-css/css/components/chip.css"
import { Chip } from "opui-css/vue"
</script>
```

## Variants

The Chip has two variants: `tonal` (default) and `outlined`.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>


<template>
  <Chip variant="tonal" label="Tonal" />
  <Chip variant="outlined" label="Outlined" />
</template>
```

## Icon

The icon can be placed before or after the text using the`start` and `end` slots.

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>


<template>
  <Chip variant="tonal">
    <template #start
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
        ></path></svg
    ></template>
    <span class="ui-text">Tonal</span>
  </Chip>
  <Chip variant="outlined">
    <span class="ui-text">Outlined</span>
    <template #end
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
        ></path></svg
    ></template>
  </Chip>
</template>
```

## Button

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Chip as="button" variant="tonal" label="Tonal button" />
    <Chip as="button" variant="outlined" label="Outlined button" />
  </div>
  <div class="example-row">
    <Chip as="button" variant="tonal">
      <template #start
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"
          ></path></svg
      ></template>
      <span class="ui-text">Open now</span>
    </Chip>
    <Chip as="button" variant="outlined">
      <span class="ui-text">Sort by</span>
      <template #end
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M5.366 11.116a1.25 1.25 0 0 1 1.768 0L16 19.982l8.866-8.866a1.25 1.25 0 0 1 1.768 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0l-9.75-9.75a1.25 1.25 0 0 1 0-1.768"
          ></path></svg
      ></template>
    </Chip>
  </div>
</template>
```

## Link

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>


<template>
  <Chip as="a" href="#" variant="tonal" label="Tonal link" />
  <Chip as="a" href="#" variant="outlined">
    <span class="ui-text">Outlined link</span>
    <template #end
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M7.75 5.5A2.25 2.25 0 0 0 5.5 7.75v16.5a2.25 2.25 0 0 0 2.25 2.25h16.5a2.25 2.25 0 0 0 2.25-2.25v-5a1.25 1.25 0 1 1 2.5 0v5A4.75 4.75 0 0 1 24.25 29H7.75A4.75 4.75 0 0 1 3 24.25V7.75A4.75 4.75 0 0 1 7.75 3h5a1.25 1.25 0 1 1 0 2.5zM18 4.25c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5a1.25 1.25 0 1 1-2.5 0V7.268l-6.366 6.366a1.25 1.25 0 1 1-1.768-1.768L24.732 5.5H19.25c-.69 0-1.25-.56-1.25-1.25"
        ></path></svg
    ></template>
  </Chip>
</template>
```

## Sizes

```vue
<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>


<template>
  <Chip size="small" label="Small" />
  <Chip label="Default" />
  <Chip
    multiline
    style="max-width: 30ch"
    label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales."
  />
</template>
```

## Anatomy

1\. Container: `<Chip>` (renders as `div`, `a` or `button`)\
2\. Text: `label` prop or `default slot`\
3\. Icon (optional): `<svg>` element in the `start` or `end` slot

## API

| Prop        | Type                       | Default                              | Description                  |
| ----------- | -------------------------- | ------------------------------------ | ---------------------------- |
| `as`        | `"div" \| "a" \| "button"` | `"div"` (or `"a"` if `href` present) | The underlying HTML element. |
| `label`     | `string`                   | -                                    | The text label to display.   |
| `multiline` | `boolean`                  | `false`                              | Allows multiline text.       |
| `size`      | `"small"`                  | -                                    | The size of the chip.        |
| `variant`   | `"tonal" \| "outlined"`    | `"tonal"`                            | The visual variant.          |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

- `opui-css/css/components/chip.css`


# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/vue/components/progress.md).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/spinner.css"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

```vue
<template>
  <div aria-busy="true"></div>
</template>
```

## Sizes

The spinner's size is set to `1em`, which means it will adjust to its current font size.

```vue
<template>
  <h2 aria-busy="true">h2</h2>
  <h4 aria-busy="true">h4</h4>
  <p aria-busy="true">Paragraph</p>
  <span aria-busy="true">Span</span>
  <a href="#sizes" aria-busy="true" class="ui-link">Link</a>
</template>
```

## Buttons

Simply add `aria-busy="true"` to a `<button>`.

```vue
<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Button aria-busy="true">Text</Button>
    <Button aria-busy="true" disabled variant="outlined"> Outlined </Button>
    <Button aria-busy="true" variant="filled">Filled</Button>
  </div>


  <div class="example-row">
    <Button aria-busy="true">
      <span class="ui-sr-only">Text</span>
    </Button>
    <Button aria-busy="true" disabled variant="outlined">
      <span class="ui-sr-only">Outlined</span>
    </Button>
    <Button aria-busy="true" variant="filled">
      <span class="ui-sr-only">Filled</span>
    </Button>
  </div>
</template>
```

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

In conjunction with the `<progress>` element `aria-busy="true"` is used on the section that is being updated. Rendering a spinner here would result in a spinner *and* a progress bar which doesn't make sense.

See [progress accessibility](https://open-props-ui.netlify.app/vue/components/progress.md#accessibility) section for more.

### 2. Because it doesn't make sense

- `<input>`
- `<select>`
- `<textarea>`
- `<html>`
- `<progress>`

## API

| Prop        | Type                                                                                          | Default | Description                                                         |
| ----------- | --------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| `aria-busy` | `"true"`, `"false"`, `boolean`                                                                | -       | Set on any element to show a spinner. CSS-only; no Astro component. |
| Sizes       | `font-size`                                                                                   | `1em`   | Spinner size follows the element's computed font size.              |
| Excluded    | `<input>`, `<select>`, `<textarea>`, `<html>`, `<progress>`, elements with `aria-describedby` | -       | Elements that never receive a spinner.                              |

## Source

- `opui-css/css/components/spinner.css`


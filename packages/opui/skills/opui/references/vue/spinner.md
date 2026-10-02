# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/vue/components/progress.md).

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
  <h3 aria-busy="true">h3</h3>
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

| Type  | Modifiers   | Default | Description                                            |
| ----- | ----------- | ------- | ------------------------------------------------------ |
| Sizes | `font-size` | `1em`   | Spinner size follows the element's computed font size. |

### Parts

| Part                 | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `[aria-busy="true"]` | Renders a spinner pseudo-element on the element. Always indeterminate. |

Elements that never receive a spinner: `<input>`, `<select>`, `<textarea>`, `<html>`, `<progress>`, elements with `aria-describedby`.

Set `aria-busy` on any element to show a spinner. CSS-only; no Vue component.

## Under the hood

1. Ring

   - The state is the API: `aria-busy="true"`, no class
   - `:not(…)` skips form fields, `<progress>` and sections described by a progress bar
   - One transparent border side makes the gap in the ring
   - `1em` sizes it from the font: drag **Font size**

2. Spin

   - `rotate(1turn)` in a `linear`, `infinite` loop
   - Always indeterminate: nothing to track, nothing to update

3. Gap

   - `:not(:empty)`: only a spinner next to text gets a gap
   - `0.5em` scales with the font, like the ring
   - The library also skips `.ui-button`, which has its own `gap`

Step 1 of 3: Ring

- [`::before and ::after`](https://webstatus.dev/features/before-after) (Widely available): Chrome 1+, Edge 12+, Firefox 1.5+, Safari 4+
- [`:not()`](https://webstatus.dev/features/not) (Widely available): Chrome 88+, Edge 88+, Firefox 84+, Safari 9+

```html
<p aria-busy="true">Loading results</p>
```

```css
[aria-busy="true"]:not(
  input,
  select,
  textarea,
  html,
  progress,
  [aria-describedby]
) {
  &::before {
    block-size: 1em;
    border-color: transparent currentColor currentColor;
    border-radius: 50%;
    border-style: solid;
    border-width: 3px;
    content: "";
    display: inline-block;
    inline-size: 1em;
    opacity: 0.5;
    vertical-align: -0.14em;
  }
}
```

Step 2 of 3: Spin

- [`Animations (CSS)`](https://webstatus.dev/features/animations-css) (Widely available): Chrome 43+, Edge 12+, Firefox 16+, Safari 9+
- [2D transforms](https://webstatus.dev/features/transforms2d) (Widely available): Chrome 36+, Edge 12+, Firefox 16+, Safari 9+

```css
[aria-busy="true"]::before {
  animation: build-spinner-spin 0.7s linear infinite;
}
```

Step 3 of 3: Gap

- [`:empty`](https://webstatus.dev/features/empty) (Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 3.1+
- [Logical properties](https://webstatus.dev/features/logical-properties) (Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
[aria-busy="true"]:not(:empty)::before {
  margin-inline-end: 0.5em;
}
```

## Installation

- `opui-css/css/components/spinner.css`


# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/astro/components/progress.md).

```astro
<div aria-busy="true"></div>
```

## Sizes

The spinner's size is set to `1em`, which means it will adjust to its current font size.

```astro
<h2 aria-busy="true">h2</h2>
<h3 aria-busy="true">h3</h3>
<p aria-busy="true">Paragraph</p>
<span aria-busy="true">Span</span>
<a href="#sizes" aria-busy="true" class="ui-link">Link</a>
```

## Buttons

Simply add `aria-busy="true"` to a `<button>`.

```astro
---
import { Button } from "opui-css/astro"
---


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
```

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

In conjunction with the `<progress>` element `aria-busy="true"` is used on the section that is being updated. Rendering a spinner here would result in a spinner *and* a progress bar which doesn't make sense.

See [progress accessibility](https://open-props-ui.netlify.app/astro/components/progress.md#accessibility) section for more.

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

## Installation

- `opui-css/css/components/spinner.css`


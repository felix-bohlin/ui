# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/html/components/progress.md).

```html
<div aria-busy="true"></div>
```

## Sizes

The spinner's size is set to `1em`, which means it will adjust to its current font size.

```html
<h2 aria-busy="true">h2</h2>
<h3 aria-busy="true">h3</h3>
<p aria-busy="true">Paragraph</p>
<span aria-busy="true">Span</span>
<a href="#sizes" aria-busy="true" class="ui-link">Link</a>
```

## Buttons

Simply add `aria-busy="true"` to a `<button>`.

```html
<!-- Text buttons -->
<div class="example-row">
  <button aria-busy="true" class="ui-button">Text</button>
  <button aria-busy="true" disabled class="ui-button ui-outlined">
    Outlined
  </button>
  <button aria-busy="true" class="ui-button ui-filled">Filled</button>
</div>


<!-- Icon buttons -->
<div class="example-row">
  <button aria-busy="true" class="ui-button">
    <span class="ui-sr-only">Text</span>
  </button>
  <button aria-busy="true" disabled class="ui-button ui-outlined">
    <span class="ui-sr-only">Outlined</span>
  </button>
  <button aria-busy="true" class="ui-button ui-filled">
    <span class="ui-sr-only">Filled</span>
  </button>
</div>
```

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

In conjunction with the `<progress>` element `aria-busy="true"` is used on the section that is being updated. Rendering a spinner here would result in a spinner *and* a progress bar which doesn't make sense.

See [progress accessibility](https://open-props-ui.netlify.app/html/components/progress.md#accessibility) section for more.

### 2. Because it doesn't make sense

- `<input>`
- `<select>`
- `<textarea>`
- `<html>`
- `<progress>`

## API

| Type     | Modifiers                                                                                     | Default | Description                                                            |
| -------- | --------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| State    | `aria-busy="true"`                                                                            | -       | Renders a spinner pseudo-element on the element. Always indeterminate. |
| Sizes    | `font-size` on the element                                                                    | `1em`   | Spinner size follows the element's computed font size.                 |
| Excluded | `<input>`, `<select>`, `<textarea>`, `<html>`, `<progress>`, elements with `aria-describedby` | -       | Elements that never receive a spinner.                                 |

## Installation

- `opui-css/css/components/spinner.css`


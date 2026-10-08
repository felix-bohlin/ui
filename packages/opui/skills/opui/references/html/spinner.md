# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/html/components/progress.md).

## Basics

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
  <button type="button" aria-busy="true" class="ui-button">Text</button>
  <button type="button" aria-busy="true" disabled class="ui-button ui-outlined">
    Outlined
  </button>
  <button type="button" aria-busy="true" class="ui-button ui-filled">
    Filled
  </button>
</div>


<!-- Icon buttons -->
<div class="example-row">
  <button type="button" aria-busy="true" class="ui-button">
    <span class="ui-sr-only">Text</span>
  </button>
  <button type="button" aria-busy="true" disabled class="ui-button ui-outlined">
    <span class="ui-sr-only">Outlined</span>
  </button>
  <button type="button" aria-busy="true" class="ui-button ui-filled">
    <span class="ui-sr-only">Filled</span>
  </button>
</div>
```

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

A section that's being updated points at its progress bar with `aria-describedby` while `aria-busy="true"` marks it as busy. Busy elements with `aria-describedby` get no spinner, so you don't see a spinner *and* a progress bar. Buttons and links always get one.

See [progress accessibility](https://open-props-ui.netlify.app/html/components/progress.md#accessibility) section for more.

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

### CSS variables

| Variable   | Default | Description                                                                                                                                                                                              |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--motion` | `1`     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Elements that never receive a spinner: `<input>`, `<select>`, `<textarea>`, `<html>`, `<progress>`, and elements with `aria-describedby` other than buttons and links.

## Under the hood

Read the post: [Spinners from aria-busy](https://open-props-ui.netlify.app/learn/spinner-aria-busy)

1. Ring

   - The state is the API: `aria-busy="true"`, no class
   - `:not(…)` skips form fields, `<progress>` and sections described by a progress bar, but never buttons or links
   - One transparent border side makes the gap in the ring
   - `1em` sizes it from the font: drag **Font size**

2. Spin

   - `rotate(1turn)` in a `linear`, `infinite` loop
   - Always indeterminate: nothing to track, nothing to update

3. Gap

   - `:not(:empty)`: only a spinner next to text gets a gap
   - `0.5em` scales with the font, like the ring
   - The library also skips `.ui-button`, which has its own `gap`

4. Reduced motion

   - `--motion` is `0` under reduced motion and with `.ui-motion-off`
   - Slower, not stopped: a frozen spinner looks like a broken page
   - `max()` gives `0.7s` at `1`, `1.5s` at `0`, and never `0s`
   - This step sets `--motion: 0` on the demo

Step 1 of 4: Ring

- [`::before and ::after` ](https://webstatus.dev/features/before-after)(Widely available): Chrome 1+, Edge 12+, Firefox 1.5+, Safari 4+
- [`:not()` ](https://webstatus.dev/features/not)(Widely available): Chrome 88+, Edge 88+, Firefox 84+, Safari 9+

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
  [aria-describedby]:not(button, a)
) {
  &::before {
    block-size: 1em;
    border-block-color: transparent currentColor;
    border-inline-color: currentColor;
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

Step 2 of 4: Spin

- [`Animations (CSS)` ](https://webstatus.dev/features/animations-css)(Widely available): Chrome 43+, Edge 12+, Firefox 16+, Safari 9+
- [2D transforms ](https://webstatus.dev/features/transforms2d)(Widely available): Chrome 36+, Edge 12+, Firefox 16+, Safari 9+

```css
[aria-busy="true"]::before {
  animation: build-spinner-spin 0.7s linear infinite;
}
```

Step 3 of 4: Gap

- [`:empty` ](https://webstatus.dev/features/empty)(Widely available): Chrome 1+, Edge 12+, Firefox 1+, Safari 3.1+
- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```css
[aria-busy="true"]:not(:empty)::before {
  margin-inline-end: 0.5em;
}
```

Step 4 of 4: Reduced motion

- [`min(), max(), and clamp()` ](https://webstatus.dev/features/min-max-clamp)(Widely available): Chrome 79+, Edge 79+, Firefox 75+, Safari 13.1+

```css
.demo {
  --motion: 0;
}


[aria-busy="true"]::before {
  animation-duration: max(
    0.7s * var(--motion, 1),
    1.5s - 0.8s * var(--motion, 1)
  );
}
```

## Installation

- `opui-css/css/components/spinner.css`

## Changelog

### What's new

- Busy buttons and links with `aria-describedby` [get a spinner](#blocked-by-another-use-case) now.

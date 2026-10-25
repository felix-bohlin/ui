# Spinner

Add it to an element with `aria-busy="true"`. Spinners are always indeterminate. See also: [Progress bar](https://open-props-ui.netlify.app/astro/components/progress.md).

## Basics

`aria-busy` doesn't announce anything. Say what's happening in text, like "Loading…" in the busy element or in a `role="status"` element.

```astro
<div aria-busy="true">Loading…</div>
```

## Sizes

The spinner's size is set to `1em`, which means it will adjust to its current font size.

```astro
<span aria-busy="true">Span</span>
<a href="#sizes" aria-busy="true" class="ui-link">Link</a>
<p aria-busy="true">Paragraph</p>
<p class="ui-h3" aria-busy="true">Heading 3</p>
<p class="ui-h2" aria-busy="true">Heading 2</p>
```

## Buttons

Simply add `aria-busy="true"` to a `<button>`.

```astro
---
import { Button } from "opui-css/astro"
---

<div class="example-row">
  <Button aria-busy="true" variant="filled">Filled</Button>
  <Button aria-busy="true" disabled variant="outlined"> Outlined </Button>
  <Button aria-busy="true">Text</Button>
</div>

<div class="example-row">
  <Button aria-busy="true" variant="filled">
    <span class="ui-sr-only">Filled</span>
  </Button>
  <Button aria-busy="true" disabled variant="outlined">
    <span class="ui-sr-only">Outlined</span>
  </Button>
  <Button aria-busy="true">
    <span class="ui-sr-only">Text</span>
  </Button>
</div>
```

## When not to use `aria-busy="true"`

There are a few exceptions where `aria-busy="true"` won't render a spinner. Either because it doesn't make sense or because there are other reasons you would like to use that aria attribute.

### 1. Because it's blocked by another use case

A section that's being updated points at its progress bar with `aria-describedby` while `aria-busy="true"` marks it as busy. Busy elements with `aria-describedby` get no spinner, so you don't see a spinner *and* a progress bar. Buttons and links always get one.

See [progress accessibility](https://open-props-ui.netlify.app/astro/components/progress.md#accessibility) section for more.

### 2. Because it doesn't make sense

- `<html>`
- `<input>`
- `<progress>`
- `<select>`
- `<textarea>`

## API

### Spinner API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Sizes | `font-size` | `1em` | Spinner size follows the element's computed font size. |

#### Parts

| Part | Description |
| --- | --- |
| `[aria-busy="true"]` | Renders a spinner pseudo-element on the element. Always indeterminate. |

These never show a spinner: `<html>`, `<input>`, `<progress>`, `<select>` and `<textarea>`. Neither do elements with `aria-describedby`, except buttons and links.

Set `aria-busy="true"` on any element to show a spinner. There is no Astro component.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/astro/guide/theming.md#motion). |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/astro/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_motion` | Input | Motion multiplier for the spin. `0` slows it down instead of stopping it. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md).

- `opui-css/css/components/spinner.css`

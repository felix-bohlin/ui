# Progress

See also: [Spinner](https://open-props-ui.netlify.app/html/components/spinner.md).

**Quick start.** Run `npm install opui-css open-props` and import the styles, or copy the [source](#installation) further down. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md) for the CDN link and full setup.

```css
@import "opui-css/css/components/progress.css";
```

## Indeterminate

```html
<div class="ui-progress">
  <progress aria-busy="true"></progress>
</div>
```

## Determinate

```html
<div class="ui-progress">
  <progress value="10" max="100"></progress>
</div>
```

## Variants

Use the modifier classes `.ui-filled`, `.ui-default`, or`.ui-tonal` on the wrapper `<div>` to swap the progress bar track surface for better contrast on different backgrounds.

```html
<div class="ui-progress ui-default">
  <progress value="25" max="100"></progress>
</div>
<div class="ui-progress ui-filled">
  <progress value="50" max="100"></progress>
</div>
<div class="ui-progress ui-tonal">
  <progress value="75" max="100"></progress>
</div>
```

## Accessibility

If the `<progress>` element is describing the loading progress of a section of a page:

- use `aria-describedby` to point to the status
- set `aria-busy="true"` on the section that is being updated, removing it when loading is finished.

Source: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#accessibility)

```html
<div aria-busy="true" aria-describedby="progress-bar">
  Content here is loading.
</div>
<div class="ui-progress">
  <progress aria-label="Content loading…" id="progress-bar"></progress>
</div>
```

## API

| Type              | Modifiers                                               | Default | Description                                                     |
| ----------------- | ------------------------------------------------------- | ------- | --------------------------------------------------------------- |
| **Progress**      | `<div class="ui-progress"><progress>…</progress></div>` | -       | Wrapper div with the native HTML progress element inside.       |
| **Indeterminate** | No `value` attribute                                    | -       | Display an indeterminate loading state.                         |
| **Variant**       | `.ui-filled`, `.ui-default`, `.ui-tonal`                | -       | Modifiers on the wrapper div for different background surfaces. |

## Source

- `opui-css/css/components/progress.css`


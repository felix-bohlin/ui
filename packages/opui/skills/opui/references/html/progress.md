# Progress

See also: [Spinner](https://open-props-ui.netlify.app/html/components/spinner.md).

## Indeterminate

```html
<div class="ui-progress">
  <progress aria-busy="true"></progress>
</div>
```

## Determinate

```html
<div class="ui-progress">
  <progress id="determinate-progress" value="10" max="100"></progress>
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
  <progress id="progress-bar" aria-label="Content loading…"></progress>
</div>
```

## API

### Progress API

| Type     | Modifiers                                | Default | Description                                            |
| -------- | ---------------------------------------- | ------- | ------------------------------------------------------ |
| Value    | `progress[value]`                        | -       | The current value. Omit it for an indeterminate state. |
| Variants | `.ui-default`, `.ui-filled`, `.ui-tonal` | -       | The variant to use.                                    |

#### Parts

| Part           | Description        |
| -------------- | ------------------ |
| `.ui-progress` | Container element. |
| `<progress>`   | The progress bar.  |

## Installation

- `opui-css/css/components/progress.css`


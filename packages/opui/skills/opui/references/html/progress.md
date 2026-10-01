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

#### CSS variables

| Variable            | Default                                     | Description                                                                                                                |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-radius`   | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions.                                                          |
| `--duration`        | `0.2s`                                      | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease-enter`      | `var(--ease-out-3)`                         | Easing for elements entering the screen.                                                                                   |
| `--motion`          | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`         | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default` | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`  | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`   | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Progress.md).

## Installation

- `opui-css/css/components/progress.css`


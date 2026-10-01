# Range

## Anatomy

Label50Start textEnd text

- `label.ui-range`

  Container element.

- `.ui-label`

  The label for the range.

- `<output>`

  Shows the current value, with an optional `valueSuffix`.

- `.ui-start-text`

  Description text displayed above the input.

- `<input>`

  The range input.

- `.ui-end-text`

  Supporting text displayed below the input.

```html
<label class="ui-range">
  <span class="ui-label" id="range-default-1-label">Label</span>
  <span class="ui-start-text" id="range-default-1-start-text">Min</span>
  <input
    aria-describedby="range-default-1-start-text"
    aria-labelledby="range-default-1-label"
    type="range"
  />
</label>
```

## Start text & End text

```html
<label class="ui-range">
  <span class="ui-label" id="range-start-end-1-label">Label</span>
  <span class="ui-start-text" id="range-start-end-1-start-text"
    >Start helper text</span
  >
  <input
    aria-describedby="range-start-end-1-start-text range-start-end-1-end-text"
    aria-labelledby="range-start-end-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-start-end-1-end-text"
    >End helper text</span
  >
</label>
```

## Value

Add an `<output class="ui-value">` sibling to the`.ui-label` with `for` pointing at the input's id. Optionally set `data-suffix` for a unit (e.g. `°`,`px`). Updating its text content is the consumer's responsibility.

```html
<label class="ui-range">
  <span class="ui-label" id="range-value-1-label">Hue</span>
  <output class="ui-value" for="hueRange" data-suffix="°">250°</output>
  <input
    aria-labelledby="range-value-1-label"
    type="range"
    id="hueRange"
    min="0"
    max="360"
    value="250"
  />
</label>
```

## Tick marks

Use the `list` attribute on the `<input>` and follow it with a `<datalist>` element containing`<option>` elements with `value` and`label` attributes.

```html
<label class="ui-range">
  <span class="ui-label" id="range-tick-marks-1-label"
    >Tick marks with labels</span
  >
  <input
    aria-labelledby="range-tick-marks-1-label"
    list="labeled-markers"
    type="range"
  />
  <datalist id="labeled-markers">
    <option value="0" label="0%"></option>
    <option value="25" label="25%"></option>
    <option value="50" label="50%"></option>
    <option value="75" label="75%"></option>
    <option value="100" label="100%"></option>
  </datalist>
</label>
```

## Variants

Use the `.ui-filled`, `.ui-default`, or `.ui-tonal`class to swap the track surface for better contrast on different backgrounds.

```html
<label class="ui-range">
  <span class="ui-label" id="range-surfaces-1-label">Default</span>
  <input aria-labelledby="range-surfaces-1-label" type="range" />
</label>
<label class="ui-range ui-default">
  <span class="ui-label" id="range-surfaces-2-label"
    ><code>default</code> = <code>var(--surface-default)</code></span
  >
  <input aria-labelledby="range-surfaces-2-label" type="range" />
</label>
<label class="ui-range ui-filled">
  <span class="ui-label" id="range-surfaces-3-label"
    ><code>filled</code> = <code>var(--surface-filled)</code></span
  >
  <input aria-labelledby="range-surfaces-3-label" type="range" />
</label>
<label class="ui-range ui-tonal">
  <span class="ui-label" id="range-surfaces-4-label"
    ><code>tonal</code> = <code>var(--surface-tonal)</code></span
  >
  <input aria-labelledby="range-surfaces-4-label" type="range" />
</label>
```

## Disabled

```html
<label class="ui-range">
  <span class="ui-label" id="range-disabled-1-label">Disabled</span>
  <input aria-labelledby="range-disabled-1-label" type="range" disabled />
</label>
```

## Validation

```html
<label class="ui-range" data-invalid>
  <span class="ui-label" id="range-validation-1-label">Invalid Range</span>
  <input
    aria-invalid="true"
    aria-describedby="range-validation-1-end-text"
    aria-labelledby="range-validation-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-validation-1-end-text"
    >This value is incorrect.</span
  >
</label>
```

## Spread

```html
<label class="ui-range ui-spread">
  <span class="ui-label" id="range-row-1-label">Spread Layout</span>
  <span class="ui-start-text" id="range-row-1-start-text">Start text</span>
  <input
    aria-describedby="range-row-1-start-text range-row-1-end-text"
    aria-labelledby="range-row-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-row-1-end-text">End text</span>
</label>


<label class="ui-range ui-spread">
  <span class="ui-label" id="range-row-2-label">Disabled</span>
  <span class="ui-start-text" id="range-row-2-start-text">Start text</span>
  <input
    aria-describedby="range-row-2-start-text range-row-2-end-text"
    aria-labelledby="range-row-2-label"
    type="range"
    disabled
  />
  <span class="ui-end-text" id="range-row-2-end-text">End text</span>
</label>


<label class="ui-range ui-spread" data-invalid>
  <span class="ui-label" id="range-row-3-label">Invalid Range</span>
  <span class="ui-start-text" id="range-row-3-start-text">Start text</span>
  <input
    aria-invalid="true"
    aria-describedby="range-row-3-start-text range-row-3-end-text"
    aria-labelledby="range-row-3-label"
    type="range"
  />
  <span class="ui-end-text" id="range-row-3-end-text"
    >This value is incorrect.</span
  >
</label>


<label class="ui-range ui-spread">
  <span class="ui-label" id="range-row-4-label">Tick marks with labels</span>
  <input
    aria-labelledby="range-row-4-label"
    list="labeled-markers-spread"
    type="range"
  />
  <datalist id="labeled-markers-spread">
    <option value="0" label="0%"></option>
    <option value="25" label="25%"></option>
    <option value="50" label="50%"></option>
    <option value="75" label="75%"></option>
    <option value="100" label="100%"></option>
  </datalist>
</label>
```

### Disabled

```html
<label class="ui-range ui-spread">
  <span class="ui-label" id="range-row-disabled-label">Volume</span>
  <input
    type="range"
    aria-labelledby="range-row-disabled-label"
    min="0"
    max="100"
    value="50"
    disabled
  />
</label>
```

### Validation

```html
<label class="ui-range ui-spread" data-invalid>
  <span class="ui-label" id="range-row-validation-label">Volume</span>
  <input
    aria-invalid="true"
    type="range"
    aria-labelledby="range-row-validation-label"
    min="0"
    max="100"
    value="50"
  />
</label>
```

## Accessibility

- `Right Arrow`: Increase the value of the slider by one step.
- `Up Arrow`: Increase the value of the slider by one step.
- `Left Arrow`: Decrease the value of the slider by one step.
- `Down Arrow`: Decrease the value of the slider by one step.
- `Home`: Set the slider to the first allowed value in its range.
- `End`: Set the slider to the last allowed value in its range.
- `Page Up` (Optional): Increase the slider value by an amount larger than the step change made by `Up Arrow`.
- `Page Down` (Optional): Decrease the slider value by an amount larger than the step change made by `Down Arrow`.

## API

### Range API

| Type       | Modifiers                                | Default | Description                                                              |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| Layout     | `.ui-spread`                             | -       | Pushes the label and description to one side and the input to the other. |
| Validation | `[data-invalid]`                         | -       | Shows error styles.                                                      |
| Variants   | `.ui-default`, `.ui-filled`, `.ui-tonal` | -       | The variant to use.                                                      |

#### Parts

| Part             | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `label.ui-range` | Container element.                                       |
| `.ui-label`      | The label for the range.                                 |
| `<output>`       | Shows the current value, with an optional `valueSuffix`. |
| `.ui-start-text` | Description text displayed above the input.              |
| `<input>`        | The range input.                                         |
| `.ui-end-text`   | Supporting text displayed below the input.               |

#### CSS variables

| Variable                     | Default                                     | Description                                                                                                                |
| ---------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                      | Opacity applied to disabled controls.                                                                                      |
| `--duration-fast`            | `0.1s`                                      | Transition duration for hover and press feedback.                                                                          |
| `--ease`                     | `ease`                                      | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                       | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-helper-color`       | `var(--text-muted)`                         | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                        | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                  | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                       | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                       | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`               | Font weight for emphasized field labels and legends.                                                                       |
| `--font-weight-semibold`     | `var(--font-weight-6)`                      | Font weight for labels, table headers and titles.                                                                          |
| `--invalid-color`            | `var(--critical)`                           | Color for invalid fields and validation messages.                                                                          |
| `--motion`                   | `1`                                         | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `var(--color-8)`                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))` | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                                                                              |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))` | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html`or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md)for the full list.

Add a `<datalist>` after the input for tick marks.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Range.md).

## Installation

- `opui-css/css/components/range.css`


# Range

```html
<label class="ui-range">
  <span class="ui-label">Label</span>
  <span class="ui-start-text">Min</span>
  <input type="range" />
</label>
```

## Start text & End text

```html
<label class="ui-range">
  <span class="ui-label">Label</span>
  <span class="ui-start-text">Start helper text</span>
  <input type="range" />
  <span class="ui-end-text">End helper text</span>
</label>
```

## Value

Add an `<output class="ui-value">` sibling to the`.ui-label` with `for` pointing at the input's id. Optionally set `data-suffix` for a unit (e.g. `°`,`px`). Updating its text content is the consumer's responsibility.

```html
<label class="ui-range">
  <span class="ui-label">Hue</span>
  <output class="ui-value" for="hueRange" data-suffix="°">250°</output>
  <input type="range" id="hueRange" min="0" max="360" value="250" />
</label>
```

## Tick marks

Use the `list` attribute on the `<input>` and follow it with a `<datalist>` element containing`<option>` elements with `value` and`label` attributes.

```html
<label class="ui-range">
  <span class="ui-label">Tick marks with labels</span>
  <input list="labeled-markers" type="range" />
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
  <input type="range" />
  <span class="ui-label">Default</span>
</label>
<label class="ui-range ui-default">
  <input type="range" />
  <span class="ui-label"
    ><code>default</code> = <code>var(--surface-default)</code></span
  >
</label>
<label class="ui-range ui-filled">
  <input type="range" />
  <span class="ui-label"
    ><code>filled</code> = <code>var(--surface-filled)</code></span
  >
</label>
<label class="ui-range ui-tonal">
  <input type="range" />
  <span class="ui-label"
    ><code>tonal</code> = <code>var(--surface-tonal)</code></span
  >
</label>
```

## Disabled

```html
<label class="ui-range">
  <span class="ui-label">Disabled</span>
  <input type="range" disabled />
</label>
```

## Validation

```html
<label class="ui-range" data-invalid>
  <span class="ui-label">Invalid Range</span>
  <input type="range" />
  <span class="ui-end-text">This value is incorrect.</span>
</label>
```

## Spread

```html
<label class="ui-range ui-spread">
  <span class="ui-label">Spread Layout</span>
  <span class="ui-start-text">Start text</span>
  <input type="range" />
  <span class="ui-end-text">End text</span>
</label>


<label class="ui-range ui-spread">
  <span class="ui-label">Disabled</span>
  <span class="ui-start-text">Start text</span>
  <input type="range" disabled />
  <span class="ui-end-text">End text</span>
</label>


<label class="ui-range ui-spread" data-invalid>
  <span class="ui-label">Invalid Range</span>
  <span class="ui-start-text">Start text</span>
  <input type="range" />
  <span class="ui-end-text">This value is incorrect.</span>
</label>


<label class="ui-range ui-spread">
  <span class="ui-label">Tick marks with labels</span>
  <input list="labeled-markers-spread-html" type="range" />
  <datalist id="labeled-markers-spread-html">
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
<div class="ui-range ui-spread" disabled>
  <label class="ui-label">Volume</label>
  <input type="range" min="0" max="100" value="50" disabled />
</div>
```

### Validation

```html
<div class="ui-range ui-spread" data-invalid>
  <label class="ui-label">Volume</label>
  <input type="range" min="0" max="100" value="50" />
</div>
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

## Anatomy

1. Container
2. Label (optional)
3. Value (optional)
4. Start text (optional)
5. Input
6. End text (optional)

## API

| Type           | Modifiers                                | Default | Description                                                                                                                                              |
| -------------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Input**      | `input[type="range"]`                    | -       | The native range input element.                                                                                                                          |
| **Range**      | `.ui-range`                              | -       | Wrapper for label and input styling.                                                                                                                     |
| **Spread**     | `.ui-spread`                             | -       | Modifier for a spread layout.                                                                                                                            |
| **Variant**    | `.ui-filled`, `.ui-default`, `.ui-tonal` | -       | Modifiers for different background surfaces.                                                                                                             |
| **Label**      | `.ui-label`                              | -       | The label element for the range.                                                                                                                         |
| **Value**      | `output.value`                           | -       | Optional `<output>` showing the input's current value. Use`for` to associate it with the input and an optional`data-suffix` attribute for a unit suffix. |
| **Start text** | `.ui-start-text`                         | -       | Optional text displayed between label and the range input (often used with spread layout).                                                               |
| **End text**   | `.ui-end-text`                           | -       | Optional text displayed below the range input.                                                                                                           |
| **Spread**     | `.ui-spread`                             | -       | Modifier class to layout label and input on opposite sides.                                                                                              |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Installation

- `opui-css/css/components/range.css`


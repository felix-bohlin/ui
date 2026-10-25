# Range

## Anatomy

Label 50 Start text End text

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

- `<datalist>`

  Tick marks and their labels, under the input.

- `.ui-end-text`

  Supporting text displayed below the input.

## Basics

```html
<label class="ui-range">
  <span class="ui-label" id="range-basics-1-label">Label</span>
  <span class="ui-start-text" id="range-basics-1-start-text">Min</span>
  <input
    aria-describedby="range-basics-1-start-text"
    aria-labelledby="range-basics-1-label"
    type="range"
  />
</label>
```

## Variants

Use the `.ui-filled` or `.ui-tonal` class to swap the track surface for better contrast on different backgrounds. Without one, the track uses `--ui-track-bg-color`, or the field border color when the theme doesn't set it.

```html
<label class="ui-range">
  <span class="ui-label" id="range-surfaces-1-label"
    ><code>outlined</code> (default) =
    <code>var(--ui-field-border-color)</code></span
  >
  <input aria-labelledby="range-surfaces-1-label" type="range" />
</label>
<label class="ui-range ui-filled">
  <span class="ui-label" id="range-surfaces-2-label"
    ><code>filled</code> = <code>var(--ui-surface-filled)</code></span
  >
  <input aria-labelledby="range-surfaces-2-label" type="range" />
</label>
<label class="ui-range ui-tonal">
  <span class="ui-label" id="range-surfaces-3-label"
    ><code>tonal</code> = <code>var(--ui-surface-tonal)</code></span
  >
  <input aria-labelledby="range-surfaces-3-label" type="range" />
</label>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`. The thumb and the track scale with the size, the label and the texts keep theirs.

```html
<label class="ui-range ui-x-small">
  <span class="ui-label" id="range-sizes-1-label">x-small</span>
  <input aria-labelledby="range-sizes-1-label" type="range" />
</label>

<label class="ui-range ui-small">
  <span class="ui-label" id="range-sizes-2-label">Small</span>
  <input aria-labelledby="range-sizes-2-label" type="range" />
</label>

<label class="ui-range">
  <span class="ui-label" id="range-sizes-3-label">Medium</span>
  <input aria-labelledby="range-sizes-3-label" type="range" />
</label>

<label class="ui-range ui-large">
  <span class="ui-label" id="range-sizes-4-label">Large</span>
  <input aria-labelledby="range-sizes-4-label" type="range" />
</label>
```

## Start and end text

```html
<label class="ui-range">
  <span class="ui-label" id="range-start-end-text-1-label">Label</span>
  <span class="ui-start-text" id="range-start-end-text-1-start-text"
    >Start helper text</span
  >
  <input
    aria-describedby="range-start-end-text-1-start-text range-start-end-text-1-end-text"
    aria-labelledby="range-start-end-text-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-start-end-text-1-end-text"
    >End helper text</span
  >
</label>
```

## Value

Add an `<output class="ui-value">` sibling to the `.ui-label` with `for` pointing at the input's id, and set the same `for` on the `.ui-range` label, so it labels the input and not the output. Optionally set `data-suffix` for a unit (e.g. `°`, `px`). Add `data-live` and call `initRange()` from `opui-css/css/js/range.js` once the markup is in the DOM: it writes the value and the suffix into every `.ui-value[data-live]` on `input` and on form reset. An output without `data-live` keeps the text you give it, like the custom readout below.

```html
<label class="ui-range" for="range-value-1">
  <span class="ui-label" id="range-value-1-label">Hue</span>
  <output class="ui-value" for="range-value-1" data-live data-suffix="°"
    >250°</output
  >
  <input
    aria-labelledby="range-value-1-label"
    type="range"
    id="range-value-1"
    min="0"
    max="360"
    value="250"
  />
</label>

<script type="module">
  import { initRange } from "opui-css/css/js/range.js"

  initRange()
</script>
```

```html
<label class="ui-range" for="range-value-text-1">
  <span class="ui-label" id="range-value-text-1-label">Temperature</span>
  <output class="ui-value" for="range-value-text-1"><b>21°</b></output>
  <input
    aria-labelledby="range-value-text-1-label"
    type="range"
    id="range-value-text-1"
    min="10"
    max="30"
    value="21"
  />
</label>

<script>
  {
    const input = document.getElementById("range-value-text-1")
    const value = document.querySelector('output[for="range-value-text-1"] b')
    input.addEventListener("input", () => {
      value.textContent = `${input.value}°`
    })
  }
</script>
```

## Tick marks

Use the `list` attribute on the `<input>` and follow it with a `<datalist aria-hidden="true">` element containing `<option>` elements with `value` and `label` attributes.

```html
<label class="ui-range">
  <span class="ui-label" id="range-tick-marks-labels-1-label"
    >Tick marks with labels</span
  >
  <input
    aria-labelledby="range-tick-marks-labels-1-label"
    list="range-tick-marks-labels-1-list"
    type="range"
  />
  <datalist aria-hidden="true" id="range-tick-marks-labels-1-list">
    <option value="0" label="0%"></option>
    <option value="25" label="25%"></option>
    <option value="50" label="50%"></option>
    <option value="75" label="75%"></option>
    <option value="100" label="100%"></option>
  </datalist>
</label>
<label class="ui-range">
  <span class="ui-label" id="range-tick-marks-labels-2-label">Quality</span>
  <input
    aria-labelledby="range-tick-marks-labels-2-label"
    list="range-tick-marks-labels-2-list"
    max="2"
    type="range"
  />
  <datalist aria-hidden="true" id="range-tick-marks-labels-2-list">
    <option value="0" label="Low"></option>
    <option value="1" label="Medium"></option>
    <option value="2" label="High"></option>
  </datalist>
</label>
```

## Disabled

Add `disabled` to the `<input>` to disable the slider. The whole `.ui-range` dims and shows a not-allowed cursor.

```html
<label class="ui-range">
  <span class="ui-label" id="range-disabled-1-label">Disabled</span>
  <input aria-labelledby="range-disabled-1-label" type="range" disabled />
</label>
```

## Validation

- The invalid styles turn the thumb, the fill and the helper texts the invalid color. A range always has a value, so `required` doesn't apply, and the browser's own validation only fails after `setCustomValidity()`.
- `aria-invalid="true"` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. Point `aria-describedby` at it.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `aria-invalid="true"` for server-side errors.

```html
<label class="ui-range">
  <span class="ui-label" id="range-validation-1-label">Invalid Range</span>
  <input
    aria-invalid="true"
    aria-describedby="range-validation-1-end-text"
    aria-labelledby="range-validation-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-validation-1-end-text"
    >Pick a value below 50.</span
  >
</label>
```

## Spread

Add the `.ui-spread` class to display the label and start text on the left with the slider on the right. The value, tick marks and end text go under the slider. The layout collapses to a column in containers narrower than 400px.

```html
<label class="ui-range ui-spread">
  <span class="ui-label" id="range-spread-1-label">Spread Layout</span>
  <span class="ui-start-text" id="range-spread-1-start-text">Start text</span>
  <input
    aria-describedby="range-spread-1-start-text range-spread-1-end-text"
    aria-labelledby="range-spread-1-label"
    type="range"
  />
  <span class="ui-end-text" id="range-spread-1-end-text">End text</span>
</label>

<label class="ui-range ui-spread">
  <span class="ui-label" id="range-spread-2-label">Disabled</span>
  <span class="ui-start-text" id="range-spread-2-start-text">Start text</span>
  <input
    aria-describedby="range-spread-2-start-text range-spread-2-end-text"
    aria-labelledby="range-spread-2-label"
    type="range"
    disabled
  />
  <span class="ui-end-text" id="range-spread-2-end-text">End text</span>
</label>

<label class="ui-range ui-spread">
  <span class="ui-label" id="range-spread-3-label">Invalid Range</span>
  <span class="ui-start-text" id="range-spread-3-start-text">Start text</span>
  <input
    aria-invalid="true"
    aria-describedby="range-spread-3-start-text range-spread-3-end-text"
    aria-labelledby="range-spread-3-label"
    type="range"
  />
  <span class="ui-end-text" id="range-spread-3-end-text"
    >Pick a value below 50.</span
  >
</label>

<label class="ui-range ui-spread">
  <span class="ui-label" id="range-spread-4-label">Tick marks with labels</span>
  <input
    aria-labelledby="range-spread-4-label"
    list="range-spread-4-list"
    type="range"
  />
  <datalist aria-hidden="true" id="range-spread-4-list">
    <option value="0" label="0%"></option>
    <option value="25" label="25%"></option>
    <option value="50" label="50%"></option>
    <option value="75" label="75%"></option>
    <option value="100" label="100%"></option>
  </datalist>
</label>
```

## Accessibility

- `Right Arrow` / `Left Arrow`: Increase / decrease the value by one step, mirrored in right-to-left.
- `Up Arrow` / `Down Arrow`: Increase / decrease the value by one step.
- `Home`: Set the slider to the first allowed value in its range.
- `End`: Set the slider to the last allowed value in its range.
- `Page Up` / `Page Down`: Change the value by a larger step (10% of the range in Chromium).

## API

### Range API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Disabled | `input[disabled]` | - | Dims the slider and blocks input. |
| Label | `.ui-range > span.ui-sr-only` | - | Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name. |
| Sizes | default, `.ui-large`, `.ui-small`, `.ui-x-small` | default | The size of the element. |
| Spread | `.ui-spread` | - | Pushes the label and start text to one side and the input to the other. |
| Validation | `input[aria-invalid="true"]` | - | Marks the control invalid and shows error styles. |
| Variants | default, `.ui-filled`, `.ui-tonal` | default | The variant to use. The default `outlined` track uses `--ui-track-bg-color`, or the field border color when the theme doesn't set it. |

#### Parts

| Part | Description |
| --- | --- |
| `label.ui-range` | Container element. |
| `.ui-label` | The label for the range. |
| `<output>` | Shows the current value, with an optional `valueSuffix`. |
| `.ui-start-text` | Description text displayed above the input. |
| `<input>` | The range input. |
| `<datalist>` | Tick marks and their labels, under the input. |
| `.ui-end-text` | Supporting text displayed below the input. |

Add a `<datalist aria-hidden="true">` after the input for tick marks.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-choice-accent` | Unset | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-control-accent`, else `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it, or `--ui-control-accent`, to `--ui-primary` for the plain primary, like Material and shadcn. |
| `--ui-control-accent` | Unset | The accent every control shares: `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`, a checked `Checkbox`, `Radio` and `Switch`, and the `Range` thumb and fill. Unset by default, so buttons keep `--ui-palette-strong` and choice controls `--ui-primary`. Set it to `--ui-primary` to give every control the brand color in one line, like Material and shadcn, and `--ui-button-accent` or `--ui-choice-accent` to override one of them. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-duration-fast` | `0.1s` | Transition duration for hover and press feedback. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch` unless `--ui-choice-border-color` is set, the `Range` track and the `Progress` outline. `--ui-text-strong` mixed into `--ui-surface` at `--ui-field-border-strength`, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-helper-font-size` | `var(--ui-font-size-caption)` | Font size for helper and end text under a field. |
| `--ui-field-helper-line-height` | `var(--ui-line-height-control)` | Line height for helper and end text under a field. |
| `--ui-field-helper-text-color` | `var(--ui-text-subtle)` | Text color for helper and end text under a field. |
| `--ui-field-label-font-size` | `var(--ui-font-size-small)` | Font size for field labels. |
| `--ui-field-label-font-weight` | `var(--ui-font-weight-semibold)` | Font weight for emphasized field labels and legends. |
| `--ui-field-label-text-color` | `var(--ui-text-strong)` | Text color for field labels. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-font-weight-semibold` | `600` | Font weight for labels, table headers and titles. |
| `--ui-invalid` | `light-dark( var(--ui-critical), oklch( from var(--ui-critical) max(l, var(--ui-invalid-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Color for invalid field borders, fills and outlines. Lifted to `--ui-invalid-min-lightness` in dark mode, so invalid borders stand out from the page with more contrast. |
| `--ui-invalid-text` | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-dark` | `30%` | Alpha of the pressed state layer on neutral buttons in dark mode. `30%`, and `20%` with more contrast so the text keeps 7:1. |
| `--ui-state-active-alpha-light` | `20%` | Alpha of the pressed state layer on neutral buttons in light mode. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-track-bg-color` | Unset | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch `--ui-switch-track-bg-color`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Input | Color of the thumb, its ring and the track fill. Defaults to `--ui-choice-accent`, or `--ui-primary` when the theme doesn't set it, and is set by the invalid state. |
| `--_duration` | Output | Duration of the thumb ring transition, `--ui-duration-fast` times `--_motion`. |
| `--_ease` | Input | Easing of the thumb ring transition and focus ring. Defaults to `--ui-ease`. |
| `--_focus-ring-duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions. |
| `--_forced-fill-bg-color` | Output | Thumb and fill color in forced colors mode. `GrayText` when disabled. |
| `--_forced-track-bg-color` | Output | Track color in forced colors mode. `GrayText` when disabled. |
| `--_inset` | Output | Padding around the `input` that keeps the thumb and its highlight from clipping, computed from `--_thumb-size`. |
| `--_motion` | Input | Motion multiplier for the thumb highlight and focus ring. `0` turns them off. |
| `--_thumb-bg-color` | Output | The current thumb color. From `--_accent`, set by the disabled state. |
| `--_thumb-border-width` | Input | Width of the page-colored ring between the thumb and the track. Set on the `<input>`. |
| `--_thumb-highlight-bg-color` | Output | Color of the ring around the thumb, from `--_accent` at `--ui-state-active-alpha-light`, or `--ui-state-active-alpha-dark` in dark mode. |
| `--_thumb-highlight-size` | Output | Current width of the ring around the thumb. Set by the hover and active states. |
| `--_thumb-offset` | Output | Vertical offset that centers the thumb on the track. |
| `--_thumb-size` | Input | Width and height of the thumb. Set by the sizes, and larger on touch screens at the default size. |
| `--_track-base-bg-color` | Input | Color of the empty track at rest. `--ui-track-bg-color` when the theme sets it, otherwise the field border, and `--ui-surface` under more contrast; set by `.ui-filled` and `.ui-tonal`. |
| `--_track-bg-color` | Output | The current track color, from `--_track-base-bg-color`; set by the active and disabled states. |
| `--_track-block-size` | Input | Height of the track. Set by the sizes. |
| `--_track-fill-bg-color` | Output | Color of the filled part of the track, from `--_accent`. |
| `--_track-fill-fraction` | Output | How much of the track is filled, animated from the thumb position. |
| `--_track-radius` | Input | Corner radius of the track. |

## Installation

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/range.css`

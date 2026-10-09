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

- `.ui-end-text`

  Supporting text displayed below the input.

## Basics

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

## Variants

Use the `.ui-filled` or `.ui-tonal` class to swap the track surface for better contrast on different backgrounds. Without a class, the track uses `--field-border-color`, like the border of a text field.

```html
<label class="ui-range">
  <span class="ui-label" id="range-surfaces-1-label"
    >No variant = <code>var(--field-border-color)</code></span
  >
  <input aria-labelledby="range-surfaces-1-label" type="range" />
</label>
<label class="ui-range ui-filled">
  <span class="ui-label" id="range-surfaces-2-label"
    ><code>filled</code> = <code>var(--surface-filled)</code></span
  >
  <input aria-labelledby="range-surfaces-2-label" type="range" />
</label>
<label class="ui-range ui-tonal">
  <span class="ui-label" id="range-surfaces-3-label"
    ><code>tonal</code> = <code>var(--surface-tonal)</code></span
  >
  <input aria-labelledby="range-surfaces-3-label" type="range" />
</label>
```

## Start and end text

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

Add an `<output class="ui-value">` sibling to the `.ui-label` with `for` pointing at the input's id. Optionally set `data-suffix` for a unit (e.g. `°`, `px`). Updating its text content is the consumer's responsibility. The example does it with an `input` listener.

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

<script>
  {
    const input = document.getElementById("hueRange")
    const output = document.querySelector('output[for="hueRange"]')
    input.addEventListener("input", () => {
      output.textContent = `${input.value}${output.dataset.suffix ?? ""}`
    })
  }
</script>
```

## Tick marks

Use the `list` attribute on the `<input>` and follow it with a `<datalist>` element containing `<option>` elements with `value` and `label` attributes.

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

## Disabled

Add `disabled` to the `<input>` to disable the slider. The whole `.ui-range` dims and shows a not-allowed cursor.

```html
<label class="ui-range">
  <span class="ui-label" id="range-disabled-1-label">Disabled</span>
  <input aria-labelledby="range-disabled-1-label" type="range" disabled />
</label>
```

## Validation

- Add `aria-invalid="true"` to the `<input>` to toggle invalid styles: the thumb, the fill and the helper texts turn the invalid color. Screen readers announce it as invalid.
- Say what's wrong in the end text, and point `aria-describedby` at it.
- The same styles apply when the browser's own validation fails (`:user-invalid`), such as after `setCustomValidity()`.

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
    >This value is incorrect.</span
  >
</label>
```

## Spread

Add the `.ui-spread` class to display the label and start text on the left with the slider on the right. The value, tick marks and end text go under the slider. The layout collapses to a column in containers narrower than 400px.

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

<label class="ui-range ui-spread">
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

| Type       | Modifiers                    | Default | Description                                                              |
| ---------- | ---------------------------- | ------- | ------------------------------------------------------------------------ |
| Layout     | `.ui-spread`                 | -       | Pushes the label and description to one side and the input to the other. |
| Validation | `input[aria-invalid="true"]` | -       | Marks the control invalid and shows error styles.                        |
| Variants   | `.ui-filled`, `.ui-tonal`    | -       | The track surface. Without one, the track uses the field border color.   |

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

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                    |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                   |
| `--duration-fast`            | `0.1s`                                                                                  | Transition duration for hover and press feedback.                                                                                                                                                        |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                          |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                        |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                         |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                       |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                             |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                     |
| `--font-weight-semibold`     | `var(--font-weight-6)`                                                                  | Font weight for labels, table headers and titles.                                                                                                                                                        |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                             |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                                                                                                    |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                                                                                                            |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Add a `<datalist>` after the input for tick marks.

## Under the hood

Read the post: [Range sliders with datalist ticks](https://open-props-ui.netlify.app/learn/range-tick-marks)

1. Track

   - `appearance: none` on the input, then style the track pseudo-element
   - Chromium and Safari: `::-webkit-slider-runnable-track`, Firefox: `::-moz-range-track`
   - A `1e5px` radius is always a pill

2. Thumb

   - The thumb needs its own `appearance: none`
   - WebKit pins it to the top of the track: (track − thumb) ÷ 2 centers it
   - A border in the surface color cuts it out of the track

3. Fill

   - Firefox draws the filled part with `::-moz-range-progress`
   - Elsewhere a one-color `linear-gradient`, sized to `--track-fill`, paints it
   - `overflow: hidden` makes the input a scroller, and the thumb a `view-timeline` inside it. `timeline-scope` lets the input use it
   - The thumb's position drives the animation: `--track-fill` is registered as a `<percentage>`, so it animates. No JavaScript
   - The timeline runs from the end edge, so the keyframes go from `100%` to `0%`
   - In right-to-left the animation runs in reverse and the gradient moves to the right edge
   - Without scroll-driven animations there's no fill, the slider still works
   - Padding with an equal negative margin leaves room for the thumb and halo, `view-timeline-inset` and `outline-offset` take it back out

4. Halo

   - A `box-shadow` spread draws the ring, no extra element
   - Relative color: the primary hue at a fixed lightness and 20% alpha
   - The pseudo-elements inherit `--halo` from the input's `:hover` and `:active`
   - `:not([disabled])`: no halo on a disabled slider
   - Hover and drag the thumb

5. Ticks

   - A `<datalist>` is hidden by default, `display: flex` brings it back
   - Zero-width options with centered labels sit exactly on each step
   - Half a thumb of padding lines the ends up with the thumb's center
   - `--thumb-size` is registered as a `<length>`, so `3ex` resolves on the field, at the thumb's font size, and the smaller tick labels inherit that length

Step 1 of 5: Track

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [\<input type="range"> ](https://webstatus.dev/features/input-range)(Widely available): Chrome 4+, Edge 12+, Firefox 23+, Safari 3.1+

```css
.range {
  appearance: none;
  background: transparent;
  block-size: 1.25rem;
  inline-size: 100%;
}

.range::-webkit-slider-runnable-track {
  appearance: none;
  background-color: var(--border-color);
  block-size: 0.75ex;
  border-radius: 1e5px;
}

.range::-moz-range-track {
  appearance: none;
  background-color: var(--border-color);
  block-size: 0.75ex;
  border-radius: 1e5px;
}
```

Step 2 of 5: Thumb

```css
.range::-webkit-slider-thumb {
  appearance: none;
  background: var(--primary);
  block-size: 3ex;
  border: 3px solid var(--surface-default);
  border-radius: 50%;
  cursor: ew-resize;
  inline-size: 3ex;
  margin-block-start: -1.125ex;
}

.range::-moz-range-thumb {
  appearance: none;
  background: var(--primary);
  block-size: 3ex;
  border: 3px solid var(--surface-default);
  border-radius: 50%;
  cursor: ew-resize;
  inline-size: 3ex;
}
```

Step 3 of 5: Fill

- [`:dir()` ](https://webstatus.dev/features/dir-pseudo)(Widely available): Chrome 120+, Edge 120+, Firefox 49+, Safari 16.4+
- [Gradients ](https://webstatus.dev/features/gradients)(Widely available): Chrome 26+, Edge 12+, Firefox 3.6+, Safari 7+
- [Registered custom properties ](https://webstatus.dev/features/registered-custom-properties)(Newly available): Chrome 85+, Edge 85+, Firefox 128+, Safari 16.4+
- [Scroll-driven animations ](https://webstatus.dev/features/scroll-driven-animations)(Limited availability): Chrome 115+, Edge 115+, Firefox not supported, Safari 26+

```html
<style>
  @property --track-fill {
    syntax: "<percentage>";
    inherits: true;
    initial-value: 0%;
  }

  @keyframes build-range-fill {
    from {
      --track-fill: 100%;
    }

    to {
      --track-fill: 0%;
    }
  }
</style>
```

```css
.range {
  animation-fill-mode: both;
  animation-name: build-range-fill;
  animation-range: contain;
  animation-timeline: --thumb;
  animation-timing-function: linear;
  box-sizing: content-box;
  margin: -0.75rem;
  outline-offset: -0.75rem;
  overflow: hidden;
  padding: 0.75rem;
  timeline-scope: --thumb;
}

.range:dir(rtl) {
  animation-direction: reverse;
}

.range::-webkit-slider-thumb {
  view-timeline: --thumb inline;
  view-timeline-inset: 0.75rem;
}

.range::-webkit-slider-runnable-track {
  background-image: linear-gradient(var(--primary), var(--primary));
  background-repeat: no-repeat;
  background-size: var(--track-fill, 0%) 100%;
}

.range:dir(rtl)::-webkit-slider-runnable-track {
  background-position: right;
}

.range::-moz-range-progress {
  background-color: var(--primary);
  block-size: 0.75ex;
  border-radius: 1e5px;
}
```

Step 4 of 5: Halo

- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.range {
  --halo: 0px;
}

.range:not([disabled]):hover {
  --halo: 0.25rem;
}

.range:not([disabled]):active {
  --halo: 0.5rem;
}

.range::-webkit-slider-thumb {
  box-shadow: 0 0 0 var(--halo) oklch(from var(--primary) 70% 100% h / 20%);
  transition: box-shadow calc(0.2s * var(--motion, 1)) var(--ease);
}

.range::-moz-range-thumb {
  box-shadow: 0 0 0 var(--halo) oklch(from var(--primary) 70% 100% h / 20%);
  transition: box-shadow calc(0.2s * var(--motion, 1)) var(--ease);
}
```

Step 5 of 5: Ticks

- [\<datalist> ](https://webstatus.dev/features/datalist)(Limited availability): Chrome 69+, Edge 12+, Firefox 110+, Safari 12.1+
- [Registered custom properties ](https://webstatus.dev/features/registered-custom-properties)(Newly available): Chrome 85+, Edge 85+, Firefox 128+, Safari 16.4+

```html
<style>
  @property --thumb-size {
    syntax: "<length>";
    inherits: true;
    initial-value: 24px;
  }
</style>

<input class="range" type="range" list="ticks" … />
<datalist class="ticks" id="ticks">
  <option value="0" label="0"></option>
  <option value="25" label="25"></option>
  …
</datalist>
```

```css
.field {
  --thumb-size: 3ex;
}

.ticks {
  display: flex;
  justify-content: space-between;
  padding-inline: calc(var(--thumb-size) / 2);
}

.ticks > option {
  display: flex;
  inline-size: 0;
  justify-content: center;
  padding: 0;
  white-space: nowrap;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Partial support Missing: scroll-driven-animations.
- Safari: Full support Supported since v26.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Range.md).

## Installation

- `opui-css/css/components/range.css`

## Changelog

### What's new

- [Spread](#spread) ranges line up with spread fields and collapse to a column in narrow containers.
- The track fill is CSS only, so plain HTML ranges [fill](#basics) too.
- Breaking: [`.ui-default`](#variants) is gone, since it wasn't the default look.
- Breaking: mark an invalid range with `aria-invalid="true"` on the `<input>` instead of `data-invalid` on the root ([Validation](#validation)).

# Range

**Solid.** Import components from `opui-css/solid`. Props follow the same API as in the Astro sections below, and named slots are passed as props; static HTML notes describe class-based markup when you are not using Solid components.

### What's new

- [Spread](#spread) ranges line up with spread fields and collapse to a column in narrow containers.
- The track fill is CSS only, so plain HTML ranges fill too.
- Breaking: [`variant="default"`](#variants) is gone, since it wasn't the default look.
- [Validation](#validation) with the `error` prop.

## Anatomy

Label 50 Start text End text

- `<Range>`

  Container element.

- `children`

  The label for the range.

- `value`

  Shows the current value, with an optional `valueSuffix`.

- `startText`

  Description text displayed above the input.

- `<input>`

  The range input.

- `endText`

  Supporting text displayed below the input.

## Basics

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return <Range label="Label" startText="Min" />
}
```

## Variants

Use the `variant` prop to swap the track surface for better contrast on different backgrounds. Without a variant, the track uses `--field-border-color`, like the border of a text field.

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return (
    <>
      <Range>
        No variant = <code>var(--field-border-color)</code>
      </Range>
      <Range variant="filled">
        <code>filled</code> = <code>var(--surface-filled)</code>
      </Range>
      <Range variant="tonal">
        <code>tonal</code> = <code>var(--surface-tonal)</code>
      </Range>
    </>
  )
}
```

## Start and end text

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return (
    <Range
      label="Label"
      startText="Start helper text"
      endText="End helper text"
    />
  )
}
```

## Value

Pass the `valueSuffix` prop (or the `valueText` prop for custom content) to render a live readout of the slider's current value next to the label. The component wires up an `<output>` element and keeps its text in sync with the input.

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return <Range label="Hue" min="0" max="360" value="250" valueSuffix="°" />
}
```

## Tick marks

Pass an id to the `list` prop together with an `options` array - `options=[{ value, label }]` - and the component renders a matching `<datalist>`.

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return (
    <Range
      label="Tick marks with labels"
      list="labeled-markers"
      options={[
        { value: 0, label: "0%" },
        { value: 25, label: "25%" },
        { value: 50, label: "50%" },
        { value: 75, label: "75%" },
        { value: 100, label: "100%" },
      ]}
    />
  )
}
```

## Disabled

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return <Range disabled label="Disabled" />
}
```

## Validation

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return (
    <Range label="Invalid Range" error endText="This value is incorrect." />
  )
}
```

## Spread

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return (
    <>
      <Range spread startText="Start text" endText="End text">
        Spread Layout
      </Range>


      <Range spread disabled startText="Start text" endText="End text">
        Disabled
      </Range>


      <Range
        spread
        error
        endText="This value is incorrect."
        startText="Start text"
      >
        Invalid Range
      </Range>


      <Range
        label="Tick marks with labels"
        list="labeled-markers-spread"
        spread
        options={[
          { value: 0, label: "0%" },
          { value: 25, label: "25%" },
          { value: 50, label: "50%" },
          { value: 75, label: "75%" },
          { value: 100, label: "100%" },
        ]}
      />
    </>
  )
}
```

### Disabled

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return <Range label="Volume" min={0} max={100} value={50} spread disabled />
}
```

### Validation

```tsx
import { Range } from "opui-css/solid"


export default function Example() {
  return <Range label="Volume" min={0} max={100} value={50} spread error />
}
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

| Prop          | Type                                                                                    | Default | Description                                                              |
| ------------- | --------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------ |
| `children`    | `Element`                                                                               | -       | The label for the range.                                                 |
| `datalist`    | `Element`                                                                               | -       | Extra `<option>` elements for the `<datalist>`.                          |
| `endText`     | `string` , `Element`                                                                    | -       | Supporting text displayed below the input.                               |
| `error`       | `boolean`                                                                               | `false` | Shows error styles.                                                      |
| `id`          | `string`                                                                                | -       | The id of the `<input>`. Generated when omitted and the value is shown.  |
| `label`       | `string`                                                                                | -       | The label for the range.                                                 |
| `list`        | `string`                                                                                | -       | The id of the `<datalist>`. Needed with `options`.                       |
| `options`     | `(string` , `number` , `{ value: string` , `number; label?: string` , `undefined; })[]` | -       | Tick marks, rendered as `<option>` elements in a `<datalist>`.           |
| `spread`      | `boolean`                                                                               | `false` | Pushes the label and description to one side and the input to the other. |
| `startText`   | `string` , `Element`                                                                    | -       | Description text displayed above the input.                              |
| `value`       | `number` , `string`                                                                     | -       | The current value.                                                       |
| `valueSuffix` | `string`                                                                                | -       | Shows the current value, with an optional `valueSuffix`.                 |
| `valueText`   | `Element`                                                                               | -       | Content for the `<output>`, in place of the value and `valueSuffix`.     |
| `variant`     | `"tonal"` , `"filled"`                                                                  | -       | The track surface. Without one, the track uses the field border color.   |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration-fast`            | `0.1s`                                                                                  | Transition duration for hover and press feedback.                                                                          |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--font-weight-semibold`     | `var(--font-weight-6)`                                                                  | Font weight for labels, table headers and titles.                                                                          |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/solid/guide/theme-tokens.md) for the full list.

Props that aren't listed here, such as `max`, `min` or `step`, go to the `<input>`.

## Under the hood

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
   - Elsewhere a one-color `linear-gradient`, sized to `--fill`, paints it
   - `overflow: hidden` makes the input a scroller, and the thumb a `view-timeline` inside it. `timeline-scope` lets the input use it
   - The thumb's position drives the animation: `--fill` is registered as a `<percentage>`, so it animates. No JavaScript
   - The timeline runs from the end edge, so the keyframes go from `100%` to `0%`, reversed in right-to-left
   - Padding with an equal negative margin leaves room for the thumb and halo, `view-timeline-inset` and `outline-offset` take it back out

4. Halo

   - A `box-shadow` spread draws the ring, no extra element
   - Relative color: the primary hue at a fixed lightness and 20% alpha
   - The pseudo-elements inherit `--halo` from the input's `:hover` and `:active`
   - Hover and drag the thumb

5. Ticks

   - A `<datalist>` is hidden by default, `display: flex` brings it back
   - Zero-width options with centered labels sit exactly on each step
   - Half a thumb of padding lines the ends up with the thumb's center

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

- [Gradients ](https://webstatus.dev/features/gradients)(Widely available): Chrome 26+, Edge 12+, Firefox 3.6+, Safari 7+
- [Registered custom properties ](https://webstatus.dev/features/registered-custom-properties)(Newly available): Chrome 85+, Edge 85+, Firefox 128+, Safari 16.4+
- [Scroll-driven animations ](https://webstatus.dev/features/scroll-driven-animations)(Limited availability): Chrome 115+, Edge 115+, Firefox not supported, Safari 26+

```html
<style>
  @property --fill {
    syntax: "<percentage>";
    inherits: true;
    initial-value: 0%;
  }


  @keyframes build-range-fill {
    from {
      --fill: 100%;
    }


    to {
      --fill: 0%;
    }
  }
</style>
```

```css
.range {
  animation: build-range-fill linear both;
  animation-range: contain;
  animation-timeline: --thumb;
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
  background-size: var(--fill) 100%;
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


.range:hover {
  --halo: 0.25rem;
}


.range:active {
  --halo: 0.5rem;
}


.range::-webkit-slider-thumb {
  box-shadow: 0 0 0 var(--halo) oklch(from var(--primary) 70% 100% h / 20%);
  transition: box-shadow 0.2s var(--ease);
}


.range::-moz-range-thumb {
  box-shadow: 0 0 0 var(--halo) oklch(from var(--primary) 70% 100% h / 20%);
  transition: box-shadow 0.2s var(--ease);
}
```

Step 5 of 5: Ticks

- [\<datalist> ](https://webstatus.dev/features/datalist)(Limited availability): Chrome 69+, Edge 12+, Firefox 110+, Safari 12.1+

```html
<input class="range" type="range" list="ticks" … />
<datalist class="ticks" id="ticks">
  <option value="0" label="0"></option>
  <option value="25" label="25"></option>
  …
</datalist>
```

```css
.ticks {
  display: flex;
  justify-content: space-between;
  padding-inline: 1.5ex;
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/solid/guide/browser-support/?components=Range.md).

## Installation

- `opui-css/css/components/range.css`


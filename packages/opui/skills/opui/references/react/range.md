# Range

## Anatomy

Label 50 Start text End text

- `<Range>`

  Container element.

- `label / children`

  The label for the range.

- `valueSuffix / valueText`

  Shows the current value, with an optional `valueSuffix`.

- `startText`

  Description text displayed above the input.

- `<input>`

  The range input.

- `list / options / datalist`

  Tick marks and their labels, under the input.

- `endText`

  Supporting text displayed below the input.

## Basics

```tsx
import { Range } from "opui-css/react"

export default function Basics() {
  return <Range label="Label" startText="Min" />
}
```

## Variants

Use the `variant` prop to swap the track surface for better contrast on different backgrounds. Without one, the track uses `--ui-track-color`, or the field border color when the theme doesn't set it.

```tsx
import { Range } from "opui-css/react"

export default function Surfaces() {
  return (
    <>
      <Range>
        No variant = <code>var(--ui-field-border-color)</code>
      </Range>
      <Range variant="filled">
        <code>filled</code> = <code>var(--ui-surface-filled)</code>
      </Range>
      <Range variant="tonal">
        <code>tonal</code> = <code>var(--ui-surface-tonal)</code>
      </Range>
    </>
  )
}
```

## Start and end text

```tsx
import { Range } from "opui-css/react"

export default function StartEndText() {
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

Pass the `valueSuffix` prop to render a live readout of the slider's current value next to the label. The component wires up an `<output>` element and keeps its text in sync with the input. For custom content, pass a function to `valueText`: `valueText={(value) => …}` gets the current value as a number on every change.

```tsx
import { Range } from "opui-css/react"

export default function Value() {
  return (
    <Range label="Hue" min="0" max="360" defaultValue="250" valueSuffix="°" />
  )
}
```

```tsx
"use client"

import { Range } from "opui-css/react"

export default function ValueText() {
  return (
    <Range
      defaultValue="21"
      id="range-value-text-1"
      label="Temperature"
      max="30"
      min="10"
      valueText={(value) => <b>{value}°</b>}
    />
  )
}
```

## Tick marks

Pass an `options` array - `options=[{ value, label }]` - and the component renders a `<datalist>` and links it to the input. Set `list` to choose its id, and pass your own `<option>` elements to the `datalist` prop.

```tsx
import { Range } from "opui-css/react"

export default function TickMarksLabels() {
  return (
    <>
      <Range
        label="Tick marks with labels"
        options={[
          { value: 0, label: "0%" },
          { value: 25, label: "25%" },
          { value: 50, label: "50%" },
          { value: 75, label: "75%" },
          { value: 100, label: "100%" },
        ]}
      />
      <Range
        datalist={
          <>
            <option value="0" label="Low" />
            <option value="1" label="Medium" />
            <option value="2" label="High" />
          </>
        }
        label="Quality"
        max="2"
      />
    </>
  )
}
```

## Disabled

Set the `disabled` prop to disable the slider. The whole range dims and shows a not-allowed cursor.

```tsx
import { Range } from "opui-css/react"

export default function Disabled() {
  return <Range disabled label="Disabled" />
}
```

## Validation

- The invalid styles turn the thumb, the fill and the helper texts the invalid color. A range always has a value, so `required` doesn't apply, and the browser's own validation only fails after `setCustomValidity()`.
- `error` toggles the invalid styles, and screen readers announce the `<input>` as invalid. Say what's wrong in the end text. The component points `aria-describedby` at it.
- Fields also get the invalid styles from the browser's own validation (`:user-invalid`), after the user has edited them. Use `error` for server-side errors.

```tsx
import { Range } from "opui-css/react"

export default function Validation() {
  return (
    <Range label="Invalid Range" error endText="This value is incorrect." />
  )
}
```

## Spread

Use the `spread` boolean prop to display the label and start text on the left with the slider on the right. The value, tick marks and end text go under the slider. The layout collapses to a column in containers narrower than 400px.

```tsx
import { Range } from "opui-css/react"

export default function Spread() {
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

## Accessibility

- `Right Arrow` / `Left Arrow`: Increase / decrease the value by one step, mirrored in right-to-left.
- `Up Arrow` / `Down Arrow`: Increase / decrease the value by one step.
- `Home`: Set the slider to the first allowed value in its range.
- `End`: Set the slider to the last allowed value in its range.
- `Page Up` / `Page Down`: Change the value by a larger step (10% of the range in Chromium).

## API

### Range API

| Prop                                                                                                                                                                                                | Type                           | Default | Description                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `children`                                                                                                                                                                                          | `ReactNode`                    | -       | The label for the range.                                                                                                     |
| `datalist`                                                                                                                                                                                          | `ReactNode`                    | -       | Tick marks and their labels, under the input.                                                                                |
| `endText`                                                                                                                                                                                           | `ReactNode`                    | -       | Supporting text displayed below the input.                                                                                   |
| `error`                                                                                                                                                                                             | `boolean`                      | `false` | Marks the control invalid and shows error styles.                                                                            |
| `id`                                                                                                                                                                                                | `string`                       | -       | The id of the `<input>`. Generated when omitted and the value is shown.                                                      |
| `label`                                                                                                                                                                                             | `string`                       | -       | The label for the range.                                                                                                     |
| `list`                                                                                                                                                                                              | `string`                       | -       | The id of the `<datalist>`. Generated when `options` or the `datalist` slot is used.                                         |
| `options`                                                                                                                                                                                           | `RangeOption[]`                | -       | Tick marks, rendered as `<option>` elements in a `<datalist>`.                                                               |
| `spread`                                                                                                                                                                                            | `boolean`                      | `false` | Pushes the label and start text to one side and the input to the other.                                                      |
| `startText`                                                                                                                                                                                         | `ReactNode`                    | -       | Description text displayed above the input.                                                                                  |
| `value`                                                                                                                                                                                             | `number` , `string`            | -       | The current value.                                                                                                           |
| `valueSuffix` **Needs hydration** The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works. Update the `<output>` text on `input` yourself. | `string`                       | -       | Text after the shown value, such as `%`. Setting it shows the current value in an `<output>`.                                |
| `valueText` **Needs hydration** The value `<output>` renders once and only follows the thumb after hydration. The track fill is CSS, so it works. Update the `<output>` text on `input` yourself.   | `(value: number) => ReactNode` | -       | Shows the current value, with an optional `valueSuffix`.                                                                     |
| `variant`                                                                                                                                                                                           | `"filled"` , `"tonal"`         | -       | The variant to use. Without one, the track uses `--ui-track-color`, or the field border color when the theme doesn't set it. |

#### CSS variables

| Variable                        | Default                                                                           | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-border-width`             | `1px`                                                                             | Default border width for components that draw a border.                                                                                                                                                                                                                                                                  |
| `--ui-choice-accent`            | Unset                                                                             | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-disabled-opacity`         | `0.64`                                                                            | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                 | `0.2s`                                                                            | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-duration-fast`            | `0.1s`                                                                            | Transition duration for hover and press feedback.                                                                                                                                                                                                                                                                        |
| `--ui-ease`                     | `ease`                                                                            | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`       | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`     | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                            | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                     | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                           | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                           | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`    | `var(--ui-font-size-small)`                                                       | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                  | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-font-weight-semibold`     | `var(--font-weight-6)`                                                            | Font weight for labels, table headers and titles.                                                                                                                                                                                                                                                                        |
| `--ui-invalid`                  | `var(--ui-critical)`                                                              | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`             | `light-dark( var(--ui-invalid), oklch(from var(--ui-invalid) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--ui-invalid` in dark mode so the text stays readable.                                                                                                                                                                                                   |
| `--ui-motion`                   | `1`                                                                               | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                                                                                                |
| `--ui-primary`                  | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-round`             | `var(--radius-round)`                                                             | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                       |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                     | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                     | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                     | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-state-active-alpha`       | `20%`                                                                             | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                                                                                                                                       |
| `--ui-surface-default`          | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                 | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-surface-filled`           | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                 | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`            | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                 | Background of tonal variants.                                                                                                                                                                                                                                                                                            |
| `--ui-text-strong`              | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                 | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |
| `--ui-track-color`              | Unset                                                                             | The empty part of a track: the unchecked `Switch`, `Progress` and the `Range` track. When unset, `Progress` and tonal ranges use `--ui-surface-tonal`, the default range its field border and the switch a fixed gray.                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

Attributes that aren't props go to the `<input>`, like `max`, `min` or `step`, and `className` and `style` go to the root `<label>`. Set `defaultValue` for the starting value. `value` makes it controlled, so update it in `onChange`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                   | Kind   | Description                                                                                                                                                                                   |
| -------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`                | Input  | Color of the thumb, its ring and the track fill. Defaults to `--ui-choice-accent`, or `--ui-primary` when the theme doesn't set it, and is set by the invalid state.                          |
| `--_duration`              | Output | Duration of the thumb ring transition, `--ui-duration-fast` times `--_motion`.                                                                                                                |
| `--_ease`                  | Input  | Easing of the thumb ring transition and focus ring. Defaults to `--ui-ease`.                                                                                                                  |
| `--_focus-ring-duration`   | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`, slower than the `--_duration` of the transitions.                                                                    |
| `--_forced-fill-color`     | Output | Thumb and fill color in forced colors mode. `GrayText` when disabled.                                                                                                                         |
| `--_forced-track-color`    | Output | Track color in forced colors mode. `GrayText` when disabled.                                                                                                                                  |
| `--_inset`                 | Output | Padding around the `input` that keeps the thumb and its highlight from clipping, computed from `--_thumb-size`.                                                                               |
| `--_motion`                | Input  | Motion multiplier for the thumb highlight and focus ring. `0` turns them off.                                                                                                                 |
| `--_thumb-bg-color`        | Output | The current thumb color. From `--_accent`, set by the disabled state.                                                                                                                         |
| `--_thumb-border-width`    | Input  | Width of the page-colored ring between the thumb and the track. Set on the `<input>`.                                                                                                         |
| `--_thumb-highlight-color` | Output | Color of the ring around the thumb, from `--_accent` and `--ui-state-active-alpha`.                                                                                                           |
| `--_thumb-highlight-size`  | Output | Current width of the ring around the thumb. Set by the hover and active states.                                                                                                               |
| `--_thumb-offset`          | Output | Vertical offset that centers the thumb on the track.                                                                                                                                          |
| `--_thumb-size`            | Input  | Width and height of the thumb. Larger on touch screens.                                                                                                                                       |
| `--_track-base-color`      | Input  | Color of the empty track at rest. `--ui-track-color` when the theme sets it, otherwise the field border, and `--ui-surface-default` under more contrast; set by `.ui-filled` and `.ui-tonal`. |
| `--_track-color`           | Output | The current track color, from `--_track-base-color`; set by the active and disabled states.                                                                                                   |
| `--_track-fill`            | Output | How much of the track is filled, animated from the thumb position.                                                                                                                            |
| `--_track-fill-color`      | Output | Color of the filled part of the track, from `--_accent`.                                                                                                                                      |
| `--_track-height`          | Input  | Height of the track.                                                                                                                                                                          |
| `--_track-radius`          | Input  | Corner radius of the track.                                                                                                                                                                   |

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
   - `--inset` is half a thumb, and at least `0.5rem` for the halo, so it follows `--thumb-size`

4. Halo

   - A `box-shadow` spread draws the ring, no extra element
   - Relative color: the primary hue at a fixed lightness, with the theme's `--ui-state-active-alpha`
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
  background-color: var(--ui-track-color, var(--ui-field-border-color));
  block-size: 0.75ex;
  border-radius: 1e5px;
}

.range::-moz-range-track {
  appearance: none;
  background-color: var(--ui-track-color, var(--ui-field-border-color));
  block-size: 0.75ex;
  border-radius: 1e5px;
}
```

Step 2 of 5: Thumb

```css
.range::-webkit-slider-thumb {
  appearance: none;
  background: var(--ui-primary);
  block-size: 3ex;
  border: 3px solid var(--ui-surface-default);
  border-radius: 50%;
  cursor: ew-resize;
  inline-size: 3ex;
  margin-block-start: -1.125ex;
}

.range::-moz-range-thumb {
  appearance: none;
  background: var(--ui-primary);
  block-size: 3ex;
  border: 3px solid var(--ui-surface-default);
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
  --inset: max(0.5rem, var(--thumb-size) / 2);
  animation-fill-mode: both;
  animation-name: build-range-fill;
  animation-range: contain;
  animation-timeline: --thumb;
  animation-timing-function: linear;
  box-sizing: content-box;
  margin: calc(-1 * var(--inset));
  outline-offset: calc(1ex - var(--inset));
  overflow: hidden;
  padding: var(--inset);
  timeline-scope: --thumb;
}

.range:dir(rtl) {
  animation-direction: reverse;
}

.range::-webkit-slider-thumb {
  view-timeline: --thumb inline;
  view-timeline-inset: var(--inset);
}

.range::-webkit-slider-runnable-track {
  background-image: linear-gradient(var(--ui-primary), var(--ui-primary));
  background-repeat: no-repeat;
  background-size: var(--track-fill, 0%) 100%;
}

.range:dir(rtl)::-webkit-slider-runnable-track {
  background-position: right;
}

.range::-moz-range-progress {
  background-color: var(--ui-primary);
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
  box-shadow: 0 0 0 var(--halo)
    oklch(from var(--ui-primary) 70% 100% h / var(--ui-state-active-alpha));
  transition: box-shadow calc(0.2s * var(--ui-motion, 1)) var(--ui-ease);
}

.range::-moz-range-thumb {
  box-shadow: 0 0 0 var(--halo)
    oklch(from var(--ui-primary) 70% 100% h / var(--ui-state-active-alpha));
  transition: box-shadow calc(0.2s * var(--ui-motion, 1)) var(--ui-ease);
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

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Range.md).

## Installation

Import the component from `opui-css/react`:

- `opui-css/css/components/range.css`

## Changelog

### What's new

- The empty track reaches 3:1 against the page by default, and with more contrast it takes the page color with an inset edge so the fill stands out.
- The thumb and fill read [`--ui-choice-accent`](#api) and the empty track `--ui-track-color` when a theme sets them.
- [Spread](#spread) ranges line up with spread fields and collapse to a column in narrow containers.
- [Validation](#validation) with the `error` prop, which sets `aria-invalid="true"` on the input.
- Breaking: `--_thumb-bg` is `--_thumb-bg-color` ([Under the hood](#under-the-hood)).
- `options` is typed as [`RangeOption[]`](#tick-marks), exported from every framework.
- [`options`](#tick-marks) renders a linked `<datalist>` without a `list` id.
- [`valueText`](#value) takes a function that gets the current value and follows the thumb.
- The thumb, its halo and the track fill follow `--_accent` on `.ui-range` ([Under the hood](#under-the-hood)).
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- [`--_track-base-color`](#component-properties) sets the empty track at rest, so filled and tonal tracks darken on press and take the disabled color.

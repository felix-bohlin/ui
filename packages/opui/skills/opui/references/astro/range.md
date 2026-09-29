# Range

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) for the full setup.

```astro
---
import "opui-css/css/components/range.css"
import { Range } from "opui-css/astro"
---
```

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Label" startText="Min" />
```

## Start text & End text

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Label" startText="Start helper text" endText="End helper text" />
```

## Value

Pass the `valueSuffix` prop (or use the `value` named slot) to render a live readout of the slider's current value next to the label. The component wires up an `<output>` element and keeps its text in sync with the input.

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Hue" min="0" max="360" value="250" valueSuffix="°" />
```

## Tick marks

Pass an id to the `list` prop together with an `options`array - `options=[{ value, label }]` - and the component renders a matching `<datalist>`.

```astro
---
import { Range } from "opui-css/astro"
---


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
```

## Variants

Use the `variant` prop to swap the track surface for better contrast on different backgrounds.

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Default" />
<Range variant="default">
  <code>default</code> = <code>var(--surface-default)</code>
</Range>
<Range variant="filled">
  <code>filled</code> = <code>var(--surface-filled)</code>
</Range>
<Range variant="tonal">
  <code>tonal</code> = <code>var(--surface-tonal)</code>
</Range>
```

## Disabled

```astro
---
import { Range } from "opui-css/astro"
---


<Range disabled label="Disabled" />
```

## Validation

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Invalid Range" data-invalid endText="This value is incorrect." />
```

## Spread

```astro
---
import { Range } from "opui-css/astro"
---


<Range spread>
  Spread Layout
  <Fragment slot="start-text">Start text</Fragment>
  <Fragment slot="end-text">End text</Fragment>
</Range>


<Range spread disabled>
  Disabled
  <Fragment slot="start-text">Start text</Fragment>
  <Fragment slot="end-text">End text</Fragment>
</Range>


<Range spread data-invalid endText="This value is incorrect.">
  Invalid Range
  <Fragment slot="start-text">Start text</Fragment>
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
```

### Disabled

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Volume" min={0} max={100} value={50} spread disabled />
```

### Validation

```astro
---
import { Range } from "opui-css/astro"
---


<Range label="Volume" min={0} max={100} value={50} spread data-invalid />
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

| Prop          | Type                               | Default     | Description                                                                                                                                                                                           |
| ------------- | ---------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`       | `string`                           | -           | The label for the range input.                                                                                                                                                                        |
| `startText`   | `string`                           | -           | Informational text between label and the range input.                                                                                                                                                 |
| `endText`     | `string`                           | -           | Informational text below the range input.                                                                                                                                                             |
| `spread`      | `boolean`                          | `false`     | Spreads the label/text and input to opposite ends.                                                                                                                                                    |
| `variant`     | `'filled' \| 'default' \| 'tonal'` | `'default'` | Adjusts the track color for better contrast on different surfaces.                                                                                                                                    |
| `min`         | `number \| string`                 | -           | The minimum value.                                                                                                                                                                                    |
| `max`         | `number \| string`                 | -           | The maximum value.                                                                                                                                                                                    |
| `step`        | `number \| string`                 | -           | The step increment.                                                                                                                                                                                   |
| `value`       | `number \| string`                 | -           | The current value.                                                                                                                                                                                    |
| `valueSuffix` | `string`                           | -           | Renders a live `<output>` next to the label showing the current input value. The suffix (e.g. `°`, `px`) is appended to the value and the component keeps the readout in sync on every `input` event. |

### Slots

| Slot         | Description                                                                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `default`    | Slot for the label element.                                                                                                                                                                                        |
| `start-text` | Slot for the text between label and input.                                                                                                                                                                         |
| `end-text`   | Slot for the text below the input.                                                                                                                                                                                 |
| `value`      | Custom content for the live value readout. When set, replaces the default rendering of the `value` prop inside `<output>`. The auto-update script still mirrors the input's value into the element's text content. |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/range.css`


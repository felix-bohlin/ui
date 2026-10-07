# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/html/components/form.md).

## Anatomy

Label End text

- `label.ui-radio`

  Container element.

- `<input>`

  The radio input.

- `.ui-label`

  The label.

- `.ui-end-text`

  Supporting text displayed below the label.

## Basics

Give every `<input type="radio">` in the group the same `name` attribute. Browsers use that shared name to enforce mutual exclusivity within the group.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group">
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`, on the `<label class="ui-radio">`.

```html
<div class="example-row">
  <label class="ui-radio ui-x-small">
    <input name="radio-sizes-x-small" type="radio" value="selected" checked />
    <span class="ui-sr-only">Selected</span>
  </label>


  <label class="ui-radio ui-small">
    <input name="radio-sizes-small" type="radio" value="selected" checked />
    <span class="ui-sr-only">Selected</span>
  </label>


  <label class="ui-radio">
    <input name="radio-sizes-default" type="radio" value="selected" checked />
    <span class="ui-sr-only">Selected</span>
  </label>


  <label class="ui-radio ui-large">
    <input name="radio-sizes-large" type="radio" value="selected" checked />
    <span class="ui-sr-only">Selected</span>
  </label>
</div>


<div class="example-row">
  <label class="ui-radio ui-x-small">
    <input name="radio-sizes-x-small" type="radio" value="other" />
    <span class="ui-label">x-small</span>
  </label>


  <label class="ui-radio ui-small">
    <input name="radio-sizes-small" type="radio" value="other" />
    <span class="ui-label">Small</span>
  </label>


  <label class="ui-radio">
    <input name="radio-sizes-default" type="radio" value="other" />
    <span class="ui-label">Default</span>
  </label>


  <label class="ui-radio ui-large">
    <input name="radio-sizes-large" type="radio" value="other" />
    <span class="ui-label">Large</span>
  </label>
</div>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Without a visible label, use `.ui-sr-only` instead of `.ui-label` to hide it visually.

```html
<label class="ui-radio">
  <input name="radio-visible-label" type="radio" value="a" checked />
  <span class="ui-label">Choice A</span>
</label>


<label class="ui-radio">
  <input name="radio-visible-label" type="radio" value="b" disabled />
  <span class="ui-label">Disabled</span>
</label>


<label class="ui-radio">
  <input name="radio-visible-label" type="radio" value="c" />
  <span class="ui-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </span>
</label>
```

### Label position

Add `.ui-stack` to the `<label class="ui-radio">` to put the label under the radio.

```html
<label class="ui-radio">
  <input name="radio-label-position" type="radio" value="default" checked />
  <span class="ui-label">Default</span>
</label>


<label class="ui-radio ui-stack">
  <input name="radio-label-position" type="radio" value="stack" />
  <span class="ui-label">Stack</span>
</label>
```

### End text

Add a `.ui-end-text` element after the label for supporting text under a single radio, and point the input's `aria-describedby` at its `id`.

```html
<label class="ui-radio">
  <input
    name="radio-supporting-text"
    type="radio"
    value="default"
    checked
    aria-describedby="radio-supporting-text-end-text-1"
  />
  <span class="ui-label">Default</span>
  <span class="ui-end-text" id="radio-supporting-text-end-text-1"
    >Supporting text</span
  >
</label>


<label class="ui-radio ui-stack">
  <input
    name="radio-supporting-text"
    type="radio"
    value="stack"
    aria-describedby="radio-supporting-text-end-text-2"
  />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text" id="radio-supporting-text-end-text-2"
    >Supporting text</span
  >
</label>
```

## Field description

Can be placed above and below the fields.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <p class="ui-field-description">Field description above fields</p>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input
          name="radio-group-field-description-1"
          type="radio"
          value="1"
          checked
        />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-1" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-1" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>


  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input
          name="radio-group-field-description-2"
          type="radio"
          value="1"
          checked
        />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-2" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-field-description-2" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
    <p class="ui-field-description">Field description below fields</p>
  </fieldset>
</form>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element to disable every radio in it, or to a single `<input>`.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" disabled>
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-disabled" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Required

Attach the `required` attribute to at least one of your `<input>` elements.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>These are required!</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="1" required />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="2" required />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-required" type="radio" value="3" required />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Validation

Add `aria-invalid="true"` to each `<input>` in the group. The end text of the `.ui-fieldset` turns red with them.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input
          aria-invalid="true"
          name="radio-group-validation"
          type="radio"
          value="1"
          checked
        />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input
          aria-invalid="true"
          name="radio-group-validation"
          type="radio"
          value="2"
        />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input
          aria-invalid="true"
          name="radio-group-validation"
          type="radio"
          value="3"
        />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
    <span class="ui-end-text">Something went wrong!</span>
  </fieldset>
</form>
```

## Direction

Radios stack vertically by default. Add `.ui-row` to the `.ui-field-group` to put them in a row.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Legend</legend>
    <div class="ui-field-group ui-row">
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="1" checked />
        <span class="ui-label">Radio 1</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="2" />
        <span class="ui-label">Radio 2</span>
      </label>
      <label class="ui-radio">
        <input name="radio-group-direction" type="radio" value="3" />
        <span class="ui-label">Radio 3</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-radio">` to push the label to the left and the radio to the right. Handy for settings cards next to spread checkboxes and switches.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Delivery</legend>
    <div class="ui-field-group">
      <label class="ui-radio ui-spread">
        <input
          name="radio-spread"
          type="radio"
          value="standard"
          checked
          aria-describedby="radio-spread-end-text-1"
        />
        <span class="ui-label">Standard</span>
        <span class="ui-end-text" id="radio-spread-end-text-1"
          >Arrives in 3 to 5 days.</span
        >
      </label>
      <label class="ui-radio ui-spread">
        <input
          name="radio-spread"
          type="radio"
          value="express"
          aria-describedby="radio-spread-end-text-2"
        />
        <span class="ui-label">Express</span>
        <span class="ui-end-text" id="radio-spread-end-text-2"
          >Arrives tomorrow.</span
        >
      </label>
      <label class="ui-radio ui-spread">
        <input
          name="radio-spread"
          type="radio"
          value="pickup"
          disabled
          aria-describedby="radio-spread-end-text-3"
        />
        <span class="ui-label">Pickup</span>
        <span class="ui-end-text" id="radio-spread-end-text-3"
          >Not available in your area.</span
        >
      </label>
    </div>
  </fieldset>
</form>
```

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## API

### Radio API

| Type       | Modifiers                               | Default | Description                                       |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------- |
| Layout     | `.ui-spread`                            | -       | Pushes the label and the input to opposite ends.  |
| Layout     | `.ui-stack`                             | -       | Stacks the label under the input.                 |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                          |
| Validation | `input[aria-invalid="true"]`            | -       | Marks the control invalid and shows error styles. |

#### Parts

| Part             | Description                                |
| ---------------- | ------------------------------------------ |
| `label.ui-radio` | Container element.                         |
| `<input>`        | The radio input.                           |
| `.ui-label`      | The label.                                 |
| `.ui-end-text`   | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--choice-label-offset`      | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                        |
| `--choice-size`              | `var(--size-4)`                                                                         | Default `Checkbox` and `Radio` input size.                                                                                                                                                                   |
| `--choice-size-large`        | `var(--size-5)`                                                                         | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                          |
| `--choice-size-small`        | `var(--size-3)`                                                                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                        |
| `--choice-size-x-small`      | `0.875rem`                                                                              | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                        |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                                                                        |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                                                                                                              |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                                                                                                     |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                   |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                                                                            |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                                                                             |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                                                                           |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                                                                                 |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                                                                                  |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                         |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                                                                              |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                                                                         |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                                                                                    |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`         | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--ripple-color`             | `oklch(0.6 0 0 / 0.2)`                                                                  | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                      |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                                                                                    |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Use `.ui-sr-only` instead of `.ui-label` to hide the label visually.

### Field group API

| Type        | Modifiers               | Default | Description                                                                                              |
| ----------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Orientation | `.ui-column`, `.ui-row` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                     |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                         |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                          |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                        |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                              |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                      |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                           |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Wrap it in a `.ui-fieldset` with a `<legend>` to group and label it.

## Under the hood

1. Appearance

   - `appearance: none` drops the native circle
   - Still a radio group: one shared `name`, arrow keys move the selection
   - The `<legend>` names the group
   - In dark mode `--accent` caps the primary's lightness, so the light dot keeps 3:1

2. Dot

   - The dot is a `radial-gradient()` on the input's own background, centered in its box
   - No second box to lay out and round to device pixels, so the dot stays centered at every zoom level and screen scale
   - Half a pixel between the two stops smooths the edge

3. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has([disabled])` dims the whole row from the input's state
   - `(size − 1lh) / 2` centers the first line on the circle, in every browser

Step 1 of 3: Appearance

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```html
<fieldset>
  <legend>Plan</legend>
  <label class="label">
    <input class="radio" type="radio" name="plan" checked />
    <span>Monthly</span>
  </label>
  <label class="label">
    <input class="radio" type="radio" name="plan" />
    <span>Yearly</span>
  </label>
</fieldset>
```

```css
.radio {
  --accent: light-dark(
    var(--primary),
    oklch(from var(--primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--primary-contrast), var(--gray-1));


  appearance: none;
  aspect-ratio: 1;
  background-color: var(--surface-default);
  block-size: 1.25rem;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  box-sizing: border-box;
  inline-size: 1.25rem;
  margin: 0;
}


.radio:checked {
  background-color: var(--accent);
  border-color: var(--accent);
}
```

Step 2 of 3: Dot

```css
.radio:checked {
  background-image: radial-gradient(
    circle,
    var(--accent-contrast) calc(var(--dot) - 0.25px),
    var(--accent) calc(var(--dot) + 0.25px)
  );
}
```

Step 3 of 3: Label

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [lh unit ](https://webstatus.dev/features/lh)(Widely available): Chrome 109+, Edge 109+, Firefox 120+, Safari 16.4+

```css
.label {
  align-items: start;
  cursor: pointer;
  display: inline-grid;
  gap: 0 0.5rem;
  grid-auto-flow: column;
}


.label:has([disabled]) {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}


.label > span {
  margin-block-start: calc((1.25rem - 1lh) / 2);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Radio.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`

## Changelog

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale`, and `--isLTR` and `--isRTL` are `--_dir-rtl` ([Under the hood](#under-the-hood)).
- Without a visible label, radios [center](#label-alignment) in table cells and lines of text.
- [Spread](#spread) with `.ui-spread`, like Checkbox and Switch.
- Breaking: mark an invalid group with `aria-invalid="true"` on each radio instead of `data-invalid` on the fieldset ([Validation](#validation)).
- Takes `.ui-x-small`. [Sizes](#sizes)

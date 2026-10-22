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
    <span class="ui-label">X-small</span>
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

Add a `.ui-end-text` element after the label for supporting text under a single radio. It sits inside the `<label>`, so screen readers read it with the label.

```html
<label class="ui-radio">
  <input name="radio-end-text" type="radio" value="default" checked />
  <span class="ui-label">Default</span>
  <span class="ui-end-text">Supporting text</span>
</label>

<label class="ui-radio ui-stack">
  <input name="radio-end-text" type="radio" value="stack" />
  <span class="ui-label">Stack</span>
  <span class="ui-end-text">Supporting text</span>
</label>
```

## Spread

Add the `.ui-spread` class to the `<label class="ui-radio">` to push the label to the left and the radio to the right. Handy for settings cards next to spread checkboxes and switches.

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Delivery</legend>
    <div class="ui-field-group">
      <label class="ui-radio ui-spread">
        <input name="radio-spread" type="radio" value="standard" checked />
        <span class="ui-label">Standard</span>
        <span class="ui-end-text">Arrives in 3 to 5 days.</span>
      </label>
      <label class="ui-radio ui-spread">
        <input name="radio-spread" type="radio" value="express" />
        <span class="ui-label">Express</span>
        <span class="ui-end-text">Arrives tomorrow.</span>
      </label>
      <label class="ui-radio ui-spread">
        <input name="radio-spread" type="radio" value="pickup" disabled />
        <span class="ui-label">Pickup</span>
        <span class="ui-end-text">Not available in your area.</span>
      </label>
    </div>
  </fieldset>
</form>
```

## Label alignment

The radio lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--ui-choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --ui-choice-label-offset: 0.05em;
}
```

## Radio input

Use `<input type="radio">` without the label for a custom layout, such as the end of a list item. See [List](https://open-props-ui.netlify.app/html/components/list.md#radio).

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

`aria-disabled="true"` on the `<input>` looks the same, but keeps the radio focusable and its value in the form. It doesn't stop the change, so block it with a script.

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

Give the end text an `id` and point `aria-describedby` on the fieldset at it, so screen readers read the error with the group.

```html
<form class="ui-form">
  <fieldset
    aria-describedby="radio-field-group-validation-1-error"
    class="ui-fieldset"
  >
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
    <span class="ui-end-text" id="radio-field-group-validation-1-error"
      >Something went wrong!</span
    >
  </fieldset>
</form>
```

## Binding

The selected value lives in the inputs, which share a `name`. Submit them with a form, where `FormData.get()` reads it, or read the checked input in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` input in the markup.

```html
<fieldset class="ui-fieldset">
  <legend>Plan</legend>
  <div class="ui-field-group">
    <label class="ui-radio">
      <input name="radio-binding" type="radio" value="free" checked />
      <span class="ui-label">Free</span>
    </label>
    <label class="ui-radio">
      <input name="radio-binding" type="radio" value="pro" />
      <span class="ui-label">Pro</span>
    </label>
    <label class="ui-radio">
      <input name="radio-binding" type="radio" value="team" />
      <span class="ui-label">Team</span>
    </label>
  </div>
</fieldset>
<p class="radio-binding-text">Selected: free</p>
<button type="button" class="ui-button radio-binding-reset">Reset</button>

<script>
  function setupRadioBinding() {
    const text = document.querySelector(".radio-binding-text")
    const inputs = [...document.querySelectorAll('[name="radio-binding"]')]

    function update() {
      if (!text) return
      text.textContent = `Selected: ${
        inputs.find((input) => input.checked)?.value ?? "none"
      }`
    }

    inputs.forEach((input) => input.addEventListener("change", update))
    document
      .querySelector(".radio-binding-reset")
      ?.addEventListener("click", () => {
        inputs.forEach((input) => (input.checked = input.defaultChecked))
        update()
      })
  }

  setupRadioBinding()
</script>
```

## Accessibility

### Keyboard support

| Key        | Function                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| `Tab`      | Moves focus into the group, to the checked radio. When none is checked, focus goes to the first radio. |
| Arrow keys | Move focus to the next or previous radio and select it.                                                |
| `Space`    | Selects the focused radio.                                                                             |

## API

### Radio API

| Type       | Modifiers                               | Default | Description                                       |
| ---------- | --------------------------------------- | ------- | ------------------------------------------------- |
| Disabled   | `input[disabled]`                       | -       | Dims the radio and shows a not-allowed cursor.    |
| Required   | `input[required]`                       | -       | Adds a required mark after the label.             |
| Sizes      | `.ui-large`, `.ui-small`, `.ui-x-small` | -       | The size of the element.                          |
| Spread     | `.ui-spread`                            | -       | Pushes the label and the input to opposite ends.  |
| Stack      | `.ui-stack`                             | -       | Stacks the label under the input.                 |
| Validation | `input[aria-invalid="true"]`            | -       | Marks the control invalid and shows error styles. |

#### Parts

| Part             | Description                                |
| ---------------- | ------------------------------------------ |
| `label.ui-radio` | Container element.                         |
| `<input>`        | The radio input.                           |
| `.ui-label`      | The label.                                 |
| `.ui-end-text`   | Supporting text displayed below the label. |

#### CSS variables

| Variable                           | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                                                                                                      | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                                                                                                      | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                                                                                                      | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                     | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                                                                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                                                                                                     | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                                                                                                     | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                                                                              | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                                                                                                      | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                                                                                                | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                                                                                                       | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height`                 | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                                                                                                        | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                 |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                                                                                                         | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                   | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                         | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-round`                | `var(--radius-round)`                                                                                                                                                      | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                          | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                                                                                                       | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                          | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To hide the label, use `.ui-sr-only` instead of `.ui-label`.

### Radio input API

#### Parts

| Part                   | Description                       |
| ---------------------- | --------------------------------- |
| `<input type="radio">` | The radio input, without a label. |

#### CSS variables

| Variable                           | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--ui-choice-accent`               | Unset                                                                                                                                                                      | Fill of a checked `Checkbox`, `Radio` and `Switch`, and the thumb and fill of `Range`. When unset, `--ui-primary`, with its lightness capped in dark mode for the choice controls. Set it to `--ui-primary` for the plain primary, like Material and shadcn.                                                             |
| `--ui-choice-label-offset`         | `0px`                                                                                                                                                                      | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font.                                                                                                                                                                    |
| `--ui-choice-on-accent`            | Unset                                                                                                                                                                      | Color of the mark on a checked `Checkbox`, `Radio` and `Switch`. Set it with `--ui-choice-accent`. When unset, `--ui-on-primary` in light mode and near-white in dark mode.                                                                                                                                              |
| `--ui-choice-ripple-color`         | `oklch(0.6 0 0 / 0.2)`                                                                                                                                                     | Halo color for the `Checkbox` and `Radio` hover effect.                                                                                                                                                                                                                                                                  |
| `--ui-choice-size`                 | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Default `Checkbox` and `Radio` input size.                                                                                                                                                                                                                                                                               |
| `--ui-choice-size-large`           | `calc(var(--size-5) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                                                                                                                                                                                      |
| `--ui-choice-size-small`           | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                    |
| `--ui-choice-size-x-small`         | `calc(0.875rem * var(--ui-density))`                                                                                                                                       | `Checkbox` and `Radio` input size with `.ui-x-small`.                                                                                                                                                                                                                                                                    |
| `--ui-disabled-opacity`            | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                    | `0.2s`                                                                                                                                                                     | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                |
| `--ui-ease`                        | `ease`                                                                                                                                                                     | Default easing for transitions.                                                                                                                                                                                                                                                                                          |
| `--ui-field-border-color`          | `color-mix( in oklch, var(--ui-text-strong) 50%, var(--ui-surface-default) )`                                                                                              | Border color of every empty control: `TextField`, `Select`, `Textarea`, the unchecked `Checkbox`, `Radio` and `Switch`, the `Range` track and the `Progress` outline. A 50% mix of the text color into the page, so it reaches 3:1. Lighter than `--ui-border-color`, which is decorative, is a choice a theme can make. |
| `--ui-field-border-width`          | `1px`                                                                                                                                                                      | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                                                                                                                                                                                               |
| `--ui-field-helper-color`          | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                                                                                                                        |
| `--ui-field-helper-font-size`      | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                                                                                                                         |
| `--ui-field-helper-line-height`    | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                                                                                                                       |
| `--ui-field-label-color`           | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                                                                                                                             |
| `--ui-field-label-font-size`       | `var(--ui-font-size-small)`                                                                                                                                                | Font size for field labels.                                                                                                                                                                                                                                                                                              |
| `--ui-field-label-font-weight`     | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                                                                                                                     |
| `--ui-field-required-color`        | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                                                                                                                          |
| `--ui-invalid`                     | `var(--ui-critical)`                                                                                                                                                       | Color for invalid field borders, fills and outlines. Lighter in dark mode with more contrast, so invalid borders stand out from the page.                                                                                                                                                                                |
| `--ui-invalid-text`                | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders.                                                                                               |
| `--ui-line-height`                 | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                                                                                                                           |
| `--ui-motion`                      | `1`                                                                                                                                                                        | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                 |
| `--ui-on-accent`                   | `var(--ui-gray-1)`                                                                                                                                                         | Near-white text on a saturated fill in both modes: critical buttons, severity `Badge`s and the checked choice mark in dark mode.                                                                                                                                                                                         |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`                                                                                   | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                       |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                         | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                             |
| `--ui-radius-round`                | `var(--radius-round)`                                                                                                                                                      | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                                                                                                       |
| `--ui-space-1`                     | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-4`                     | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-space-5`                     | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                                                                                                                          |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                                                                                                          | Page and card background.                                                                                                                                                                                                                                                                                                |
| `--ui-switch-thumb-size-large`     | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Diameter of the `Switch` thumb with `.ui-large`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-thumb-size-small`     | `calc(0.75rem * var(--ui-density))`                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                       |
| `--ui-switch-thumb-size-x-small`   | `calc(0.625rem * var(--ui-density))`                                                                                                                                       | Diameter of the `Switch` thumb with `.ui-x-small`.                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-large`   | `calc(var(--size-6) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                           |
| `--ui-switch-track-height-small`   | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                         |
| `--ui-switch-track-height-x-small` | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-large`    | `calc(3.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-large`.                                                                                                                                                                                                                                                                            |
| `--ui-switch-track-width-small`    | `calc(2.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                          |
| `--ui-switch-track-width-x-small`  | `calc(var(--size-7) * var(--ui-density))`                                                                                                                                  | Width of the `Switch` track with `.ui-x-small`.                                                                                                                                                                                                                                                                          |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                          | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Field group API

| Type        | Modifiers               | Default | Description                                                                                              |
| ----------- | ----------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Orientation | `.ui-column`, `.ui-row` | -       | The orientation of the fields. Without it, fields stack and a group with only buttons lines up in a row. |

#### Parts

| Part              | Description        |
| ----------------- | ------------------ |
| `.ui-field-group` | Container element. |

#### CSS variables

| Variable                        | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-disabled-opacity`         | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                      |
| `--ui-field-helper-color`       | `var(--ui-text-muted)`                                                                                                                                                     | Text color for helper and end text under a field.                                                                                                                                                                          |
| `--ui-field-helper-font-size`   | `var(--ui-font-size-caption)`                                                                                                                                              | Font size for helper and end text under a field.                                                                                                                                                                           |
| `--ui-field-helper-line-height` | `var(--ui-line-height)`                                                                                                                                                    | Line height for helper and end text under a field.                                                                                                                                                                         |
| `--ui-field-label-color`        | `var(--ui-text-strong)`                                                                                                                                                    | Text color for field labels.                                                                                                                                                                                               |
| `--ui-field-label-font-weight`  | `var(--ui-font-weight-semibold)`                                                                                                                                           | Font weight for emphasized field labels and legends.                                                                                                                                                                       |
| `--ui-field-required-color`     | `var(--ui-invalid-text)`                                                                                                                                                   | Color of the required asterisk.                                                                                                                                                                                            |
| `--ui-font-size-small`          | `var(--ui-font-size-200)`                                                                                                                                                  | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                    |
| `--ui-invalid-text`             | `light-dark( oklch(from var(--ui-invalid) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-invalid) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Color for validation messages and invalid labels. `--ui-invalid` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, so it stays readable where `--ui-invalid` is lighter for borders. |
| `--ui-line-height`              | `1.5`                                                                                                                                                                      | Line height of interface text: labels, helpers, choice labels and field hints.                                                                                                                                             |
| `--ui-space-1`                  | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-2`                  | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-3`                  | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                              | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-4`                  | `calc(var(--size-4) * var(--ui-space-scale))`                                                                                                                              | Spacing step 4: Open Props `--size-4` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-5`                  | `calc(var(--size-5) * var(--ui-space-scale))`                                                                                                                              | Spacing step 5: Open Props `--size-5` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-space-8`                  | `calc(var(--size-8) * var(--ui-space-scale))`                                                                                                                              | Spacing step 8: Open Props `--size-8` times `--ui-space-scale`.                                                                                                                                                            |
| `--ui-text-muted`               | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                          | Body text color.                                                                                                                                                                                                           |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### choice.css

| Property         | Kind   | Description                                                                                                                                                                                         |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_accent`      | Input  | Fill and border of the checked input. `--ui-choice-accent` when the theme sets it, otherwise `--ui-primary` with its lightness capped in dark mode, and `--ui-invalid` when invalid.                |
| `--_duration`    | Output | Duration of the transitions, `--ui-duration` times `--_motion`.                                                                                                                                     |
| `--_ease`        | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                                 |
| `--_input-size`  | Input  | Width and height of the checkbox and radio input, which the label centers on. Defaults to `--ui-choice-size`, set by the size classes.                                                              |
| `--_motion`      | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                                          |
| `--_on-accent`   | Input  | Color of the checkmark, dash and dots on `--_accent`. `--ui-choice-on-accent` when the theme sets it, otherwise `--ui-on-primary`, or `--ui-on-accent` in dark mode. `--ui-on-accent` when invalid. |
| `--_ripple-size` | Input  | Size of the hover ripple of checkboxes and radios, relative to the input. Set on `input`.                                                                                                           |
| `--_thumb-scale` | Output | Current scale of the ripple. Set by the hover and active states.                                                                                                                                    |

### radio.css

| Property        | Kind   | Description                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------------- |
| `--_accent`     | Input  | Fill and border of the checked circle. `SelectedItem` in forced colors.                 |
| `--_dot-radius` | Output | Radius of the checked dot, computed from `--_input-size` and `--ui-field-border-width`. |
| `--_on-accent`  | Input  | Color of the dot on `--_accent`. `SelectedItemText` in forced colors.                   |

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
    var(--ui-primary),
    oklch(from var(--ui-primary) min(l, 0.62) c h)
  );
  --accent-contrast: light-dark(var(--ui-on-primary), var(--ui-on-accent));

  appearance: none;
  aspect-ratio: 1;
  background-color: var(--ui-surface-default);
  block-size: 1.25rem;
  border: var(--ui-field-border-width) solid var(--ui-field-border-color);
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
  opacity: var(--ui-disabled-opacity);
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

### Dependencies

- [Form](https://open-props-ui.netlify.app/html/components/form.md)

* `opui-css/css/components/radio.css`
* `opui-css/css/components/choice.css`
* `opui-css/css/components/form.css`

## Changelog

### What's new

- The unchecked ring, [`--ui-field-border-color`](#api), reaches 3:1 against the page by default.
- The checked fill and dot read [`--ui-choice-accent`](#api) and `--ui-choice-on-accent` when a theme sets them.
- [Radios](#sizes) are 20px, the same `--ui-choice-size` as Checkbox.
- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size` and `--thumb-scale` is `--_thumb-scale`. `--isLTR` and `--isRTL` are gone, the halo centers itself ([Under the hood](#under-the-hood)).
- Without a visible label, radios [center](#label-alignment) in table cells and lines of text, and stay a 24px click target at every size.
- [Spread](#spread) with `.ui-spread`, like Checkbox and Switch.
- Breaking: mark an invalid group with `aria-invalid="true"` on each radio instead of `data-invalid` on the fieldset ([Validation](#field-group-validation)).
- Takes `.ui-x-small`. [Sizes](#sizes)
- Breaking: [`choice.css`](#basics) holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Switch.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).

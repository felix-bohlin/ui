# Checkbox

Use a Checkbox for choices that are submitted with a form. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/astro/components/switch.md), and for options in a toolbar a [Toggle](https://open-props-ui.netlify.app/astro/components/toggle.md). See also: [Checkbox field group](#field-group).

### What's new

- [Lines up](#label-alignment) with the first line of the label and centers on its capitals in any font.
- Breaking: `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_thumb-scale`, and `--isLTR` and `--isRTL` are `--_dir-rtl`.
- Without a visible label, checkboxes center in table cells and lines of text.

## Anatomy

Label End text

- `<Checkbox>`

  Container element.

- `<input>`

  The checkbox input.

- `slot="default"`

  The label.

- `slot="end-text"`

  Supporting text displayed below the label.

## Basics

```astro
---
import { Checkbox } from "opui-css/astro"
---


<Checkbox checked name="checkbox-variants" hideLabel>Checked</Checkbox>
<Checkbox name="checkbox-variants" hideLabel>Unchecked</Checkbox>
<Checkbox indeterminate name="checkbox-variants" hideLabel
  >Indeterminate</Checkbox
>
<Checkbox disabled name="checkbox-variants" hideLabel>Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-variants" hideLabel
  >Checked and disabled</Checkbox
>
```

## Sizes

```astro
---
import { Checkbox } from "opui-css/astro"
---


<div class="example-row">
  <Checkbox hideLabel size="small" checked name="checkbox-sizes">Label</Checkbox
  >
  <Checkbox hideLabel checked name="checkbox-sizes">Label</Checkbox>
  <Checkbox hideLabel size="large" checked name="checkbox-sizes">Label</Checkbox
  >
</div>
<div class="example-row">
  <Checkbox size="small" checked name="checkbox-sizes">Small</Checkbox>
  <Checkbox checked name="checkbox-sizes">Default</Checkbox>
  <Checkbox size="large" checked name="checkbox-sizes">Large</Checkbox>
</div>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```astro
---
import { Checkbox } from "opui-css/astro"
---


<Checkbox checked name="checkbox-visible-label">Choice A</Checkbox>
<Checkbox disabled name="checkbox-visible-label">Disabled</Checkbox>
<Checkbox checked disabled name="checkbox-visible-label"
  >Checked and disabled</Checkbox
>
<Checkbox name="checkbox-visible-label">
  Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
  semiotics artisan synth stumptown gastropub cornhole{" "}
  <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
</Checkbox>
```

### Label position

```astro
---
import { Checkbox } from "opui-css/astro"
---


<Checkbox name="checkbox-label-position">Default</Checkbox>
<Checkbox stack name="checkbox-label-position">Stack</Checkbox>
```

### End text

```astro
---
import { Checkbox } from "opui-css/astro"
---


<Checkbox name="checkbox-supporting-text">
  Default
  <Fragment slot="end-text">Supporting text</Fragment>
</Checkbox>
<Checkbox stack name="checkbox-supporting-text">
  Stack
  <Fragment slot="end-text">Supporting text</Fragment>
</Checkbox>
```

### Validation

- Set `required` on the component to toggle required styles on the input.
- Use the `error` prop to toggle invalid styles. It renders `data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```astro
---
import { Checkbox } from "opui-css/astro"
---


<div class="example-row ui-spacious">
  <Checkbox required name="checkbox-validation">Default</Checkbox>
  <Checkbox stack required name="checkbox-validation">Stack</Checkbox>
</div>
<div class="example-row ui-spacious">
  <Checkbox error checked name="checkbox-validation">
    Default
    <Fragment slot="end-text">Check yourself</Fragment>
  </Checkbox>
  <Checkbox stack error name="checkbox-validation">
    Stack
    <Fragment slot="end-text">Before you wreck yourself</Fragment>
  </Checkbox>
</div>
```

## Indeterminate

Set the `indeterminate` prop to render a partially-selected state. `indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

### JavaScript required

The `indeterminate` state cannot be set with HTML or CSS alone. The browser only exposes it as a property on `HTMLInputElement`, so a small script is needed to flip `el.indeterminate = true` after the element is in the DOM. The `:indeterminate` CSS pseudo-class then matches and the dash glyph appears.

```astro
---
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/astro"
---


<FieldSet class="indeterminate-demo">
  <FieldLegend>
    <Checkbox class="parent" indeterminate>Select all</Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children">
    <Checkbox class="child" checked>Apples</Checkbox>
    <Checkbox class="child">Bananas</Checkbox>
    <Checkbox class="child">Cherries</Checkbox>
  </FieldGroup>
</FieldSet>


<script>
  function setupIndeterminateDemo() {
    document
      .querySelectorAll<HTMLElement>(".indeterminate-demo")
      .forEach((root) => {
        const parent = root.querySelector<HTMLInputElement>(
          '.parent input[type="checkbox"]',
        )
        const children = Array.from(
          root.querySelectorAll<HTMLInputElement>(
            '.child input[type="checkbox"]',
          ),
        )
        if (!parent || children.length === 0) return


        const sync = () => {
          const checkedCount = children.filter((c) => c.checked).length
          parent.checked = checkedCount === children.length
          parent.indeterminate =
            checkedCount > 0 && checkedCount < children.length
        }


        parent.addEventListener("change", () => {
          children.forEach((c) => (c.checked = parent.checked))
          parent.indeterminate = false
        })
        children.forEach((c) => c.addEventListener("change", sync))
        sync()
      })
  }


  setupIndeterminateDemo()
  document.addEventListener("astro:after-swap", setupIndeterminateDemo)
</script>
```

## Spread

Use the `spread` prop to push the label to the left and the checkbox to the right. This is useful for full-width items like lists and menus.

```astro
---
import { Checkbox } from "opui-css/astro"
---


<Checkbox name="checkbox-spread" spread>
  Accept Terms & Conditions
  <Fragment slot="end-text"
    >I have read and agree to the privacy policy.</Fragment
  >
</Checkbox>


<Checkbox name="checkbox-spread" spread required>
  Required
  <Fragment slot="end-text">You must accept this to continue.</Fragment>
</Checkbox>


<Checkbox name="checkbox-spread" spread disabled>
  Disabled
  <Fragment slot="end-text">This checkbox is disabled.</Fragment>
</Checkbox>


<Checkbox name="checkbox-spread" spread error>
  Invalid Checkbox
  <Fragment slot="end-text">There is an error with this checkbox.</Fragment>
</Checkbox>
```

## Label alignment

The checkbox lines up with the first line of its label and centers on the label's capital letters, so it looks centered in any font and at any size. If a font still looks off, nudge the label with `--choice-label-offset`, in `em` or `cap` so it scales with the label.

```css
:root {
  --choice-label-offset: 0.05em;
}
```

## Field group

Use field groups to group related checkboxes.

The `name` prop will get passed down to each checkbox in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/astro/components/form.md).

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="checkbox-group">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
```

### Direction

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-direction">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
```

### Field description

Can be placed above and below the fields.

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldDescription } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldDescription>Field description above fields</FieldDescription>
    <FieldGroup direction="row" name="checkbox-group-field-description-1">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>


  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-field-description-2">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-disabled">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
```

### Required

Each checkbox with `required` must be checked before the form submits. There's no native "at least one" for checkboxes.

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-required">
      <Checkbox required>Checkbox 1</Checkbox>
      <Checkbox required>Checkbox 2</Checkbox>
      <Checkbox required>Checkbox 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
```

### Validation

Attach the `data-invalid` attribute to your `FieldSet` component.

```astro
---
import { Checkbox } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet data-invalid="">
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="checkbox-group-validation">
      <Checkbox checked>Checkbox 1</Checkbox>
      <Checkbox>Checkbox 2</Checkbox>
      <Checkbox>Checkbox 3</Checkbox>
    </FieldGroup>
    <span class="ui-end-text">Something went wrong!</span>
  </FieldSet>
</Form>
```

## Accessibility

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add an `aria-label` on the input element                          | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

| Key     | Function                                       |
| ------- | ---------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Prop            | Type                  | Default | Description                                                                          |
| --------------- | --------------------- | ------- | ------------------------------------------------------------------------------------ |
| `error`         | `boolean`             | `false` | Shows error styles.                                                                  |
| `hideLabel`     | `boolean`             | `false` | Visually hides the label.                                                            |
| `indeterminate` | `boolean`             | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `size`          | `"small"` , `"large"` | -       | The size of the element.                                                             |
| `spread`        | `boolean`             | `false` | Pushes the label and the input to opposite ends.                                     |
| `stack`         | `boolean`             | `false` | Stacks the label under the input.                                                    |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--border-color`             | `light-dark(var(--gray-4), var(--gray-12))`                                             | Default border color for cards, lists, tables and dividers.                                                                                           |
| `--choice-label-offset`      | `0px`                                                                                   | Moves `Checkbox`, `Radio` and `Switch` labels down (positive) or up (negative) against their control. Use `em` or `cap` to scale with the label font. |
| `--choice-size`              | `var(--size-4)`                                                                         | Default `Checkbox` and `Radio` input size.                                                                                                            |
| `--choice-size-large`        | `var(--size-5)`                                                                         | `Checkbox` and `Radio` input size with `.ui-large`.                                                                                                   |
| `--choice-size-small`        | `var(--size-3)`                                                                         | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                 |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                                                 |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                                            |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                                                     |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                                                      |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                                                    |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                                                          |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                                           |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                                                  |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                                                  |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.                             |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                                                          |
| `--primary-contrast`         | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )`   | Text color on a `--primary` background.                                                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                                             |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                                                |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `checked`, `disabled`, `name` and `required`, go to the `<input>`. Without a visible label, keep the text in the slot and set `hideLabel`.

### Field group API

| Prop        | Type                 | Default | Description                                                                                                                         |
| ----------- | -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `direction` | `"row"` , `"column"` | -       | The orientation of the element.                                                                                                     |
| `name`      | `string`             | -       | Sets `name` on the fields inside. Skips button, hidden, image, reset and submit inputs. In Svelte and Vue, only on OPUI components. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

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
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                  |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                     |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                      |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable. |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                          |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Appearance

   - `appearance: none` drops the native box, the input keeps focus, keyboard and form value
   - `:checked` still matches: the fill is plain CSS

2. Checkmark

   - Without native appearance the input can take a `::after`
   - The check is a `clip-path: polygon()` over a solid fill, no SVG
   - Points in percentages, so it scales with the box

3. Indeterminate

   - Same pseudo-element, a different polygon: a dash
   - `indeterminate` is a JavaScript-only property, there is no attribute
   - The component renders `data-indeterminate` and sets the property on load

4. Label

   - The `<label>` wraps the input, so the text is part of the hit area
   - `:has(:disabled)` dims the whole row from the input's state
   - `text-box: trim-start cap` + a `1cap` offset centers the capitals on the box
   - Drag the size: the text stays centered

Step 1 of 4: Appearance

- [`appearance` ](https://webstatus.dev/features/appearance)(Widely available): Chrome 84+, Edge 84+, Firefox 80+, Safari 15.4+

```css
.checkbox {
  appearance: none;
  aspect-ratio: 1;
  background-color: var(--surface-default);
  block-size: var(--size);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-1);
  box-sizing: border-box;
  display: grid;
  inline-size: var(--size);
  margin: 0;
  position: relative;
}


.checkbox:checked {
  background-color: var(--primary);
  border-color: var(--primary);
}
```

Step 2 of 4: Checkmark

- [`clip-path` ](https://webstatus.dev/features/clip-path)(Widely available): Chrome 88+, Edge 88+, Firefox 71+, Safari 13.1+

```css
.checkbox::after {
  background-color: var(--primary-contrast);
  clip-path: polygon(15% 52%, 40% 77%, 85% 32%, 75% 22%, 40% 57%, 25% 42%);
  content: "";
  inset: 0;
  opacity: 0;
  position: absolute;
}


.checkbox:checked::after {
  opacity: 1;
}
```

Step 3 of 4: Indeterminate

- [`:indeterminate` ](https://webstatus.dev/features/indeterminate)(Widely available): Chrome 39+, Edge 79+, Firefox 51+, Safari 10+

```html
<input class="checkbox" type="checkbox" data-indeterminate />


<script>
  for (const input of document.querySelectorAll("[data-indeterminate]")) {
    input.indeterminate = true
  }
</script>
```

```css
.checkbox:indeterminate {
  background-color: var(--primary);
  border-color: var(--primary);
}


.checkbox:indeterminate::after {
  clip-path: polygon(20% 45%, 80% 45%, 80% 55%, 20% 55%);
  opacity: 1;
}
```

Step 4 of 4: Label

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`text-box` ](https://webstatus.dev/features/text-box)(Limited availability): Chrome 133+, Edge 133+, Firefox not supported, Safari 18.2+

```css
.label {
  align-items: start;
  cursor: pointer;
  display: inline-grid;
  gap: 0 0.5rem;
  grid-auto-flow: column;
}


.label:has(:disabled) {
  cursor: not-allowed;
  opacity: var(--disabled-opacity);
}


.label > span {
  margin-block-start: calc((var(--size) - 1cap) / 2);
  text-box: trim-start cap alphabetic;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Checkbox.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`


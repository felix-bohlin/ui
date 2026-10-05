# Select

Leverages the [List component](https://open-props-ui.netlify.app/astro/components/list.md) to provide markup for the Select popover.

### What's new

- [X-small and large](#sizes) sizes with the `size` prop.
- [Spread](#spread) fields line up at one width.
- [Preselect](#preselected) options with `value` or `selected` on an item.

## Anatomy

LabelDescriptionOption one (1)¢EURHeaderFooterSupporting text

- `<Select>`

  Container element.

- `slot="label"`

  The label for the field.

- `slot="description"`

  Description text displayed above the field.

- `.ui-field`

  The boxed select area.

- `slot="header"`

  Content above the select, inside the border, with a divider.

- `slot="prefix"`

  Content at the inline-start of the field, inside the border.

- `<select>`

  The select. Its options are in a popover list.

- `slot="suffix"`

  Content at the inline-end of the field, inside the border.

- `slot="footer"`

  Content below the select, inside the border, with a divider.

- `slot="end-text"`

  Supporting text displayed below the field.

## Variants

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Label">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>


<Select label="Label" variant="filled">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## End text

`.ui-end-text`: end text element

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Label" endText="Supporting text">
  <option value="">-</option>
  <option>Outlined (default)</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>


<Select label="Label" variant="filled" endText="Supporting text">
  <option value="">-</option>
  <option>Filled</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Affix

Use the `prefix` and `suffix` slots to affix icons or short text alongside the select inside the field's border.

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="Currency">
  <Fragment slot="prefix">¢</Fragment>
  <option value="">-</option>
  <option>EUR</option>
  <option>EUR</option>
  <option>SEK</option>
</Select>


<Select label="Country">
  <svg
    slot="prefix"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M2 12h20"></path>
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
    ></path>
  </svg>
  <option value="">-</option>
  <option>Sweden</option>
  <option>Norway</option>
  <option>Denmark</option>
</Select>
```

## Preselected

Set `value` to preselect an option, or`selected: true` on an item.

```astro
---
import { Select } from "opui-css/astro"
---


<Select
  label="Role"
  items={[
    { text: "Designer", value: "designer" },
    { text: "Developer", value: "developer" },
    { text: "Manager", value: "manager" },
  ]}
  value="developer"
/>


<Select
  label="Team"
  items={[
    { text: "Design", value: "design" },
    { selected: true, text: "Engineering", value: "engineering" },
    { text: "Sales", value: "sales" },
  ]}
/>
```

## Validation

- Set `required` on the component to toggle required styles on the select.
- Use the `error` prop to toggle invalid styles. It renders the `data-invalid` attribute on the root element. Make use of the end text to give extra feedback on the error.

```astro
---
import { Select } from "opui-css/astro"
---


<div class="example-row">
  <Select label="Label" required>
    <option value="">-</option>
    <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </Select>


  <Select label="Label" variant="filled" required>
    <option value="">-</option>
    <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </Select>
</div>


<div class="example-row">
  <Select label="Label" error endText="Supporting text">
    <option value="">-</option>
    <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </Select>


  <Select label="Label" variant="filled" error endText="Supporting text">
    <option value="">-</option>
    <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </Select>
</div>
```

## Spread

Use the `spread` boolean prop to display the label and description on the left with the select on the right. The layout collapses to a column on narrow containers.

```astro
---
import { Select } from "opui-css/astro"
---


<Select spread>
  <Fragment slot="label">Country</Fragment>
  <Fragment slot="description">Select your country of residence</Fragment>
  <option value="">Select a country</option>
  <option>Denmark</option>
  <option>Finland</option>
  <option>Iceland</option>
  <option>Norway</option>
  <option>Sweden</option>
</Select>


<Select spread variant="filled">
  <Fragment slot="label">Language</Fragment>
  <Fragment slot="description">Choose your preferred language</Fragment>
  <Fragment slot="end-text">This affects UI translations</Fragment>
  <option value="">Select a language</option>
  <option>Danish</option>
  <option>Finnish</option>
  <option>Icelandic</option>
  <option>Norwegian</option>
  <option>Swedish</option>
</Select>


<Select spread required>
  <Fragment slot="label">Required</Fragment>
  <Fragment slot="description">You must select an option</Fragment>
  <option value="">Select an option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</Select>


<Select spread disabled>
  <Fragment slot="label">Disabled</Fragment>
  <Fragment slot="description">This select is disabled</Fragment>
  <option>Option 1</option>
</Select>


<Select spread error>
  <Fragment slot="label">Invalid Select</Fragment>
  <Fragment slot="description">This select has an error</Fragment>
  <Fragment slot="end-text">Please select a valid option.</Fragment>
  <option>Option 1</option>
</Select>


<Select spread>
  <Fragment slot="label">Currency</Fragment>
  <Fragment slot="description">Used for billing</Fragment>
  <Fragment slot="prefix">¢</Fragment>
  <option value="">-</option>
  <option>EUR</option>
  <option>EUR</option>
  <option>SEK</option>
</Select>


<Select spread variant="filled">
  <Fragment slot="label">Region</Fragment>
  <Fragment slot="description">Affects data residency and latency</Fragment>
  <Fragment slot="prefix">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  </Fragment>
  <Fragment slot="end-text">Cannot be changed after deploy</Fragment>
  <option value="">-</option>
  <option>eu-north-1</option>
  <option>us-east-1</option>
  <option>ap-southeast-1</option>
</Select>
```

## Sizes

```astro
---
import { Select } from "opui-css/astro"
---


<Select label="X-small" size="x-small">
  <option value="">X-small</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
<Select label="Small" size="small">
  <option value="">Small</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
<Select label="Default">
  <option value="">Default</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
<Select label="Large" size="large">
  <option value="">Large</option>
  <option>Option Two</option>
  <option>Option Three</option>
</Select>
```

## Classic select

Bog-standard native HTML `<select>` without customized option list.

```astro
---
import { ClassicSelect } from "opui-css/astro"
---


<ClassicSelect label="Label">
  <option value="">-</option>
  <option>Option 1</option>
  <option>Option 2</option>
</ClassicSelect>


<ClassicSelect label="Label" variant="filled">
  <option value="">-</option>
  <option>Option 1</option>
  <option>Option 2</option>
</ClassicSelect>
```

## API

### Select API

| Prop          | Type                              | Default      | Description                                                               |
| ------------- | --------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `dense`       | `boolean`                         | `false`      | Packs the options tighter.                                                |
| `description` | `string`                          | -            | Description text displayed above the field.                               |
| `endText`     | `string`                          | -            | Supporting text displayed below the field.                                |
| `error`       | `boolean`                         | `false`      | Shows error styles.                                                       |
| `id`          | `string`                          | -            | The id of the `<select>`.                                                 |
| `items`       | `Item[]`                          | `[]`         | The options, as `{ selected, text, value }` objects.                      |
| `label`       | `string`                          | -            | The label for the field.                                                  |
| `size`        | `"x-small"`, `"small"`, `"large"` | -            | The size of the element.                                                  |
| `spread`      | `boolean`                         | `false`      | Pushes the label and description to one side and the select to the other. |
| `variant`     | `"outlined"`, `"filled"`          | `"outlined"` | The variant to use.                                                       |

#### Slots

| Slot          | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `default`     | Extra `<option>` and `<optgroup>` elements.                  |
| `description` | Description text displayed above the field.                  |
| `end-text`    | Supporting text displayed below the field.                   |
| `footer`      | Content below the select, inside the border, with a divider. |
| `header`      | Content above the select, inside the border, with a divider. |
| `label`       | The label for the field.                                     |
| `prefix`      | Content at the inline-start of the field, inside the border. |
| `suffix`      | Content at the inline-end of the field, inside the border.   |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                   |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                               |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.

### Classic Select API

| Prop      | Type                              | Default      | Description                                       |
| --------- | --------------------------------- | ------------ | ------------------------------------------------- |
| `endText` | `string`                          | -            | Supporting text displayed below the field.        |
| `error`   | `boolean`                         | `false`      | Shows error styles.                               |
| `id`      | `string`                          | -            | The id of the `<select>`. Generated when omitted. |
| `items`   | `Item[]`                          | `[]`         | The options, as `{ text, value }` objects.        |
| `label`   | `string`                          | -            | The label for the field.                          |
| `size`    | `"x-small"`, `"small"`, `"large"` | -            | The size of the element.                          |
| `variant` | `"outlined"`, `"filled"`          | `"outlined"` | The variant to use.                               |

#### Slots

| Slot      | Description                                 |
| --------- | ------------------------------------------- |
| `default` | Extra `<option>` and `<optgroup>` elements. |

#### CSS variables

| Variable                     | Default                                                                                 | Description                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--disabled-opacity`         | `0.64`                                                                                  | Opacity applied to disabled controls.                                                                                      |
| `--duration`                 | `0.2s`                                                                                  | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--ease`                     | `ease`                                                                                  | Default easing for transitions.                                                                                            |
| `--field-border-color`       | `var(--border-color)`                                                                   | Border color for `TextField`, `Select`, `Textarea`, `Radio` and `Range`.                                                   |
| `--field-border-radius`      | `var(--size-2)`                                                                         | Corner radius for fields.                                                                                                  |
| `--field-border-width`       | `1px`                                                                                   | Border width for fields, `Checkbox`, `Radio` and `Switch`.                                                                 |
| `--field-helper-color`       | `var(--text-muted)`                                                                     | Text color for helper and end text under a field.                                                                          |
| `--field-helper-font-size`   | `var(--font-size-0)`                                                                    | Font size for helper and end text under a field.                                                                           |
| `--field-helper-line-height` | `var(--font-lineheight-3)`                                                              | Line height for helper and end text under a field.                                                                         |
| `--field-label-color`        | `var(--text-primary)`                                                                   | Text color for field labels.                                                                                               |
| `--field-label-font-size`    | `var(--font-size-05)`                                                                   | Font size for field labels.                                                                                                |
| `--field-label-font-weight`  | `var(--font-weight-semibold)`                                                           | Font weight for emphasized field labels and legends.                                                                       |
| `--field-required-color`     | `var(--invalid-text-color)`                                                             | Color of the required asterisk.                                                                                            |
| `--field-size`               | `var(--control-size)`                                                                   | Default field height.                                                                                                      |
| `--field-size-large`         | `var(--control-size-large)`                                                             | Field height with `.ui-large`.                                                                                             |
| `--field-size-small`         | `var(--control-size-small)`                                                             | Field height with `.ui-small`.                                                                                             |
| `--field-size-x-small`       | `var(--control-size-x-small)`                                                           | Field height with `.ui-x-small`.                                                                                           |
| `--focus-ring-inset`         | `calc(-1 * var(--focus-ring-width))`                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--focus-ring-width`         | `2px`                                                                                   | Width of the focus ring.                                                                                                   |
| `--font-size-05`             | `0.875rem`                                                                              | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-medium`       | `var(--font-weight-5)`                                                                  | Font weight for badges, overlines and group labels.                                                                        |
| `--icon-size`                | `var(--size-4)`                                                                         | Default icon size inside components.                                                                                       |
| `--invalid-color`            | `var(--critical)`                                                                       | Color for invalid field borders, fills and outlines.                                                                       |
| `--invalid-text-color`       | `light-dark( var(--invalid-color), oklch(from var(--invalid-color) max(l, 0.75) c h) )` | Color for validation messages and invalid labels. Lighter than `--invalid-color` in dark mode so the text stays readable.  |
| `--motion`                   | `1`                                                                                     | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                  | `light-dark(var(--color-9), var(--color-6))`                                            | Brand color for primary actions and accents.                                                                               |
| `--surface-default`          | `light-dark(var(--gray-1), var(--gray-13))`                                             | Page and card background.                                                                                                  |
| `--surface-elevated`         | `light-dark(var(--gray-1), var(--gray-12))`                                             | Background of elevated cards and accordions.                                                                               |
| `--surface-filled`           | `light-dark(var(--gray-4), var(--gray-15))`                                             | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`            | `light-dark(var(--gray-3), var(--gray-12))`                                             | Background of tonal variants.                                                                                              |
| `--text-muted`               | `light-dark(var(--gray-13), var(--gray-4))`                                             | Body text color.                                                                                                           |
| `--text-primary`             | `light-dark(var(--gray-15), var(--gray-1))`                                             | Emphasized text color for headings, labels and values.                                                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

Other attributes, such as `disabled`, `multiple`, `name` and `required`, go to the `<select>`.

## Under the hood

1. Base select

   - `appearance: base-select` on the select and its picker opts in to the stylable version
   - The `<button>` is the trigger, `<selectedcontent>` mirrors the chosen option
   - Browsers without support ignore the button and render a native select

2. Arrow

   - `::picker-icon` is the arrow, redrawn here as a border triangle
   - `:open` matches while the picker is showing, so the arrow flips

3. Picker

   - `::picker(select)` is the dropdown, a popover anchored to the select
   - Options are ordinary boxes now: padding, `:hover`, `:checked`
   - `::checkmark` hidden, the checked background marks the choice
   - Open the select

4. Animate

   - `@starting-style` gives the entry transition a starting point
   - `allow-discrete` keeps `display` and `overlay` alive during the exit
   - `:not(:open)` is the exit state

Step 1 of 4: Base select

- [Customizable \<select>](https://webstatus.dev/features/customizable-select) (Limited availability): Chrome 135+, Edge 135+, Firefox not supported, Safari not supported

```html
<select class="select">
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
    <option value="apple">Apple</option>
    …
  </div>
</select>
```

```css
.select,
.select::picker(select) {
  appearance: base-select;
}


.select {
  background-color: var(--surface-default);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  inline-size: 100%;
  padding: 0;
}


.select > button {
  align-items: center;
  display: flex;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
}


selectedcontent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Step 2 of 4: Arrow

- [`:open`](https://webstatus.dev/features/open-pseudo) (Newly available): Chrome 133+, Edge 133+, Firefox 136+, Safari 26.5+

```css
.select {
  position: relative;
}


.select::picker-icon {
  block-size: 0;
  border-block-start: 5px solid;
  border-inline: 5px solid transparent;
  content: "";
  inline-size: 0;
  inset-block: 50% auto;
  inset-inline: auto 0.75rem;
  position: absolute;
  translate: 0 -50%;
}


.select:open::picker-icon {
  rotate: 180deg;
}
```

Step 3 of 4: Picker

- [Relative colors](https://webstatus.dev/features/relative-color) (Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.select::picker(select) {
  border: 0;
  box-shadow: var(--shadow-2);
  padding: 0;
}


.list {
  background-color: var(--surface-filled);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2);
  padding: 0.5rem 0;
}


.list > option {
  padding: 0.5rem 0.75rem;
}


.list > option:hover {
  background-color: oklch(from var(--primary) l c h / 15%);
}


.list > option:checked {
  background-color: oklch(from var(--primary) l c h / 30%);
}


.list > option::checkmark {
  display: none;
}
```

Step 4 of 4: Animate

- [`@starting-style`](https://webstatus.dev/features/starting-style) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.5+
- [`transition-behavior`](https://webstatus.dev/features/transition-behavior) (Newly available): Chrome 117+, Edge 117+, Firefox 129+, Safari 17.4+

```css
.select::picker(select) {
  opacity: 1;
  scale: 1;
  transition:
    display 0.2s allow-discrete,
    opacity 0.2s,
    overlay 0.2s allow-discrete,
    scale 0.2s;


  @starting-style {
    opacity: 0;
    scale: 0.9;
  }
}


.select:not(:open)::picker(select) {
  opacity: 0;
  scale: 0.9;
}
```

## Browser support

- Chromium: Full support Supported since v135.
- Firefox: Partial support Missing: customizable-select, display-animation, overlay.
- Safari: Partial support Missing: customizable-select, overlay.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Select.md).

## Installation

### Dependencies

- [Text Field](https://open-props-ui.netlify.app/astro/components/text-field.md)
- [Description List](https://open-props-ui.netlify.app/astro/components/description-list.md)

- `opui-css/css/components/text-field.css`
- `opui-css/css/components/select.css`
- `opui-css/css/components/list.css`

## See also

- [Customizable select (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

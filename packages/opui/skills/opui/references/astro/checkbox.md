# Checkbox

See also: [Checkbox field group](#field-group).

## Anatomy

LabelEnd text

- `<Checkbox>`

  Container element.

- `<input>`

  The checkbox input.

- `slot="default"`

  The label.

- `slot="end-text"`

  Supporting text displayed below the label.

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
  semiotics artisan synth stumptown gastropub cornhole
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
- Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

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

Set the `indeterminate` prop to render a partially-selected state.`indeterminate` is a JavaScript-only property on `HTMLInputElement`, so the component renders `data-indeterminate` and applies the property at runtime.

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

Attach the `required` attribute to at least one of your `<input>` elements.

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

Attach the `data-invalid` attribute to your `Fieldset` component.

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

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add a `aria-label` on the input element                           | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

| Key     | Function                                                  |
| ------- | --------------------------------------------------------- |
| `Space` | When Checkbox is focused it changes its state.            |
| `Enter` | (Optional) When Checkbox is focused it changes its state. |

## API

### Checkbox API

| Prop            | Type                 | Default | Description                                                                          |
| --------------- | -------------------- | ------- | ------------------------------------------------------------------------------------ |
| `error`         | `boolean`            | `false` | Shows error styles.                                                                  |
| `hideLabel`     | `boolean`            | `false` | Visually hides the label.                                                            |
| `indeterminate` | `boolean`            | `false` | Shows a partially checked state. Sets the `indeterminate` property on the `<input>`. |
| `size`          | `"small"`, `"large"` | -       | The size of the element.                                                             |
| `spread`        | `boolean`            | `false` | Pushes the label and the input to opposite ends.                                     |
| `stack`         | `boolean`            | `false` | Stacks the label under the input.                                                    |

#### Slots

| Slot       | Description                                |
| ---------- | ------------------------------------------ |
| `default`  | The label.                                 |
| `end-text` | Supporting text displayed below the label. |

Other attributes, such as `checked`, `disabled`, `name` and `required`, go to the `<input>`.

### Field group API

| Prop        | Type                | Default | Description                                             |
| ----------- | ------------------- | ------- | ------------------------------------------------------- |
| `direction` | `"row"`, `"column"` | -       | The orientation of the element.                         |
| `name`      | `string`            | -       | Sets `name` on every input, select and textarea inside. |

#### Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `default` | The fields, such as checkboxes, radios or switches. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Installation

### See also

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

- `opui-css/css/components/checkbox.css`
- `opui-css/css/components/form.css`


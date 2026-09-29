# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/astro/components/form.md).

**Quick start**

Run `npm install opui-css open-props`, then import the component and its styles.

```astro
---
import "opui-css/css/components/radio.css"
import { Radio, RadioInput } from "opui-css/astro"
---
```

[Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) · [CSS source](#installation)

The `name` prop will get passed down to each radio button in the group.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="fieldset-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
```

## Direction

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="fieldset-direction-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
```

## Field description

Can be placed above and below the fields.

```astro
---
import { Radio } from "opui-css/astro"
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
    <FieldGroup direction="row" name="fieldset-field-description-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>


  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="fieldset-field-description-2-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
    <FieldDescription>Field description below fields</FieldDescription>
  </FieldSet>
</Form>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet disabled>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="fieldset-disabled-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
```

## Required

Set `required` on at least one `Radio` in the group.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet>
    <FieldLegend>These are required!</FieldLegend>
    <FieldGroup direction="row" name="fieldset-required-1-astro">
      <Radio required>Radio 1</Radio>
      <Radio required>Radio 2</Radio>
      <Radio required>Radio 3</Radio>
    </FieldGroup>
  </FieldSet>
</Form>
```

## Validation

Attach the `data-invalid` attribute to your `Fieldset` component.

```astro
---
import { Radio } from "opui-css/astro"
import { FieldSet } from "opui-css/astro"
import { FieldLegend } from "opui-css/astro"
import { FieldGroup } from "opui-css/astro"
import { Form } from "opui-css/astro"
---


<Form>
  <FieldSet data-invalid>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup direction="row" name="field-group-validation-1-astro">
      <Radio checked>Radio 1</Radio>
      <Radio>Radio 2</Radio>
      <Radio>Radio 3</Radio>
    </FieldGroup>
    <span class="ui-end-text">Something went wrong!</span>
  </FieldSet>
</Form>
```

## API

| Prop        | Type    | Default | Description                         |
| ----------- | ------- | ------- | ----------------------------------- |
| `direction` | `"row"` | -       | The orientation of the field group. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

### See also

- [Form](https://open-props-ui.netlify.app/astro/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`


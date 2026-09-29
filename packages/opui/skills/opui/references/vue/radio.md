# Radio

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```vue
<script setup lang="ts">
import "opui-css/css/components/radio.css"
import { Radio, RadioInput } from "opui-css/vue"
</script>
```

[Full setup guide](https://open-props-ui.netlify.app/vue/guide/getting-started.md)

The `name` prop will get passed down to each radio button in the group.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Direction

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Radio,
} from "opui-css/vue"
</script>


<template>
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
</template>
```

## Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Required

Add the `required` attribute on at least one `Radio`. It is forwarded to the underlying `<input>`.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
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
</template>
```

## Validation

Attach `data-invalid` to the `FieldSet` wrapper, or use the `error` prop on individual `Radio` components.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>


<template>
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
</template>
```

## API

| Prop        | Type    | Default | Description                         |
| ----------- | ------- | ------- | ----------------------------------- |
| `direction` | `"row"` | -       | The orientation of the field group. |

## Browser support

- Chromium: Full support Supported since v105.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v15.4.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

### See also

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

- `opui-css/css/components/radio.css`
- `opui-css/css/components/form.css`


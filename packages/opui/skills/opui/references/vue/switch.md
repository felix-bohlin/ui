# Switch

See also: [Switch field group](#field-group).

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/vue/guide/getting-started.md) for the full setup.

```vue
<script setup lang="ts">
import "opui-css/css/components/switch.css"
import { Switch, SwitchInput } from "opui-css/vue"
</script>
```

All switches should have an accessible name. Either provide a visible or visually-hidden label inside the component, or set `aria-label` on the input. Both approaches are fine.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch checked hideLabel>Label</Switch>
  <Switch hideLabel>Label</Switch>
  <Switch checked disabled hideLabel>Label</Switch>
  <Switch disabled hideLabel>Label</Switch>
</template>
```

## Visible label

Render the label text inside an element with a `.ui-label` class. Also, don't miss the info on label [accessibility](#accessibility).

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch>Label</Switch>
  <Switch disabled>Disabled</Switch>
  <Switch>
    Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas
    ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf meatball.
  </Switch>
</template>
```

### Label position

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch>Default</Switch>
  <Switch stack>Stack</Switch>
</template>
```

### End text

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch>
    Default
    <template #end-text>Supporting text</template>
  </Switch>
  <Switch stack>
    Stack
    <template #end-text>Supporting text</template>
  </Switch>
</template>
```

### Validation

- Add the `required` attribute on the component. It is forwarded to the underlying `<input>`.
- Use the `error` prop to toggle invalid styles. It renders`data-invalid` on the root element. Make use of the end text to give extra feedback on the error.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <div class="example-row ui-spacious">
    <Switch required>Default</Switch>
    <Switch required stack>Stack</Switch>
  </div>


  <div class="example-row ui-spacious">
    <Switch error>
      Default
      <template #end-text>Supporting text</template>
    </Switch>
    <Switch error stack>
      Stack
      <template #end-text>Supporting text</template>
    </Switch>
  </div>
</template>
```

## Spread

Use the `spread` prop to push the label to the left and the switch to the right. This is useful for full-width items like lists and menus.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch spread>
    Notifications
    <template #end-text>Receive alerts when someone mentions you.</template>
  </Switch>


  <Switch spread required>
    Required
    <template #end-text>You must accept this to proceed.</template>
  </Switch>


  <Switch spread disabled>
    Disabled
    <template #end-text>This switch is disabled.</template>
  </Switch>


  <Switch spread error>
    Invalid Switch
    <template #end-text>There is an error with this switch.</template>
  </Switch>
</template>
```

## Sizes

Set the `small` prop for a smaller Switch variant.

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <div class="example-row">
    <Switch small checked hideLabel>Small</Switch>
    <Switch checked hideLabel>Default</Switch>
  </div>
  <div class="example-row">
    <Switch small checked>Small</Switch>
    <Switch checked>Default</Switch>
  </div>
</template>
```

## Icons

```vue
<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>


<template>
  <Switch small aria-label="Toggle theme">
    <template #icon-unchecked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
        ></path></svg
    ></template>
    <template #icon-checked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
        ></path></svg
    ></template>
  </Switch>


  <Switch checked aria-label="Toggle theme">
    <template #icon-unchecked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A10 10 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146c1.233-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927a9.96 9.96 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662"
        ></path></svg
    ></template>
    <template #icon-checked
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 2m5 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m4.25.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zM12 19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 19m-7.75-6.25a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5zm-.03-8.53a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 0 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06m1.06 15.56a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 1 1 1.06 1.06zm14.5-15.56a.75.75 0 0 0-1.06 0l-1.5 1.5a.75.75 0 0 0 1.06 1.06l1.5-1.5a.75.75 0 0 0 0-1.06m-1.06 15.56a.75.75 0 1 0 1.06-1.06l-1.5-1.5a.75.75 0 1 0-1.06 1.06z"
        ></path></svg
    ></template>
  </Switch>
</template>
```

## Field group

Use field groups to group related switches.

The `name` prop will get passed down to each switch in the group.

See also: [Form documentation](https://open-props-ui.netlify.app/vue/components/form.md).

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form as="div">
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="switch-group-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Direction

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-direction-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Field description

Can be placed above and below the fields.

```vue
<script setup lang="ts">
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Form,
  Switch,
} from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup direction="row" name="switch-group-field-description-1-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>


    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-field-description-2-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </FieldSet>
  </Form>
</template>
```

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-disabled-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="switch-group-required-astro">
        <Switch required>Switch 1</Switch>
        <Switch required>Switch 2</Switch>
        <Switch required>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
```

### Validation

Attach the `data-invalid` attribute to your `Fieldset` component.

```vue
<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>


<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-validation-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
```

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

Accessible switches should have a label. The first two approaches are equally ok:

| Approach                                                       | Usage in Switch component                                                                                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Provide a label inside the element                             | Use a `.ui-label` child for a [visible label](#visible-label), or a `.ui-sr-only` child to hide it visually while keeping it accessible. In Astro, set the `hideLabel` prop to render the slot content as `.ui-sr-only`. |
| Add an `aria-label` on the input                               | Used when there's no visible label inside the component (e.g. icon-only switches). In Astro, pass `aria-label` as a prop on the component and it will land on the input.                                                 |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                                                                                                                                                                                                |

### Keyboard support

| Key     | Function                                                |
| ------- | ------------------------------------------------------- |
| `Space` | When Switch is focused it changes its state.            |
| `Enter` | (Optional) When Switch is focused it changes its state. |

## Anatomy

1. Container: `label` element
2. Switch: `& input type="checkbox" role="switch"`
3. Label (optional): & `.ui-label`
4. End text (optional): `.ui-end-text`

## API

### Switch API

### Field group API

## Browser support

- Chromium: Full support Supported since v123.
- Firefox: Full support Supported since v121.
- Safari: Full support Supported since v17.5.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Source

### See also

- [Form](https://open-props-ui.netlify.app/vue/components/form.md)

- `opui-css/css/components/switch.css`
- `opui-css/css/components/form.css`


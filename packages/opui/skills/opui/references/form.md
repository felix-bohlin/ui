# Form

Spacing and grouping for form fields.

- CSS: `opui-css/css/components/form.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/form.md), [Astro](https://open-props-ui.netlify.app/astro/components/form.md), [React](https://open-props-ui.netlify.app/react/components/form.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/form.md), [Vue](https://open-props-ui.netlify.app/vue/components/form.md).

## Form

### Parts

- `.ui-form` (root): Container element. Spaces its fieldsets and fields.

### Props and modifiers

- `as`: `"div" | "form"`, default `"form"`. The element to render.

### Slots

- `default`: The fieldsets and fields.

## Fieldset

### Parts

- `.ui-fieldset` (root): Container element.
- `<legend>` (`FieldLegend`): The label of the fieldset.
- `.ui-fieldset > .ui-description` (`FieldDescription`): Supporting text displayed below the legend.
- `.ui-fieldset > .ui-end-text`: Supporting or error text for the whole group, after the fields.

### Props and modifiers

- `as`: `"div" | "fieldset"`, default `"fieldset"`. The element to render. Elements other than `fieldset` get `role="group"`. Point their `aria-labelledby` at the legend.
- `disabled`: `boolean`. Disables every field inside. Only on a `<fieldset>`.
- State (HTML): `disabled` (`[disabled]`), `invalid` (`:has([aria-invalid="true"], :user-invalid)`), `required` (`:has(:required)`). `disabled` disables every field inside, only on a `<fieldset>`. A field inside with `aria-invalid="true"`, or that is `:user-invalid`, colors the end text, and a required field adds a required mark after the legend.

### Slots

- `default`: The legend, description and fields.

## FieldLegend

### Parts

- `:is(legend, .ui-legend)` (root): The label of a fieldset.

### Props and modifiers

- `as`: `"legend" | "p"`, default `"legend"`. The element to render. Adds `.ui-legend` when not `"legend"`.

### Slots

- `default`: The label.

## FieldDescription

### Parts

- `.ui-description` (root): Supporting text for a fieldset.

### Slots

- `default`: The text.

## FieldGroup

### Parts

- `.ui-field-group` (root): Container element.

### Props and modifiers

- `name`: `string`. Sets `name` on the OPUI fields inside that don't set their own.
- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`), `"vertical"` (`.ui-vertical`). The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row.

### Slots

- `default`: The fields, such as checkboxes, radios or switches.

### Notes

- HTML: To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Theme tokens

The stylesheets read `--ui-disabled-opacity`, `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-font-size-small`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-space-8` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<form class="ui-form">
  <fieldset class="ui-fieldset">
    <legend>Contact</legend>
    <p class="ui-description">How can we reach you?</p>
    <div class="ui-field-group">
      <label class="ui-text-field">
        <span class="ui-label">Name</span>
        <span class="ui-field">
          <input autocomplete="name" type="text" />
        </span>
      </label>
      <label class="ui-text-field">
        <span class="ui-label">Email</span>
        <span class="ui-field">
          <input autocomplete="email" type="email" />
        </span>
      </label>
    </div>
  </fieldset>
  <div class="ui-field-group">
    <button class="ui-button ui-filled" type="submit">Send</button>
  </div>
</form>
```

## Astro

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/astro"`

### Example: Basics

```astro
---
import {
  Button,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/astro"
---

<Form>
  <Fieldset>
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription>How can we reach you?</FieldDescription>
    <FieldGroup>
      <TextField autocomplete="name" label="Name" />
      <TextField autocomplete="email" label="Email" type="email" />
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
```

## React

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"`

- Client components (`"use client"`): `FieldGroup`.

### Example: Basics

```tsx
import {
  Button,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset>
        <FieldLegend>Contact</FieldLegend>
        <FieldDescription>How can we reach you?</FieldDescription>
        <FieldGroup>
          <TextField autoComplete="name" label="Name" />
          <TextField autoComplete="email" label="Email" type="email" />
        </FieldGroup>
      </Fieldset>
      <FieldGroup>
        <Button type="submit" variant="filled">
          Send
        </Button>
      </FieldGroup>
    </Form>
  )
}
```

## Svelte

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/svelte"`

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
    TextField,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset>
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription>How can we reach you?</FieldDescription>
    <FieldGroup>
      <TextField autocomplete="name" label="Name" />
      <TextField autocomplete="email" label="Email" type="email" />
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
```

## Vue

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"`

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  TextField,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Contact</FieldLegend>
      <FieldDescription>How can we reach you?</FieldDescription>
      <FieldGroup>
        <TextField autocomplete="name" label="Name" />
        <TextField autocomplete="email" label="Email" type="email" />
      </FieldGroup>
    </Fieldset>
    <FieldGroup>
      <Button type="submit" variant="filled">Send</Button>
    </FieldGroup>
  </Form>
</template>
```

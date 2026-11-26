# Form

Classes that space and group form fields, with fieldsets and field groups.

- CSS: `opui-css/css/components/form.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/form.md), [Astro](https://opui.dev/astro/components/form.md), [Nunjucks](https://opui.dev/nunjucks/components/form.md), [React](https://opui.dev/react/components/form.md), [Solid](https://opui.dev/solid/components/form.md), [Svelte](https://opui.dev/svelte/components/form.md), [Vue](https://opui.dev/vue/components/form.md).

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

- `as`: `"div" | "fieldset"`, default `"fieldset"`. The element to render. Elements other than `fieldset` get `role="group"` and `aria-labelledby` pointing at the `FieldLegend`, unless `aria-label` or `aria-labelledby` is passed.
- `disabled`: `boolean`. Disables every field inside. Only on a `<fieldset>`.
- State (HTML): `disabled` (`[disabled]`), `invalid` (`:has([aria-invalid="true"], :user-invalid)`), `required` (`:has(:required)`). `disabled` disables every field inside, only on a `<fieldset>`. A field inside with `aria-invalid="true"`, or that is `:user-invalid`, colors the end text, and a required field adds a required mark after the legend.

### Slots

- `default`: The legend, description and fields.

## FieldLegend

### Parts

- `:is(legend, .ui-legend)` (root): The label of a fieldset.

### Props and modifiers

- `as`: `"legend" | "p"`, default `"legend"`. The element to render. Adds `.ui-legend` when not `"legend"`.
- `id`: `string`. The id of the legend. Inside a `Fieldset` rendered with `as`, the legend takes the fieldset's generated id instead, unless the fieldset has `aria-label` or `aria-labelledby`.

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

- `orientation`: `"auto"` (default), `"horizontal"` (`.ui-horizontal`), `"vertical"` (`.ui-vertical`). The orientation of the fields. With `auto`, fields stack and a group with only buttons lines up in a row.

### Slots

- `default`: The fields, such as checkboxes, radios or switches.

### Notes

- HTML: To label the group, wrap it in a `.ui-fieldset` with a `<legend>`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### form.css

- `--_field-min-inline-size`: Width a field in a horizontal `.ui-field-group` wraps at. Fields grow from it to share the row.

## Theme tokens

The stylesheets read `--ui-field-helper-font-size`, `--ui-field-helper-line-height`, `--ui-field-helper-text-color`, `--ui-field-label-font-weight`, `--ui-field-label-text-color`, `--ui-field-required-text-color`, `--ui-font-size-small`, `--ui-invalid-text`, `--ui-line-height-control`, `--ui-space-1`, `--ui-space-12`, `--ui-space-2`, `--ui-space-4`, `--ui-space-5`, `--ui-space-6`, `--ui-state-disabled-opacity` and `--ui-text`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<form class="ui-form">
  <fieldset class="ui-fieldset" aria-describedby="form-basics-1-description">
    <legend>Contact</legend>
    <p class="ui-description" id="form-basics-1-description">
      How can we reach you?
    </p>
    <div class="ui-field-group">
      <div class="ui-field">
        <label class="ui-label" for="form-basics-2">Name</label>
        <span class="ui-field-container">
          <input autocomplete="name" id="form-basics-2" />
        </span>
      </div>
      <div class="ui-field">
        <label class="ui-label" for="form-basics-3">Email</label>
        <span class="ui-field-container">
          <input autocomplete="email" id="form-basics-3" type="email" />
        </span>
      </div>
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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/astro"
---

<Form>
  <Fieldset aria-describedby="form-basics-1-description">
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription id="form-basics-1-description"
      >How can we reach you?</FieldDescription
    >
    <FieldGroup>
      <Field for="form-basics-2" label="Name">
        <input autocomplete="name" id="form-basics-2" />
      </Field>
      <Field for="form-basics-3" label="Email">
        <input autocomplete="email" id="form-basics-3" type="email" />
      </Field>
    </FieldGroup>
  </Fieldset>
  <FieldGroup>
    <Button type="submit" variant="filled">Send</Button>
  </FieldGroup>
</Form>
```

## Nunjucks

`{% from "opui/index.njk" import FieldDescription, FieldGroup, FieldLegend, Fieldset, Form %}`

### Example: Basics

```njk
{% from "opui/index.njk" import
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form
%}

{% call Form() %}
  {% call Fieldset({ "aria-describedby": "form-basics-1-description" }) %}
    {% call FieldLegend() %}Contact{% endcall %}
    {% call FieldDescription({ id: "form-basics-1-description" }) %}How can we reach you?{% endcall %}
    {% call FieldGroup() %}
      {% call Field({ for: "form-basics-2", label: "Name" }) %}
        <input autocomplete="name" id="form-basics-2" />
      {% endcall %}
      {% call Field({ for: "form-basics-3", label: "Email" }) %}
        <input autocomplete="email" id="form-basics-3" type="email" />
      {% endcall %}
    {% endcall %}
  {% endcall %}
  {% call FieldGroup() %}
    {% call Button({ type: "submit", variant: "filled" }) %}Send{% endcall %}
  {% endcall %}
{% endcall %}
```

## React

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/react"`

- Client components (`"use client"`): `Fieldset` and `FieldLegend`.

### Example: Basics

```tsx
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/react"

export default function Basics() {
  return (
    <Form>
      <Fieldset aria-describedby="form-basics-1-description">
        <FieldLegend>Contact</FieldLegend>
        <FieldDescription id="form-basics-1-description">
          How can we reach you?
        </FieldDescription>
        <FieldGroup>
          <Field htmlFor="form-basics-2" label="Name">
            <input autoComplete="name" id="form-basics-2" />
          </Field>
          <Field htmlFor="form-basics-3" label="Email">
            <input autoComplete="email" id="form-basics-3" type="email" />
          </Field>
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

## Solid

`import { FieldDescription, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/solid"`

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/solid"

export default function Basics() {
  return (
    <Form>
      <Fieldset aria-describedby="form-basics-1-description">
        <FieldLegend>Contact</FieldLegend>
        <FieldDescription id="form-basics-1-description">
          How can we reach you?
        </FieldDescription>
        <FieldGroup>
          <Field for="form-basics-2" label="Name">
            <input autocomplete="name" id="form-basics-2" />
          </Field>
          <Field for="form-basics-3" label="Email">
            <input autocomplete="email" id="form-basics-3" type="email" />
          </Field>
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
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    Fieldset,
    Form,
  } from "opui-css/svelte"
</script>

<Form>
  <Fieldset aria-describedby="form-basics-1-description">
    <FieldLegend>Contact</FieldLegend>
    <FieldDescription id="form-basics-1-description"
      >How can we reach you?</FieldDescription
    >
    <FieldGroup>
      <Field for="form-basics-2" label="Name">
        <input autocomplete="name" id="form-basics-2" />
      </Field>
      <Field for="form-basics-3" label="Email">
        <input autocomplete="email" id="form-basics-3" type="email" />
      </Field>
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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset aria-describedby="form-basics-1-description">
      <FieldLegend>Contact</FieldLegend>
      <FieldDescription id="form-basics-1-description"
        >How can we reach you?</FieldDescription
      >
      <FieldGroup>
        <Field for="form-basics-2" label="Name">
          <input autocomplete="name" id="form-basics-2" />
        </Field>
        <Field for="form-basics-3" label="Email">
          <input autocomplete="email" id="form-basics-3" type="email" />
        </Field>
      </FieldGroup>
    </Fieldset>
    <FieldGroup>
      <Button type="submit" variant="filled">Send</Button>
    </FieldGroup>
  </Form>
</template>
```

---
overline: Components
title: Switch
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue";
import Baseline from "../../.vitepress/theme/app/components/Baseline.vue";
import Alert from "../../.vitepress/theme/app/components/Alert.vue";

</script>

<!--
Keep a look out for the new HTML switch control.
It's not mature yet to even try to implement here,
but will be in time.
https://webkit.org/blog/15054/an-html-switch-control/
 -->

See also: [Switch group](#field-group)

All switches should have labels. Notice the use of `aria-label` on the `label` element.

<Example row>
<template #example>
<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" checked />
</label>

<div class="switch">
  <label for="switch-unchecked" class="sr-only">Label</label>
  <input id="switch-unchecked" type="checkbox" role="switch" />
</div>

<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" checked disabled />
</label>

<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" disabled />
</label>
</template>

<template #code>

<!-- prettier-ignore -->
```html
<!-- Checked -->
<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" />
</label>

<!-- Unchecked. Demos another common pattern where the input is next to the label with the use of the .sr-only class -->
<div class="switch">
  <label for="switch-unchecked" class="sr-only">Label</label>
  <input id="switch-unchecked" type="checkbox" role="switch" />
</div>

<!-- Checked & disabled -->
<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" checked disabled />
</label>

<!-- Unchecked & disabled -->
<label class="switch" aria-label="Label">
  <input type="checkbox" role="switch" disabled />
</label>
```

</template>
</Example>

<!--@include: ../../sr-only.md -->

## Visible labels

Add an element with the `.text` class. Also, don't miss the info on label [accessibility](#accessibility).

<Example centered column>
<template #example>
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Label</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" disabled/>
	<span class="label">Disabled</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch"/>
	<span class="label">Long text bacon ipsum dolor amet prosciutto tenderloin biltong leberkas ribeye short ribs shankle tri-tip doner buffalo chislic meatloaf meatball.</span>
</label>

</template>

<template #code>

```html{3}
<label class="switch">
  <input type="checkbox" role="switch" />
  <span class="label">Label</span>
</label>
```

</template>
</Example>

### Label position

<Example row gapL>
<template #example>
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Default</span>
</label>

<label class="switch stack">
	<input type="checkbox" role="switch" />
	<span class="label">Stack</span>
</label>

</template>

<template #code>

```html{3}
<label class="switch">
  <input type="checkbox" role="switch" />
  <span class="label">Label</span>
</label>
```

</template>
</Example>

### Supporting text

<Example row gapL>
<template #example>
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Default</span>
    <span class="supporting-text">Supporting text</span>
</label>

<label class="switch stack">
	<input type="checkbox" role="switch" />
	<span class="label">Stack</span>
  <span class="supporting-text">Supporting text</span>
</label>

</template>

<template #code>

```html{4}
<label class="switch">
  <input type="checkbox" role="switch" />
  <span class="label">Default</span>
  <span class="supporting-text">Supporting text</span>
</label>

```

</template>
</Example>

### Validation

- Add `[required]` to the `<input>` element to toggle required styles
- The `.error` class toggles the error styles. Make use of the supporting text to give extra feedback on the error.

<Example column gapL>
<template #example>
<div class="example-row gap-l">
<label class="switch">
	<input type="checkbox" role="switch" required/>
	<span class="label">Default</span>
</label>
<label class="switch stack">
	<input type="checkbox" role="switch" required/>
	<span class="label">Stack</span>
</label>
</div>

<div class="example-row gap-l">
<label class="switch error">
	<input type="checkbox" role="switch" />
	<span class="label">Default</span>
    <span class="supporting-text">Supporting text</span>
</label>

<label class="switch stack error">
	<input type="checkbox" role="switch" />
	<span class="label">Stack</span>
  <span class="supporting-text">Supporting text</span>
</label>

</div>
</template>

<template #code>

```html{2,6}
<label class="switch error">
  <input type="checkbox" role="switch" required/>
  <span class="label">Default</span>
</label>

<label class="switch error">
  <input type="checkbox" role="switch" />
  <span class="label">Default</span>
  <span class="supporting-text">Supporting text</span>
</label>

```

</template>
</Example>

## Sizes

Add the `.small` class on the parent for a smaller Switch variant.

<Example row>
<template #example>
<label class="switch small">
	<input type="checkbox" role="switch" />
	<span class="label">Small</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Default</span>
</label>
</template>

<template #code>

```html
<label class="switch small">
  <!--  -->
</label>

<label class="switch">
  <!-- -->
</label>
```

</template>
</Example>

## Field group

<Example centered column>
<template #example>
<fieldset class="field-group">
<legend>Legend</legend>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>
</div>
</fieldset>
</template>

<template #code>

```html
<fieldset class="field-group">
  <legend>Legend</legend>
  <div class="fields">
    <!--  -->
  </div>
</fieldset>
```

</template>
</Example>

### Direction

<Example row>
<template #example>
<fieldset class="field-group row">
<legend>Legend</legend>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>
</div>
</fieldset>
</template>

<template #code>

```html{1}
<fieldset class="field-group row">
  <!--  -->
</fieldset>
```

</template>
</Example>

### Supporting text

Can be placed above and below the fields.

<Example column centered gapL>
<template #example>
<fieldset class="field-group row">
<legend>Legend</legend>
<span class="supporting-text">Supporting text above fields</span>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>
</div>
</fieldset>

<fieldset class="field-group row">
<legend>Legend</legend>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>
</div>
<span class="supporting-text">Supporting text below fields</span>
</fieldset>
</template>

<template #code>

```html{3,14}
<fieldset class="field-group row">
  <legend>Legend</legend>
  <span class="supporting-text">Supporting text</span>
  <div class="fields">
    <!--  -->
  </div>
</fieldset>

<fieldset class="field-group row">
  <legend>Legend</legend>
  <div class="fields">
    <!--  -->
  </div>
  <span class="supporting-text">Supporting text</span>
</fieldset>
```

</template>
</Example>

### Disabled

Attach the `disabled` attribute to the `<fieldset>` element.

<Example row>
<template #example>
<fieldset class="field-group row" disabled>
<legend>Legend</legend>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>

</div>
</fieldset>
</template>

<template #code>

```html{1}
<fieldset class="field-group row" disabled>
  <!--  -->
</fieldset>
```

</template>
</Example>

### Required

Attach the `required` attribute to at least one of your `<input>` elements.

<Example row>
<template #example>
<fieldset class="field-group row">
<legend>These are required!</legend>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch" required/>
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" required />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" required />
	<span class="label">Switch 3</span>
</label>
</div>
</fieldset>
</template>

<template #code>

```html{5}
<fieldset class="field-group row">
  <legend>Legend</legend>
  <div class="fields">
    <label class="switch">
      <input type="checkbox" role="switch" required/>
      <span class="label">Switch 1</span>
    </label>
    <!--  -->
  </div>
</fieldset>
```

</template>
</Example>

### Validation

Attach the `.error` class to your `fieldset.field-group` element

<Example row>
<template #example>
<fieldset class="field-group row error">
<legend>Legend</legend>
<span class="supporting-text">Something went wrong!</span>
<div class="fields">
<label class="switch">
	<input type="checkbox" role="switch"/>
	<span class="label">Switch 1</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 2</span>
</label>

<label class="switch">
	<input type="checkbox" role="switch" />
	<span class="label">Switch 3</span>
</label>

</div>
</fieldset>
</template>

<template #code>

```html{1}
<fieldset class="field-group row error">
  <!--  -->
</fieldset>
```

</template>
</Example>

## Accessibility

### Role & attributes

| Role/attribute  | Usage                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `role="switch"` | Required on the `input` element. Identifies the element that serves as a switch. |

### Labels

To have an accessible label you can choose between three approaches.

| Variant                                                        | Usage in Switch component                            |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| Add a `aria-label` on the element                              | Default behavior.                                    |
| Provide a label inside the element                             | Used when showing [visible labels](#visible-labels). |
| Have a visible label that you reference with `aria-labelledby` | Not used.                                            |

### Keyboard support

<div class="not-rich-text">

| Key              | Function                                                       |
| ---------------- | -------------------------------------------------------------- |
| <kbd>Space</kbd> | When switch is focused, changes the switch's state.            |
| <kbd>Enter</kbd> | (Optional) When switch is focused, changes the switch's state. |

</div>

<style scoped>
  .anatomy {
    outline-offset: 8px;
    outline: var(--_anatomy-border-gray);

    * {
      outline: var(--_anatomy-border-red);
    }

    input {
      border-radius: 100vmax;
      outline-offset: 2px;
    }

  }
</style>

## Anatomy

1. Container: `label` element
2. Switch: `& input type="checkbox" role="switch"`
3. Label (optional): & `.text`

<Example row>
<template #example>
<label class="switch anatomy" aria-label="Label">
  <input type="checkbox" role="switch" />
  <span class="label">Label</span>
</label>
</template>
</Example>

## API

<!--@include: ./switch-api.md -->

### Field group API

<!--@include: ./field-group-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark']" />

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/switch.css [switch.css]
<<< @/../node_modules/opui-css/src/components/field-group.css [field-group.css]
:::

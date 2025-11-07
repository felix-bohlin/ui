---
overline: Components
title: Checkbox
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue";
import Alert from "../.vitepress/theme/app/components/Alert.vue";
</script>

See also: [Checkbox group](#field-group)

<Example row>
<template #example>
  <label class="checkbox">
   <input name="checkbox" type="checkbox" checked="checked">
   <span class="sr-only">Label</span>
  </label>

  <label class="checkbox">
   <input name="checkbox" type="checkbox">
   <span class="sr-only">Label</span>
   </label>

  <label class="checkbox">
   <input name="checkbox" type="checkbox" disabled>
   <span class="sr-only">Label</span>
   </label>

  <label class="checkbox">
   <input name="checkbox" type="checkbox" checked="checked" disabled>
   <span class="sr-only">Label</span>
</label>
</template>

<template #code>

<!-- prettier-ignore -->
```html
<!-- Checked -->
<label class="checkbox">
  <input name="checkbox" type="checkbox" checked="checked" />
  <span class="sr-only">Label</span>
</label>

<!-- Unchecked -->
<label class="checkbox">
  <input name="checkbox" type="checkbox"/>
  <span class="sr-only">Label</span>
</label>


<!-- Unchecked & disabled -->
<label class="checkbox">
  <input name="checkbox" type="checkbox" disabled />
  <span class="sr-only">Label</span>
</label>

<!-- Checked & disabled -->
<label class="checkbox">
  <input name="checkbox" type="checkbox" checked="checked" disabled />
  <span class="sr-only">Label</span>
</label>
```

</template>

</Example>

<!--@include: ../../sr-only.md -->

## Visible label

Render the label text inside an element with a `.label` class.

<Example column centered>
<template #example>
    <label class="checkbox">
      <input name="checkbox" type="checkbox" checked="checked">
      <span class="label">Choice A</span>
    </label>

  <label class="checkbox">
    <input name="checkbox" type="checkbox" disabled>
    <span class="label">Disabled</span>
  </label>

  <label class="checkbox">
    <input  name="checkbox" type="checkbox" checked="checked" disabled>
    <span class="label">Checked and disabled</span>
  </label>

  <label class="checkbox">
    <input name="checkbox" type="checkbox">
    <span class="label">Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole <a class="link" href="#visible-label">privacy policy ipsum</a></span>
  </label>
</template>

<template #code>

```html{3}
<label class="checkbox">
  <input name="checkbox" type="checkbox" checked="checked" />
  <span class="label">Label</span>
</label>

```

</template>
</Example>

### Label position

<Example row gapL>
<template #example>
  <label class="checkbox">
    <input name="checkbox" type="checkbox">
    <span class="label">Default</span>
  </label>

  <label class="checkbox stack">
    <input name="checkbox" type="checkbox">
    <span class="label">Stack</span>
  </label>

</template>

<template #code>

```html{1}
<label class="checkbox stack">
  <input name="checkbox" type="checkbox">
  <span class="label">Stack</span>
</label>

```

</template>
</Example>

### Supporting text

<Example row gapL>
<template #example>
  <label class="checkbox">
    <input name="checkbox" type="checkbox">
    <span class="label">Default</span>
    <span class="supporting-text">Supporting text</span>
  </label>

  <label class="checkbox stack">
    <input name="checkbox" type="checkbox">
    <span class="label">Stack</span>
    <span class="supporting-text">Supporting text</span>
  </label>

</template>

<template #code>

```html{4}
<label class="checkbox">
  <input name="checkbox" type="checkbox">
  <span class="label">Stack</span>
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
  <label class="checkbox">
    <input name="checkbox" type="checkbox" required>
    <span class="label">Default</span>
  </label>

  <label class="checkbox stack">
    <input name="checkbox" type="checkbox" required>
    <span class="label">Stack</span>
  </label>
</div>
<div class="example-row gap-l">
  <label class="checkbox error">
    <input name="checkbox" checked type="checkbox">
    <span class="label">Default</span>
    <span class="supporting-text">Check yourself</span>
  </label>

  <label class="checkbox stack error">
    <input name="checkbox" type="checkbox">
    <span class="label">Stack</span>
    <span class="supporting-text">Before you wreck yourself</span>
  </label>
</div>

</template>

<template #code>

```html{2,6}
<label class="checkbox">
  <input name="checkbox" type="checkbox" required>
  <span class="label">Label</span>
</label>

<label class="checkbox error">
  <input name="checkbox" type="checkbox">
  <span class="label">Label</span>
  <span class="supporting-text">Supporting text</span>
</label>

```

</template>
</Example>

## Sizes

<Example column gapL centered>
<template #example>
   <div class="example-row">
   <label class="checkbox small">
      <input name="checkbox" type="checkbox" checked="checked">
      <span class="sr-only">Label</span>
  </label>
  <label class="checkbox">
     <input name="checkbox" type="checkbox" checked="checked">
     <span class="sr-only">Label</span>
  </label>
  <label class="checkbox large">
     <input name="checkbox" type="checkbox" checked="checked">
     <span class="sr-only">Label</span>
  </label>
   </div>

   <div class="example-row">
    <label class="checkbox small">
      <input name="checkbox" type="checkbox" checked="checked">
      <span class="label">Small</span>
    </label>
    <label class="checkbox">
      <input name="checkbox" type="checkbox" checked="checked">
      <span class="label">Default</span>
    </label>
    <label class="checkbox large">
      <input name="checkbox" type="checkbox" checked="checked">
      <span class="label">Large</span>
    </label>
   </div>
</template>

<template #code>

```html{1,5}
<label class="checkbox small">
  <!--  -->
</label>

<label class="checkbox large">
  <!--  -->
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
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
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
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
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
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
</label>
</div>
</fieldset>

<fieldset class="field-group row">
<legend>Legend</legend>
<div class="fields">
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
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
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
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
<label class="checkbox">
  <input type="checkbox" required />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" required />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" required />
  <span class="label">Checkbox 3</span>
</label>
</div>
</fieldset>
</template>

<template #code>

```html{5}
<fieldset class="field-group row">
  <legend>Legend</legend>
  <div class="fields">
    <label class="checkbox">
      <input type="checkbox" required />
      <span class="label">Checkbox 1</span>
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
<label class="checkbox">
  <input type="checkbox" checked />
  <span class="label">Checkbox 1</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 2</span>
</label>

<label class="checkbox">
  <input type="checkbox" />
  <span class="label">Checkbox 3</span>
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

### Labels

Accessible checkboxes must have a label. You can choose between three approaches:

| Approach                                                          | Usage in Checkbox component |
| ----------------------------------------------------------------- | --------------------------- |
| Provide a label text inside the `label`/`role="checkbox"` element | Default                     |
| Add a `aria-label` on the input element                           | Not used                    |
| Have a visible label that you reference with `aria-labelledby`    | Not used                    |

### Keyboard support

<div class="not-rich-text">

| Key              | Function                                                  |
| ---------------- | --------------------------------------------------------- |
| <kbd>Space</kbd> | When Checkbox is focused it changes its state.            |
| <kbd>Enter</kbd> | (Optional) When Checkbox is focused it changes its state. |

</div>

## API

<!--@include: ./checkbox-radio-api.md -->

### Field group API

<!--@include: ./field-group-api.md -->

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/checkbox-radio.css [checkbox-radio.css]
<<< @/../src/themes/theme-one/components/field-group.css [field-group.css]
:::

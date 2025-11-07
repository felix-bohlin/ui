---
overline: Components
title: Radio
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue";
import Baseline from "../.vitepress/theme/app/components/Baseline.vue";
import Alert from "../.vitepress/theme/app/components/Alert.vue";
</script>

See also: [Radio group](#field-group)

<Example row>
<template #example>

<label class="radio">
  <input id="radioa1" name="basic-enabled" type="radio"  />
  <span class="sr-only">Unchecked</span>
</label>

<label class="radio">
  <input id="radioa2" name="basic-enabled" type="radio" checked/>
  <span class="sr-only">Checked</span>
</label>

<label class="radio">
  <input id="radioa3" name="basic-disabled" type="radio" disabled />
  <span class="sr-only">Disabled</span>
</label>

<label class="radio">
  <input id="radioa4" name="basic-disabled" type="radio" checked disabled />
  <span class="sr-only">Checked and disabled</span>
</label>
</template>

<template #code>

```html
<!-- Checked -->
<label class="radio">
  <input id="radioa2" name="basic-enabled" type="radio" checked />
  <span class="sr-only">Checked</span>
</label>

<!-- Unchecked -->
<label class="radio">
  <input id="radioa1" name="basic-enabled" type="radio" />
  <span class="sr-only">Unchecked</span>
</label>

<!-- Unchecked & disabled -->
<label class="radio">
  <input id="radioa3" name="basic-disabled" type="radio" disabled />
  <span class="sr-only">Disabled</span>
</label>

<!-- Checked & disabled -->
<label class="radio">
  <input id="radioa4" name="basic-disabled" type="radio" checked disabled />
  <span class="sr-only">Checked and disabled</span>
</label>
```

</template>
</Example>

<!--@include: ../../sr-only.md -->

## Visible label

Render the label text inside an element with a `.text` class.

<Example row>
<template #example>
<label class="radio">
  <input id="radio-label-1" name="labels-enabled" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input id="radio-label-2" name="labels-enabled" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input id="radio-label-3" name="labels-disabled" type="radio" disabled />
  <span class="label">Disabled</span>
</label>

<label class="radio">
  <input id="radio-label-4" name="labels-disabled" type="radio" checked disabled />
  <span class="label">Checked and disabled</span>
</label>
</template>

<template #code>

```html{3}
<label class="radio">
  <input id="radio-example-id" name="labels" type="radio" />
  <span class="label">Label</span>
</label>
```

</template>
</Example>

### Label position

<Example row gapL>
<template #example>
  <label class="radio">
    <input name="radio-label-position" type="radio">
    <span class="label">Default</span>
  </label>

  <label class="radio stack">
    <input name="radio-label-position" type="radio">
    <span class="label">Stack</span>
  </label>

</template>

<template #code>

```html{1}
<label class="radio stack">
  <input name="radio-label-position" type="radio">
  <span class="label">Stack</span>
</label>

```

</template>
</Example>

### Supporting text

<Example row gapL>
<template #example>
  <label class="radio">
    <input name="supporting-text" type="radio">
    <span class="label">Default</span>
    <span class="supporting-text">Supporting text</span>
  </label>

  <label class="radio stack">
    <input name="supporting-text" type="radio">
    <span class="label">Stack</span>
    <span class="supporting-text">Supporting text</span>
  </label>

</template>

<template #code>

```html{4}
<label class="radio">
  <input name="checkbox" type="radio">
  <span class="label">Stack</span>
  <span class="supporting-text">Supporting text</span>
</label>

```

</template>
</Example>

## Sizes

<Example column centered>
<template #example>
<label class="radio small">
  <input id="radio-small-1" name="size-enabled" type="radio" checked />
  <span class="label">Small</span>
</label>

<label class="radio">
  <input id="radio-small-2" name="size-enabled" type="radio"  />
  <span class="label">Default</span>
</label>

<label class="radio large">
  <input id="radio-small-3" name="size-enabled" type="radio"  />
  <span class="label">Large</span>
</label>
</template>

<template #code>

```html{1}
<label class="radio small">
  <input id="radio-small-1" name="size-enabled" type="radio" />
  <span class="label">Small</span>
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
<label class="radio">
  <input id="radio-label-1" name="field-group-1" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input id="radio-label-2" name="field-group-1" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input id="radio-label-3" name="field-group-1" type="radio" />
  <span class="label">Radio 3</span>
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
<label class="radio">
  <input name="field-group-direction" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-direction" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-direction" type="radio" />
  <span class="label">Radio 3</span>
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
<label class="radio">
  <input name="field-group-supp-text-1" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-supp-text-1" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-supp-text-1" type="radio" />
  <span class="label">Radio 3</span>
</label>
</div>
</fieldset>

<fieldset class="field-group row">
<legend>Legend</legend>
<div class="fields">
<label class="radio">
  <input name="field-group-supp-text-2" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-supp-text-2" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-supp-text-2" type="radio" />
  <span class="label">Radio 3</span>
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
<label class="radio">
  <input name="field-group-disabled-1" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-disabled-1" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-disabled-1" type="radio" />
  <span class="label">Radio 3</span>
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
<label class="radio">
  <input name="field-group-required-1" type="radio" required />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-required-1" type="radio" required />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-required-1" type="radio" required />
  <span class="label">Radio 3</span>
</label>
</div>
</fieldset>
</template>

<template #code>

```html{5}
<fieldset class="field-group row">
  <legend>Legend</legend>
  <div class="fields">
    <label class="radio">
      <input name="field-group-required-1" type="radio" required />
      <span class="label">Radio 1</span>
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
<label class="radio">
  <input name="field-group-validation-1" type="radio" checked />
  <span class="label">Radio 1</span>
</label>

<label class="radio">
  <input name="field-group-validation-1" type="radio" />
  <span class="label">Radio 2</span>
</label>

<label class="radio">
  <input name="field-group-validation-1" type="radio" />
  <span class="label">Radio 3</span>
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

Accessible radio buttons must have a label. You can choose between three approaches:

| Approach                                                       | Usage in Radio component |
| -------------------------------------------------------------- | ------------------------ |
| Provide a label text inside the `label`/`role="radio"` element | Default                  |
| Add a `aria-label` on the input element                        | Not used                 |
| Have a visible label that you reference with `aria-labelledby` | Not used                 |

### Keyboard support

<div class="not-rich-text">

| Key              | Function                                               |
| ---------------- | ------------------------------------------------------ |
| <kbd>Space</kbd> | When Radio is focused it changes its state.            |
| <kbd>Enter</kbd> | (Optional) When Radio is focused it changes its state. |

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

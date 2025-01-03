<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
</script>

# Field

Refers to the abstracted wrapper around [Select](/components/inputs/select), [Text field](/components/inputs/text-field), and [Textarea](/components/inputs/textarea).

Field is responsible for:

- a unified look and feel among its child elements
- label & supporting text styles
- validation styles
- size styling

<Example row>
<template #example>
<div class="field">
	<input type="text" placeholder="Text"/>
</div>
</template>
<template #code>

```html{1,7}
<div class="field">
  <input type="text" placeholder="Outlined" />
</div>

<!-- or with <label> (more on that below) -->

<label class="field">
  <input type="text" placeholder="Outlined" />
</label>
```

</template>
</Example>

## Label & supporting text

- Use the `<label>` element with the `.field` class.
- `.label`: label text element
- `.supporting-text`: supporting text element

<Example row>
<template #example>
<label class="field small">
	<span class="label">Label</span>
	<input type="text" placeholder="Placeholder"/>
	<span class="supporting-text">Supporting text</span>
</label>

<label class="field">
	<span class="label">Label</span>
	<input type="text" placeholder="Outlined"/>
	<span class="supporting-text">Supporting text</span>
</label>

<label class="field filled small">
	<span class="label">Label</span>
	<input type="text" placeholder="Filled"/>
	<span class="supporting-text">Supporting text</span>
</label>

<label class="field filled">
	<span class="label">Label</span>
	<input type="text" placeholder="Filled"/>
	<span class="supporting-text">Supporting text</span>
</label>
</template>
<template #code>

```html{2,4}
<label class="field">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Validation

The `.bad` class toggles the error styles. Make use of the supporting text to give extra feedback on the error.

<Example row>
<template #example>
<label class="field bad">
	<span class="label">Label</span>
	<input type="text" placeholder="Placeholder" value="This isn't right"/>
	<span class="supporting-text">Only double-negatives are allowed.</span>
</label>

<label class="field bad filled">
	<span class="label">Label</span>
	<input type="text" placeholder="Placeholder" value="Uh-oh"/>
	<span class="supporting-text">Only letters from the first half of the alphabet are allowed.</span>
</label>
</template>
<template #code>

```html{1}
<label class="field bad">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Prefix & suffix

## Sizes

<Example row>
<template #example>
	<div class="field small">
		<input type="text" placeholder="Small">
</div>
<div class="field">
		<input type="text" placeholder="Default">
</div>
</template>
<template #code>

```html{1,5}
<div class="field small">
  <!--  -->
</div>

<div class="field">
  <!--  -->
</div>
```

</template>
</Example>

### Auto-fit

When enabled the Field changes size depending on its content.

<Example row>
<template #example>
<div class="field auto-fit">
	<input type="text" placeholder="Auto-fit"/>
</div>
</template>
<template #code>

```html{1}
<div class="field auto-fit">
  <!--  -->
</div>
```

</template>
</Example>

## API

<!--@include: ./field-api.md -->

## Installation

::: code-group
<<< @/../src/inputs/field.css [field.css]
:::

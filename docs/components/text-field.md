---
overline: Components
title: Text field
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue"
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
import Alert from "../.vitepress/theme/app/components/Alert.vue";

import { ref } from "vue"

const isFilled = ref(false)
const isSmall = ref(false)
</script>

## Variants

<Example row>
<template #example>
<label class="field">
	<span class="label">Outlined</span>
	<input type="text" placeholder="Placeholder"/>
</label>

<label class="field filled">
	<span class="label">Filled</span>
	<input type="text" placeholder="Placeholder"/>
</label>
</template>
<template #code>

```html
<label class="field">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
</label>

<label class="field filled">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
</label>
```

</template>
</Example>

## Sizes

<Example row>
<template #example>
	<label class="field small">
  <span class="label">Small outlined</span>
  <input type="text" placeholder="Placeholder" />
</label>

<label class="field small filled">
  <span class="label">Small filled</span>
  <input type="text" placeholder="Placeholder" />
</label>
</template>
<template #code>

```html{1}
<label class="field small">
  <!--  -->
</label>
```

</template>
</Example>

## Supporting text

<Example row>
<template #example>
<label class="field">
	<span class="label">Label</span>
	<input type="text" placeholder="Outlined"/>
	<span class="supporting-text">Supporting text</span>
</label>
</template>
<template #code>

```html{4}
<label class="field">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Validation

- Add `[required]` to the `<input>` element to toggle required styles
- The `.error` class toggles the error styles. Make use of the supporting text to give extra feedback on the error.

<Example column gapL>
<template #example>
<div class="example-row">
<label class="field">
	<span class="label">I'm required</span>
	<input type="text" placeholder="Placeholder" required/>
</label>

<label class="field filled">
	<span class="label">So am I!</span>
	<input type="text" placeholder="Placeholder" required/>
</label>
</div>

<div class="example-row">
<label class="field error">
	<span class="label">Label</span>
	<input type="text" placeholder="Placeholder" value="This isn't right"/>
	<span class="supporting-text">Only double-negatives are allowed.</span>
</label>

<label class="field error filled">
	<span class="label">Label</span>
	<input type="text" placeholder="Placeholder" value="Uh-oh"/>
	<span class="supporting-text">Only letters from the first half of the alphabet are allowed.</span>
</label>
</div>
</template>
<template #code>

```html{3,6}
<label class="field">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" required/>
</label>

<label class="field error">
  <span class="label">Label</span>
  <input type="text" placeholder="Placeholder" />
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Auto-fit

When enabled the Field changes size depending on its content.

<Example row>
<template #example>
<label class="field auto-fit">
	<span class="label">Label</span>
	<input type="text" placeholder="Auto-fit"/>
</label>
</template>
<template #code>

```html{1}
<label class="field auto-fit">
  <!--  -->
</label>
```

</template>
</Example>

<div class="not-rich-text">
<Alert title="Auto-fit + labels" severity="warning">
	Be aware that if your label is long you might experience some animation jank when focusing on the input as a natural result of the input changing size.
</Alert>
</div>

## Input types

<Example row hideCode>
<template #controls>
<label class="checkbox">
	<input v-model="isFilled" name="checkbox" type="checkbox" />
	<span class="text">Filled</span>
</label>
<label class="checkbox">
	<input v-model="isSmall" name="checkbox" type="checkbox" />
	<span class="text">Small</span>
</label>
</template>
<template #example>

  <div class="example-column">
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Color</span>
      <input type="color" placeholder="Color" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">Email</span>
	    <input type="email" placeholder="name@email.com" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">Password</span>
	    <input type="password" placeholder="Password" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">Search</span>
	    <input type="search" placeholder="Search" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">Phone</span>
	    <input type="tel" placeholder="(666) 666-1337" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">Text</span>
	    <input type="text" placeholder="Text" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
			<span class="label">URL</span>
	    <input type="url" placeholder="https://yoursite.com" />
    </label>
  </div>

  <div class="example-column">
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Date</span>
			<input type="date" placeholder="Date" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Datetime local</span>
			<input type="datetime-local" placeholder="Datetime local" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Month</span>
			<input type="month" placeholder="Month" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Time</span>
			<input type="time" placeholder="Time" />
    </label>
    <label class="field" :class="{ filled: isFilled, small: isSmall }">
      <span class="label">Week</span>
			<input type="week" placeholder="Week" />
    </label>
  </div>
</template>
<template #code>

```html
<label class="field">
  <span class="label">Color</span>
  <input type="color" placeholder="Color" />
</label>

<label class="field">
  <span class="label">Email</span>
  <input type="email" placeholder="name@email.com" />
</label>

<label class="field">
  <span class="label">Password</span>
  <input type="password" placeholder="Password" />
</label>

<label class="field">
  <span class="label">Search</span>
  <input type="search" placeholder="Search" />
</label>

<label class="field">
  <span class="label">Phone</span>
  <input type="tel" placeholder="(666) 666-1337" />
</label>

<label class="field">
  <span class="label">Text</span>
  <input type="text" placeholder="Text" />
</label>

<label class="field">
  <span class="label">URL</span>
  <input type="url" placeholder="https://yoursite.com" />
</label>

<label class="field">
  <span class="label">Date</span>
  <input type="date" placeholder="Date" />
</label>

<label class="field">
  <span class="label">Datetime local</span>
  <input type="datetime-local" placeholder="Datetime local" />
</label>

<label class="field">
  <span class="label">Month</span>
  <input type="month" placeholder="Month" />
</label>

<label class="field">
  <span class="label">Time</span>
  <input type="time" placeholder="Time" />
</label>

<label class="field">
  <span class="label">Week</span>
  <input type="week" placeholder="Week" />
</label>
```

</template>
</Example>

<div class="not-rich-text">
<Alert title="Date inputs">
Date-related inputs never show as empty, so the label is always visible. There are only hacks with compromises and no neat ways of dealing with that issue. You're free to implement a solution of your own here that works with your project.
</Alert>
</div>

### Numeric vs `<input type="number">`

<Example column>
<template #example>

<label class="field">
	<span class="label">Numeric</span>
	<input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Numeric">
</label>
</template>
<template #code>

<!-- prettier-ignore -->
```html
<label class="field">
  <span class="label">Numeric</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Numeric"> // [!code ++]
  <input type="number" placeholder="Number"> // [!code --]
</label>

```

</template>
</Example>

<div class="not-rich-text">
<Alert severity="error">
<template #title>
You most likely don't need <code>&lt;input type="number"&gt;</code>
</template>
<div class="rich-text">

While `<input type="number">` may seem logical for numeric data it should only be used when mathematical operations are needed on the input (which is... never). Data like credit card numbers, IDs or social security numbers - are actually text that happen to be numeric rather than mathematical values. Therefore, consider using `<input type="text" inputmode="numeric" pattern="[0-9]*">` instead.

**You will have a bad time.**

This triggers the numeric keyboard on mobile devices while avoiding the jank of number inputs, such as:

- Unexpected value increments from scroll wheels
- Browser-specific validation differences
- Accessibility problems
- Removal of leading zeros
- Allows for some non-numeric mathematical characters

It should probably be called `<input type="math">` instead.

The British Government has a [great article](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/) about how bad input number is and goes in-depth. It's a very interesting read.

</div>
</Alert>

</div>

### File

- Use `aria-label` instead of the `<label>` element.

File is a weird one. Should it really be an `<input>` element? Well, it's what we've got :sweat_smile:

<Example row>
<template #example>
 <div class="field" aria-label="Label">
    <input type="file" placeholder="File" />
  </div>

<div class="field filled" aria-label="Label">
  <input type="file" placeholder="File" />
</div>
</template>

<template #code>

```html
<div class="field" aria-label="Label">
  <input type="file" placeholder="File" />
</div>
```

</template>
</Example>

## Autosuggest

Leverages the `<input>` + `<datalist>` element combo.

- `<input list="DATALISTID">`
- `<datalist id="DATALISTID">`

<Example row>
<template #example>
<label class="field">
<span class="label">Users</span>

<input type="text" list="users" placeholder="Placeholder" />
<datalist id="users">
  <option value="Ray Manzarek"></option>
  <option value="Jonny Greenwood"></option>
  <option value="Marika Hackman"></option>
</datalist>
</label>

<label class="field filled">
<span class="label">Emails</span>
<input type="email" list="users-email" placeholder="Placeholder" />
<datalist id="users-email">
  <option value="ray.manzarek@the.doors"></option>
  <option value="jonny.greenwood@radio.head"></option>
  <option value="marika@hack.man"></option>
</datalist>
</label>
</template>

<template #code>

```html
<div class="field">
  <input type="text" list="datalist-id" />
  <datalist id="datalist-id">
    <option value="option value"></option>
  </datalist>
</div>
```

</template>
</Example>

<div class="not-rich-text">
<Alert>
<div class="rich-text">

Think of `<datalist>` as a list of _suggested_ values.

- `<select>` only allows you to choose between its provided values.
- `<input>` lets you input anything you want.
- `<input>` + `<datalist>` is a hybrid between the two.
</div>
</Alert>
</div>

## Do I have to use `<label>`?

No. But you get some accessibility wins for free with `<label>`. It's recommended to label your inputs somehow.

<Example row>
<template #example>
<div class="field">
	<input type="text" placeholder="Placeholder"/>
</div>
</template>
<template #code>

```html
<div class="field auto-fit">
  <input type="text" placeholder="Placeholder" />
</div>
```

</template>
</Example>

## Accessibility

- [Don't use `<input type="number">`](#numeric-vs-input-type-number) unless your user research tells you to.

<style scoped>
	 .anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 6px;
    & > * {
      outline: var(--_anatomy-border-red);
    }
  }
</style>

## Anatomy

1. `label.field`: Container element
2. `.label`: Field label element
3. `<input>`: Input element
4. `.supporting-text`: Supporting text element

<Example row>
<template #example>
<label class="field anatomy">
	<span class="label">Label</span>
	<input type="text" value="Value" placeholder="Placeholder"/>
	<span class="supporting-text">Supporting text</span>
</label>
</template>
</Example>

## API

### Field API

<!--@include: ./field-api.md -->

## Browser compatibility

<Baseline :ids="['field-sizing','datalist','light-dark', 'color-mix']" />

## Installation

::: code-group
<<< @/../src/themes/theme-one/components/field.css [field.css]
<<< @/../src/themes/theme-one/components/text-field.css [text-field.css]
:::

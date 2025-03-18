<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
  import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

<hgroup>
<p>Components</p>
<h1>Select</h1>
<p>Leverages the <a href="/components/data-display/list" class="link">List component</a> to provide markup for the Select popover.</p>
</hgroup>

<span></span>

<div class="not-rich-text">
<Alert variant="outlined" severity="warning" title="Experimental Web Platform features feature flag required">
<p>The Select makes use of the latest <a href="https://una.im/select-updates/" class="link">customizable select API</a> which limits it to Chromium version 133<.</p>
<p>The <a class="link" href="#non-experimental-select">non-experimental</a> Select is usable today though and might work as a fallback while we wait for the browsers to catch up!</p>
</Alert>
</div>

## Variants

<Example row>
<template #example>
<label class="field">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
</label>

<label class="field filled">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
</label>
</template>
<template #code>

```html{1,14}
<label class="field">
  <select>
    <button>
      <selectedcontent></selectedcontent>
    </button>
    <div class="list">
      <option>Outlined (default)</option>
      <option>Option Two</option>
      <option>Option Three</option>
    </div>
  </select>
</label>

<label class="field filled">
  <select>
    <!--  -->
  </select>
</label>
```

</template>
</Example>

## Supporting text

- `.supporting-text`: supporting text element

<Example row>
<template #example>
<label class="field">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
<span class="supporting-text">Supporting text</span>
</label>

<label class="field filled">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
<span class="supporting-text">Supporting text</span>
</label>
</template>
<template #code>

```html{6}
<label class="field">
  <span class="label">Label</span>
  <select>
   <!--  -->
  </select>
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Validation

- Add `[required]` to the `<select>` element to toggle required styles
- The `.error` class toggles the error styles. Make use of the supporting text to give extra feedback on the error.

<Example column gapL>
<template #example>
<div class="example-row">
<label class="field">
<span class="label">Label</span>
<select required>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </div>
</select>
</label>

<label class="field filled">
<span class="label">Label</span>
<select required>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
    <option value="">-</option>
    <option>Pick me!</option>
    <option>No me!!</option>
    <option>Come on!</option>
  </div>
</select>
</label>
</div>

<div class="example-row">
<label class="field error">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </div>
</select>
<span class="supporting-text">Supporting text</span>
</label>

<label class="field error filled">
<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">-</option>
   <option selected>Wrong option</option>
    <option>Also wrong!</option>
    <option>Nothing's right!</option>
  </div>
</select>
<span class="supporting-text">Supporting text</span>
</label>
</div>
</template>
<template #code>

```html{3,6}
<label class="field">
  <span class="label">Label</span>
  <select required> <!----> </select>
</label>

<label class="field error">
  <span class="label">Label</span>
  <select> <!----> </select>
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Sizes

<Example row>
<template #example>
<label class="field small">
<span class="label">Small</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
   <option value="">Small</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
</label>
<label class="field">
<span class="label">Default</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
   <option value="">Default</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>
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

## Grouped

Wrap your options in an element with `role="group"`. The `<label>` inside will be used as a group heading.

<Example row>
<template #example>
<label class="field">
<span class="label">Grouped</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
  <option value="">Select car</option>
   <div role="group">
   <label>Swedish cars</label>
    <option>Volvo</option>
    <option>SAAB</option>
   </div>
   <div role="group">
   <label>French cars</label>
    <option>Renault</option>
    <option>Citroën</option>
   </div>
  </div>
</select>
</label>
</template>

<template #code>

```html{9,10,13-15,18}
<label class="field">
  <span class="label">Small</span>
  <select>
    <button>
      <selectedcontent></selectedcontent>
    </button>
    <div class="list">
      <option>Select car</option>
      <div role="group">
        <label class="text">Swedish cars</label>
        <option>Volvo</option>
        <option>SAAB</option>
      </div>
      <div role="group">
        <label class="text">French cars</label>
        <option>Renault</option>
        <option>Citroën</option>
      </div>
    </div>
  </select>
</label>
```

</template>
</Example>

## Dense

Since the Select popover uses the [List component](/components/data-display/list) we can simply apply its `.dense` modifier class.

<Example row>
<template #example>
<label class="field">
<span class="label">Dense</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list dense">
    <option value="">Dense</option>
    <option>Dense Two</option>
    <option>Dense Three</option>
  </div>
</select>
</label>
</template>
<template #code>

```html{6}
<div class="field">
  <select>
    <button>
      <selectedcontent></selectedcontent>
    </button>
    <div class="list dense">
      <option>Dense</option>
      <option>Dense Two</option>
      <option>Dense Three</option>
    </div>
  </select>
</div>
```

</template>
</Example>

<style scoped>
  .anatomy {
    display: grid;
    gap: 6px;
    outline: var(--_anatomy-border-gray);
    outline-offset: 4px;

    & > * {
      outline: var(--_anatomy-border-red);
    }

    button:after {
      outline: var(--_anatomy-border-red);
      outline-offset: 2px;
    }
  }
</style>

## Validation

The `.error` class toggles the error styles. Make use of the supporting text to give extra feedback on the error.

<Example row>
<template #example>
<label class="field error">
	<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
   <option>Outlined (default)</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>	<span class="supporting-text">Only double-negatives are allowed.</span>
</label>

<label class="field error filled">
	<span class="label">Label</span>
<select>
  <button>
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
   <option>Filled</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</select>	<span class="supporting-text">Only letters from the first half of the alphabet are allowed.</span>
</label>
</template>
<template #code>

```html{1}
<label class="field error">
  <span class="label">Label</span>
  <select> <!-- --> </select>
  <span class="supporting-text">Supporting text</span>
</label>
```

</template>
</Example>

## Non-experimental Select

Just implement the Select as you normally would.

<Example row>
<template #example>
<label class="field">
  <span class="label">Label</span>
  <select>
    <option value="">-</option>
    <option>Option</option>
    <option>Option</option>
  </select>
</label>

<label class="field filled">
  <span class="label">Label</span>
  <select>
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</label>
</template>
<template #code>

```html
<label class="field">
  <span class="label">Label</span>
  <select>
    <option value="">-</option>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</label>
```

</template>
</Example>

## Anatomy

1. Select container: `<select>`
2. Select button: `<button>`
3. Select button selected option: `<selectedcontent>`
4. Select button arrow
5. Popover list: `.list`
6. List option/s: `<option>`
7. List option group/s (optional): `<optgroup>`

<Example column>
<template #example>
<div class="anatomy" style="margin: 0 auto;">
<div class="field">
<select>
  <button class="anatomy">
    <selectedcontent></selectedcontent>
  </button>
  <div class="list">
   <option>Option One</option>
  </div>
</select>
</div>
<div class="list">
   <option checked>Option One</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </div>
</div>
</template>
</Example>

## Accessibility

<div class="not-rich-text">
<Alert title="Experimental status" seveity="warning">

This way of writing Selects are currently quite experimental. Accessible solutions are on the way, but not solved yet.
</Alert>

</div>

## API

### Field API

<!--@include: ./field-api.md -->

### List API

<!--@include: ../data-display/list-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark', 'color-mix']" />

## Installation

::: code-group
<<< @/../src/inputs/field.css [field.css]
<<< @/../src/inputs/select.css [select.css]
<<< @/../src/data-display/list.css [list.css]
:::

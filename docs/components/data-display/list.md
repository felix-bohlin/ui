---
overline: Components
title: List
---

<script setup>
import {ref} from "vue"
import Example from "../../.vitepress/theme/app/components/Example.vue";
import Baseline from "../../.vitepress/theme/app/components/Baseline.vue";
import ListAll from "./list-all.vue"
import Alert from "../../.vitepress/theme/app/components/Alert.vue";
import Accordion from "../../.vitepress/theme/app/components/Accordion.vue";

const denseClass = ref(true)
</script>

<style scoped>
.example ul {
  margin: 0 auto;
  max-inline-size: 40ch;
}
</style>

Lists are continuous, vertical indexes of text and images and video.

- Use lists to help users find a specific item and act on it
- Order list items in logical ways (like alphabetical or numerical)
- Three sizes: one-line, two-line, and three-line
- Keep items short and easy to scan
- Show icons, text, and actions in a consistent format

<Example>

<template #example>

<ul class="list">

<ListAll />

</ul>
</template>

</Example>

## Configurations

A List item is split up in three parts:

- [`.text`](#text): main content
- [`.start`](#start-items) (optional): items before the main content
- [`.end`](#end-items) (optional): items after the main content

<div class="not-rich-text">
<Alert title="With great power...">

The List component is _extremely_ flexible and versatile. Be careful if you start creating new configurations on your own. Maybe an existing one can solve your problem, but in another way?
</Alert>

</div>

### Clickable List item

Wrap the elements of your List item with a `a`, `button` or `label` depending on use-case.

<Example>

<template #example>

<ul class="list">
  <li>
    <button>
      <div class="text">
        <p>Button list item</p>
      </div>
    </button>
  </li>
  <li>
    <a href="#clickable-list-item">
      <div class="text">
        <p>Link list item</p>
      </div>
    </a>
  </li>
<li>
    <label class="checkbox" for="clickable-checkbox">
      <div class="text">
        <p>Checkbox</p>
      </div>
      <div class="end">
        <input id="clickable-checkbox" type="checkbox"  />
      </div>
    </label>
  </li>
</ul>
</template>

<template #code>

```html{2,6,10}
<li>
  <button><!--  --></button>
</li>

<li>
  <a><!--  --></a>
</li>

<li>
  <label><!--  --></label>
</li>
```

</template>
</Example>

### Text

Main text lives in `div.text`.

<Example>

<template #example>

<ul class="list">
  <li>
    <div class="text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>

  <li>
    <div class="text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple lines.
      </p>
    </div>
  </li>
</ul>
</template>

<template #code>

```html
<li>
  <div class="text">
    <p>Headline</p>
    <p>
      Supporting text that truly is quite long enough to fill up multiple lines.
    </p>
  </div>
</li>
```

</template>
</Example>

### Start items

Found in `div.start`.

#### Icon

<Example>
<template #example>
<ul class="list">
<li>
	<div class="start">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"/></svg>
	</div>

<div class="text">
  <p>Headline</p>
</div>
</li>

<li>
	<div class="start">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"/></svg>
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>
</li>
</ul>

</template>

<template #code>

```html{2-4}
<li>
  <div class="start">
    <svg></svg>
  </div>

  <div class="text">
    <p>Headline</p>
  </div>
</li>
```

</template>
</Example>

#### Avatar

Read more: [Avatar](/components/data-display/avatar)

<Example>
<template #example>
<ul class="list">
<li>
	<div class="start">
		<div class="avatar">AB</div>
	</div>

<div class="text">
  <p>Headline</p>
</div>
</li>

<li>
	<div class="start">
		<div class="avatar">
    <img src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>
</li>
</ul>

</template>

<template #code>

```html{2-4}
<li>
  <div class="start">
    <div class="avatar"></div>
  </div>

  <div class="text">
    <p>Headline</p>
  </div>
</li>
```

</template>
</Example>

#### Image

<Example>
<template #example>
<ul class="list">
<li>
	<div class="start">
		<img src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>
</li>
<li>
	<div class="start">
		<img src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>
</li>
</ul>

</template>
<template #code>

```html{2-4}
<li>
  <div class="start">
    <img />
  </div>

  <div class="text">
    <p>Headline</p>
    <p>Supporting text</p>
  </div>
</li>
```

</template>
</Example>

#### Video

<Example>

<template #example>

<ul class="list">
<li>
	<div class="start">
		<video controls muted>
			<source src="https://videos.pexels.com/video-files/29210993/12610809_1920_1080_24fps.mp4" />
			Your browser does not support the video tag.
		</video>
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>

<div class="end">
	13:37
</div>
</li>
<li>
	<div class="start">
		<video controls muted>
			<source src="https://videos.pexels.com/video-files/29210993/12610809_1920_1080_24fps.mp4" />
			Your browser does not support the video tag.
		</video>
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>

<div class="end">
	90s
</div>
</li>
</ul>
</template>

<template #code>

```html{2-4}
<li>
  <div class="start">
    <video><source /></video>
  </div>

  <div class="text">
    <p>Headline</p>
    <p>Supporting text</p>
  </div>
</li>
```

</template>
</Example>

### End items

Found in `div.end`.

#### Text

<Example>

<template #example>

<ul class="list">
  <li>
    <div class="text">
      <p>Headline</p>
    </div>

  <div class="end">
    30kB
  </div>
  </li>
  <li>
    <div class="text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>

  <div class="end">
99%
  </div>
  </li>

  <li>
    <div class="text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple lines.
      </p>
    </div>

  <div class="end">
    100+
  </div>
  </li>
</ul>
</template>

<template #code>

```html{6}
<li>
  <div class="text">
    <p>Headline</p>
  </div>

  <div class="end">30kB</div>
</li>

```

</template>
</Example>

#### Keyboard command

<Example>

<template #example>

<ul class="list">
  <li>
    <div class="text">
      <p>Save All</p>
    </div>

  <div class="end">
    <kbd>CTRL+ALT+DEL</kbd>
  </div>
  </li>
  <li>
  <div class="text">
    <p>Save</p>
  </div>

  <div class="end">
    <kbd>CTRL+S</kbd>
  </div>
</li>
</ul>
</template>

<template #code>

```html{7}
<li>
  <div class="text">
    <p>Save all</p>
  </div>

  <div class="end">
    <kbd>CTRL+ALT+DEL</kbd>
  </div>
</li>
```

</template>
</Example>

#### Checkbox

Wrap the List item content with a `<label class="checkbox" for="INPUTID">` to make the entire surface clickable.

Read more: [Checkbox](/components/inputs/checkbox)

<Example>
<template #example>
<ul class="list">
<li>
  <label class="checkbox" for="checkbox-example-1">
    <div class="text">
      <p>Checkbox</p>
    </div>
    <div class="end">
      <input id="checkbox-example-1" type="checkbox"  />
    </div>
    </label>
</li>
<li>
  <label class="checkbox" for="checkbox-example-2">
    <div class="text">
      <p>Checkbox</p>
    </div>
    <div class="end">
      <input id="checkbox-example-2" type="checkbox"  />
    </div>
    </label>
</li>

</ul>
</template>

<template #code>

```html
<li>
  <label class="checkbox" for="checkbox-example-1">
    <div class="text"></div>
    <div class="end">
      <input id="checkbox-example-1" type="checkbox" />
    </div>
  </label>
</li>
```

</template>
</Example>

#### Radio

Wrap the List item content with a `<label class="radio" for="INPUTID">` to make the entire surface clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](/components/inputs/radio)

<Example hideCode>
<template #example>
<ul class="list">
<li>
  <label class="radio" for="radio-example-1">
    <div class="text">
      <p>Radio 1</p>
    </div>
    <div class="end">
      <input  id="radio-example-1" name="radio-example-group-1" type="radio" />
    </div>
    </label>
</li>

<li>
  <label class="radio" for="radio-example-2">
    <div class="text">
      <p>Radio 2</p>
    </div>
    <div class="end">
      <input id="radio-example-2" name="radio-example-group-1" type="radio" />
    </div>
    </label>
</li>

</ul>
</template>

<template #code>

```html
<li>
  <label class="radio" for="radio-example-1">
    <div class="text">Radio 1</div>
    <div class="end">
      <input id="radio-example-1" name="radio-example-group" type="radio" />
    </div>
  </label>
</li>

<li>
  <label class="radio" for="radio-example-2">
    <div class="text">Radio 2</div>
    <div class="end">
      <input id="radio-example-2" name="radio-example-group" type="radio" />
    </div>
  </label>
</li>
```

</template>
</Example>

#### Switch

Read more: [Switch](/components/inputs/switch)

<Example hideCode>
<template #example>
<ul class="list">
<li>
  <label class="switch" for="switch-example-1">
    <div class="text">
      <p>Switch 1</p>
    </div>
    <div class="end">
      <input id="switch-example-1" role="switch" type="checkbox"  />
    </div>
  </label>
</li>

<li>
  <label class="switch" for="switch-example-2">
    <div class="text">
      <p>Switch 2</p>
    </div>
    <div class="end">
      <input id="switch-example-2" role="switch" type="checkbox" />
    </div>
    </label>
</li>

</ul>
</template>

<template #code>

```html
<li>
  <label role="switch" class="switch" for="switch-example-1">
    <div class="text">Switch 1</div>
    <div class="end">
      <input id="switch-example-1" type="checkbox" />
    </div>
  </label>
</li>
```

</template>
</Example>

## Inset

Enables a list item without a start icon to align with items that do.

<Example>

<template #example>

<ul class="list">
<li>
	<div class="start">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"/></svg>
	</div>

<div class="text">
  <p>No inset</p>
</div>
</li>

<li class="inset">
  <div class="text">
    <p>Inset class</p>
    <p>Makes the text line up nicely</p>
  </div>
</li>

<li class="inset">
	<div class="start">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m13.94 5l5.061 5.06L9.063 20a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.921l1.394-5.116a2.25 2.25 0 0 1 .58-.999zm-7.414 6l-1.5 1.5H2.75a.75.75 0 0 1 0-1.5zm14.352-8.174l.153.144l.145.153a3.58 3.58 0 0 1-.145 4.908l-.97.969L15 3.94l.97-.97a3.58 3.58 0 0 1 4.908-.144M10.526 7l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5zm4-4l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5z"/></svg>
	</div>
<div class="text">
	<p>Inset class</p>
  <p>Any <code>div.start</code> will be hidden when inset</p>
</div>
</li>
</ul>
</template>

<template #code>

```html
<li class="inset">
  <!--  -->
</li>
```

</template>
</Example>

## Gutterless

Apply the `.gutterless` class on the `ul.list` element to remove the inline padding on the list items.

<Example>
<template #example>
<ul class="list gutterless">
<li>
<div class="text">
  <p>Delete</p>
</div>

<div class="end">
  <button class="icon-button">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"/></svg>
    </button>
</div>
</li>

<li>
	<div class="start">
		<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"/></svg>
	</div>

<div class="text">
  <p>Headline</p>
  <p>Supporting text</p>
</div>

<div class="end">
	100+
</div>
</li>
</ul>
</template>

<template #code>

```html
<ul class="list gutterless">
  <!--  -->
</ul>
```

</template>
</Example>

## Borders

### On every item

Apply the `.bordered` class on the `ul.list` element to give all list items a border.

<Example>
<template #example>
<ul class="list bordered">
	<li>
<div class="text">
	<p>So</p>
</div>
</li>
<li>
<div class="text">
	<p>Many</p>
</div>
</li>
	<li>
<div class="text">
	<p>Borders</p>
</div>

</li>
</ul>
</template>

<template #code>

```html
<ul class="list bordered">
  <!--  -->
</ul>
```

</template>
</Example>

### On one item

Apply the `.border-top` class on a `li.list` item to give it an upper border.

<Example>
<template #example>

<ul class="list">
	<li>
<div class="text">
	<p>I need borders</p>
</div>
</li>
<li>
<div class="text">
	<p>Help</p>
</div>
</li>
	<li class="border-top">
<div class="text">
	<p>Thanks</p>
</div>

</li>
</ul>

</template>

<template #code>

```html{4}
<ul class="list">
  <li></li>
  <li></li>
  <li class="border-top"></li>
</ul>
```

</template>
</Example>

## Dense

Simply add the `.dense` class to the `ul` element.

<Example>

<template #example>

<label class="checkbox"  for="dense-toggle">
  <input v-model="denseClass" id="dense-toggle" name="checkbox" type="checkbox" checked="checked" />
  <code>{{denseClass ? `<ul class="list dense">` : `<ul class="list">`}}</code>
</label>

<ul class="list" :class="{'dense': denseClass}">

<ListAll />

</ul>
</template>

<template #code>

```html
<ul class="list dense">
  <!--  -->
</ul>
```

</template>

</Example>

<style>
  .anatomy {
    outline: var(--_anatomy-border-gray);
    outline-offset: 2px;
    & > * {
      outline: var(--_anatomy-border-red) !important;
    }
  }
</style>

## Anatomy

1. Container: `ul.list`
2. List item: `li`
3. Content wrapper (optional): `a`, `button`, `label`
4. Start content (optional): `.start` > `svg`, `img`, `video`
5. Text content: `.text` > `p`, `p + p`
6. End content (optional): `.end` > `svg`, `p`, `button`, `a`, `input`

<Example>
<template #example>
<ul class="list anatomy">
  <li class="anatomy">
    <div class="start">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7.75 10.5a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5m4.25 0a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5m5.5 1.25a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0m-8.5 4a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0m4.25 0a1.25 1.25 0 1 0-2.5 0a1.25 1.25 0 0 0 2.5 0m3-1.25a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5M10.537 2.534a2.25 2.25 0 0 1 2.903-.002L20.2 8.23c.507.427.8 1.057.8 1.72v9.299A1.75 1.75 0 0 1 19.25 21H4.75A1.75 1.75 0 0 1 3 19.25v-9.3c0-.662.292-1.29.797-1.718zm1.936 1.145a.75.75 0 0 0-.968 0l-6.74 5.698a.75.75 0 0 0-.265.573v9.3c0 .138.112.25.25.25h14.5a.25.25 0 0 0 .25-.25v-9.3a.75.75 0 0 0-.267-.573z"/></svg>
    </div>
    <div class="text">
      <p>Text</p>
    </div>
    <div class="end">15%</div>
  </li>
</ul>
</template>

<template #code>

```html
<ul class="list">
  <li>
    <!-- 3 -->

    <div class="start">
      <!-- 4 -->
    </div>

    <div class="text">
      <!-- 5 -->
    </div>

    <div class="end">
      <!-- 6 -->
    </div>
  </li>
</ul>
```

</template>
</Example>

## API

<!--@include: ./list-api.md -->

## Browser compatibility

<Baseline :ids="['light-dark']" />

## Installation

::: code-group
<<< @/../node_modules/opui-css/src/components/list.css [list.css]
:::

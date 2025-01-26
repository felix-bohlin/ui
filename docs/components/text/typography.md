---
overline: Components
title: Typography
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue"
import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

## Variants

<Example>
<template #example>
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p class="large">Body Large</p>
<p>Body</p>
<p class="overline">Overline</p>
<caption>Caption</caption>

</template>

<template #code>

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
<p class="large">Body Large</p>
<p>Body</p>
<p class="overline">Overline</p>
<caption>
  Caption
</caption>
```

  </template>
</Example>

## Heading group

<Example>
<template #example>
<hgroup>
  <p>Zero or more p elements</p>
  <h2>Followed by one h* element</h2>
  <p>Followed by zero or more p elements</p>
</hgroup>
</template>

<template #code>

```html
<hgroup>
  <p>Zero or more p elements</p>
  <h2>Followed by one h* element</h2>
  <p>Followed by zero or more p elements</p>
</hgroup>
```

</template>
</Example>

<div class="not-rich-text">
<Alert>
<template #title>
<code>&lt;hgroup&gt;</code> spec
</template>

<div class="rich-text">

- Zero or more p elements...
- ... followed by one h1, h2, h3, h4, h5, or h6 element...
- ...followed by zero or more p elements.

[Source](https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element)

</div>
</Alert>
</div>

## Inline text elements

<div class="not-rich-text">

| Result                                  | Code                    |
| --------------------------------------- | ----------------------- |
| <abbr title="Abbreviation">Abbr.</abbr> | `<abbr>`                |
| <dfn title="Title">Definition</dfn>     | `<dfn>`                 |
| <strong>Bold</strong>                   | `<strong>`, `<b>`       |
| <i>Italic</i>                           | `<i>`, `<em>`, `<cite>` |
| <del>Deleted</del>                      | `<del>`                 |
| <ins>Inserted</ins>                     | `<ins>`                 |
| <kbd>Ctrl + S</kbd>                     | `<kbd>`                 |
| <mark>Highlighted</mark>                | `<mark>`                |
| <s>Strikethrough</s>                    | `<s>`                   |
| <small>Small</small>                    | `<small>`               |
| Text <sub>Sub</sub>                     | `<sub>`                 |
| Text <sup>Sup</sup>                     | `<sup>`                 |
| <u>Underline</u>                        | `<u>`                   |

</div>

## Blockquote

<Example>

<template #example>

<blockquote>
  "Occupy your mind, don't stay home. Talk to all your friends, but don't look at your phone”
  <footer>
    — Marika Hackman, <cite>No Caffeine</cite>
  </footer>
</blockquote>

</template>

<template #code>

<!-- prettier-ignore -->
```html
<blockquote>
  "Occupy your mind, don't stay home. Talk to all your friends, but don't look at your phone”
  <footer>
    — Marika Hackman, <cite>No Caffeine</cite>
  </footer>
</blockquote>
```

</template>
</Example>

## Browser compatibility

<Baseline :ids="['box-decoration-break', 'scope', 'light-dark','color-mix']" />

## Installation

::: code-group
<<< @/../src/text/typography.css [typography.css]
:::

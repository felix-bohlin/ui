---
overline: Blocks
title: Teaser
layout: page
hasAside: true
---

<script setup>
import Example from "../.vitepress/theme/app/components/Example.vue"
import Baseline from "../.vitepress/theme/app/components/Baseline.vue"
</script>

<div class="container large rich-text">

<Example>
	<template #example>
	<div class="container teaser">
      <div class="content">
        <h2>Default teaser</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
      </div>
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
    </div>
  </template>

<template #code>

  ```html
  <div class="container teaser">
    <div class="content">
      <h2>Default teaser</h2>
      <p>Our teasers are only made from high-quality teaser ingredients.</p>

      <div class="actions">
        <a class="link">Link this</a>
      </div>
    </div>

    <picture>
      <img src="/background.jpg" alt="Calm body of water" />
    </picture>
  </div>
  ```
</template>
</Example>

## With actions
You can add a link or a button inside the `.actions` wrapper.

<Example>
	<template #example>
	<div class="container teaser">
      <div class="content">
        <h2>Default teaser</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
         <div class="actions">
          <a class="link">Link this</a>
        </div>
      </div>
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
    </div>
  </template>

<template #code>

  ```html{6-8}
  <div class="container teaser">
    <div class="content">

      <!-- ... -->

      <div class="actions">
        <a class="link">Link this</a>
      </div>
    </div>

    <picture>
      <img src="/background.jpg" alt="Calm body of water" />
    </picture>
  </div>
  ```
</template>
</Example>

## Media first
Just swap the `.content` and the media around.

<Example>
	<template #example>
	<div class="container teaser">
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
      <div class="content">
        <h2>Media first</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
        <div class="actions">
          <a class="link">Link this</a>
        </div>
      </div>
    </div>
  </template>

<template #code>

::: code-group

  ```html [media first]
  <div class="container teaser">
    <picture>
      <!--  -->
    </picture>

    <div class="content">
      <!-- ... -->
    </div>
  </div>
  ```
  ```html [content first]
  <div class="container teaser">
    <div class="content">
      <!-- ... -->
    </div>

    <picture>
      <!--  -->
    </picture>
  </div>
  ```
:::
</template>
</Example>

## Variants
### Keep content on top

If you want to keep the media below your content when elemenst start stacking, use the `.content-first` class.

<Example>
	<template #example>
	<div class="container small teaser content-first">
      <div class="content">
        <h2>Keep content on top</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
        <div class="actions">
          <a class="link">Link this</a>
        </div>
      </div>
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
    </div>
  </template>

<template #code>

  ```html{1}
  <div class="container teaser content-first">
   <!-- ... -->
  </div>
  ```
</template>
</Example>

### Vertically align to top

By default everything is vertically centered, but you can use the `.align-top` class to vertically align to the top.

<Example>
	<template #example>
	<div class="container teaser align-top">
      <div class="content">
        <h2>Align top</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
        <div class="actions">
          <a class="link">Link this</a>
        </div>
      </div>
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
    </div>
  </template>

<template #code>

  ```html{1}
  <div class="container teaser align-top">
   <!-- ... -->
  </div>
  ```
</template>
</Example>

## Anatomy
1. `.teaser`: parent class
2. `& > .content`: a wrapper for text and call-to-actions
3. `& > .content > .actions` (optional): a wrapper for call-to-actions
4. `& > picture/video`: media element

<Example>
	<template #example>
	<div class="container teaser anatomy">
      <div class="content">
        <h2>Default teaser</h2>
        <p>Our teasers are only made from high-quality teaser ingredients.</p>
        <div class="actions">
          <a class="link">Link this</a>
        </div>
      </div>
      <picture>
        <img src="/background.jpg" alt="Calm body of water" />
      </picture>
    </div>
  </template>

<template #code>

  ```html
  <div class="container teaser">
    <div class="content">
      <!--  -->

      <div class="actions">
        <!--  -->
      </div>
    </div>

    <picture>
      <img src="/background.jpg" alt="Calm body of water" />
    </picture>
  </div>
  ```
</template>
</Example>

## API
<!--@include: ./teaser-api.md -->

## Browser compatibility

<Baseline :ids="['container-queries']" />


## Installation

::: code-group
<<< @/../node_modules/opui-blocks/src/blocks/teaser/teaser.css [teaser.css]
:::
</div>





<style scoped>
.anatomy {
	outline: var(--_anatomy-border-gray);
	outline-offset: 8px;

	.actions, .content, picture,video,img {
		outline: var(--_anatomy-border-red);
		outline-offset: 2px;
	}
}

:where(h2[id]) {
  margin-block: 2em 1em;
}
</style>

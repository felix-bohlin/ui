---
overline: Components
title: Accordion
---

<script setup>
	import Example from "../../.vitepress/theme/app/components/Example.vue"
	import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
  import Alert from "../../.vitepress/theme/app/components/Alert.vue";
</script>

<style>
.anatomy {
	outline: var(--_anatomy-border-gray);
	outline-offset: 8px;

	.actions, .content, summary {
		outline: var(--_anatomy-border-red);
	}
}

.custom-arrow {
	 summary {
    align-items: center;
    display: flex;
    justify-content: space-between;
    list-style: none;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    svg {
      transition: rotate 0.2s var(--ease-1);
    }
  }

  &[open] > summary svg {
    rotate: 180deg;
  }
}
</style>

Leverages the HTML `details` and `summary` elements. Uses the native HTML arrow, check out how to add your own [custom arrow](#custom-arrow).

## Basics

<Example column>
<template #example>
 <details class="card">
	<summary id="summary-id" aria-controls="content-id">
		Accordion
	</summary>
	<div id="content-id" class="content" role="region" aria-labelledby="summary-id">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>
</template>

<template #code>

```html
<details class="card">
  <summary id="summary-id" aria-controls="content-id">Accordion title</summary>
  <div
    id="content-id"
    class="content"
    role="region"
    aria-labelledby="summary-id"
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

</template>
</Example>

## Variants

<Example column>
	<template #example>
	<details class="card">
	<summary id="summary1" aria-controls="content1">
		Text
	</summary>
	<div id="content1" class="content" role="region" aria-labelledby="summary1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details class="card elevated">
	<summary id="summary2" aria-controls="content2">
		Elevated
	</summary>
	<div id="content2" class="content" role="region" aria-labelledby="summary2">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details class="card outlined">
	<summary id="summary3" aria-controls="content3">
		Outlined
	</summary>
	<div id="content3" class="content" role="region" aria-labelledby="summary3">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details class="card tonal">
	<summary id="summary3" aria-controls="content3">
		Tonal
	</summary>
	<div id="content3" class="content" role="region" aria-labelledby="summary3">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>
	</template>

<template #code>

```html
<!-- Text (default) -->
<details class="card">
  <!--  -->
</details>

<!-- or -->

<details class="card text">
  <!--  -->
</details>

<!-- Elevated -->
<details class="card elevated">
  <!--  -->
</details>

<!-- Outlined -->
<details class="card outlined">
  <!--  -->
</details>

<!-- Tonal -->
<details class="card tonal">
  <!--  -->
</details>
```

</template>
</Example>

## Accordion group

- Apply the `.card` class to a parent element.
- You are still able to set [variant](#variants) styles, but instead of doing it on the individual elements - apply the variant class on the `.card` element instead.

<Example column>
	<template #example>
	<div class="card outlined">
 <details>
	<summary id="summary1" aria-controls="content1">
		Accordion title
	</summary>
	<div id="content1" class="content" role="region" aria-labelledby="summary1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details>
	<summary id="summary2" aria-controls="content2">
		Accordion title
	</summary>
	<div id="content2" class="content" role="region" aria-labelledby="summary2">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details>
	<summary id="summary3" aria-controls="content3">
		Accordion title
	</summary>
	<div id="content3" class="content" role="region" aria-labelledby="summary3">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>
</div>
</template>

<template #code>

```html {1,11}
<div class="card outlined">
  <details>
    <!--  -->
  </details>
  <details>
    <!--  -->
  </details>
  <details>
    <!--  -->
  </details>
</div>
```

</template>
</Example>

### Only show one accordion at a time

To have the newly opened accordion close the prior, apply a shared `[name]` attribute to all `<details>` elements.

<Example column>
	<template #example>
	<div class="card outlined">
	<div class="content">
 <details name="example-group">
	<summary id="summary1" aria-controls="content1">
		Accordion title
	</summary>
	<div id="content1" class="content" role="region" aria-labelledby="summary1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details name="example-group">
	<summary id="summary2" aria-controls="content2">
		Accordion title
	</summary>
	<div id="content2" class="content" role="region" aria-labelledby="summary2">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>

<details name="example-group">
	<summary id="summary3" aria-controls="content3">
		Accordion title
	</summary>
	<div id="content3" class="content" role="region" aria-labelledby="summary3">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>
</div>
</div>
</template>

<template #code>

```html {2,5,8}
<div class="card outlined">
  <details name="example-group">
    <!--  -->
  </details>
  <details name="example-group">
    <!--  -->
  </details>
  <details name="example-group">
    <!--  -->
  </details>
</div>
```

</template>
</Example>

## Actions

<Example>
<template #example>
 <details open class="elevated">
	<summary id="summary1" aria-controls="content1">
		Accordion with actions
	</summary>
	<div id="content1" class="content" role="region" aria-labelledby="summary1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare.</p>
	</div>
  <div class="actions">
    <button class="button">Cancel</button>
    <button class="button">Agree</button>
  </div>
</details>
</template>

<template #code>

```html {12-15}
<details open class="outlined">
  <summary id="summary1" aria-controls="content1">
    Accordion with actions
  </summary>
  <div id="content1" class="content" role="region" aria-labelledby="summary1">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
  </div>
  <div class="actions">
    <button class="button">Cancel</button>
    <button class="button">Agree</button>
  </div>
</details>
```

</template>
</Example>

## Custom arrow

If the native `details` arrow doesn't suit your needs you can easily modify the `accordion.css` file to add your own preferred icon.

<Example column>
<template #example>
<details class="outlined custom-arrow">
	<summary id="summary1" aria-controls="content1">
		Custom arrow
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"/></svg>
	</summary>
	<div id="content1" class="content" role="region" aria-labelledby="summary1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
</details>
</template>

<template #code>

::: code-group

```html {4-14} [accordion.html]
<details class="outlined">
  <summary id="summary1" aria-controls="content1">
    Custom arrow
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div id="content1" class="content" role="region" aria-labelledby="summary1">
    <!--  -->
  </div>
</details>
```

```css [accordion.css]
details {
  summary {
    align-items: center;
    display: flex;
    justify-content: space-between;
    list-style: none;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    svg {
      transition: rotate 0.3s var(--ease-1);
    }
  }

  &[open] > summary svg {
    rotate: 180deg;
  }

  /* ... */
}
```

:::
</template>
</Example>

## Accessibility

The [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) for accordions recommend:

- `summary` element
  - adding id and aria-controls
  - adding aria-expanded (if using JS)
- content wrapper
  - adding id, role and aria-labelledby

## Anatomy

1. `<details>`: a wrapper for the accordion
2. `<summary>`: a wrapper for the accordion header
3. `& > .content` (optional): a wrapper for the accordion content
4. `& > .actions` (optional): a wrapper that groups a set of buttons

<Example column>
<template #example>
 <details open class="anatomy">
	<summary id="anatomy-summary-1" aria-controls="anatomy-content-1">
		Accordion title
	</summary>
	<div id="anatomy-content-1" class="content" role="region" aria-labelledby="anatomy-summary-1">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse potenti. Cras ut ante in libero tempus sodales sed quis dolor.</p>
	</div>
  <div class="actions">
    <button class="button">Cancel</button>
    <button class="button">Agree</button>
  </div>
</details>
</template>

<template #code>

```html
<details>
  <summary id="summary-1" aria-controls="content-1">
    <!--  -->
  </summary>
  <div id="content-1" class="content" role="region" aria-labelledby="summary-1">
    <!--  -->
  </div>
  <div class="actions">
    <!--  -->
  </div>
</details>
```

</template>
</Example>

## API

These are the classes and attributes a card can be styled with. As usual, feel free to add your own!

<!--@include: ./accordion-api.md -->

## Browser compatibility

<Baseline :ids="['container-style-queries', 'interpolate-size', 'details-content', 'details-name', 'content-visibility']" />

## Installation

<div class="not-rich-text" style="margin-block-end: var(--size-3);">
<Alert>
<div class="rich-text">

Accordion has [card](/components/data-display/card) as a dependency.

</div>
</Alert>

</div>

::: code-group
<<< @/../node_modules/opui-css/src/components/accordion.css [accordion.css]
<<< @/../node_modules/opui-css/src/components/card.css [card.css]
:::

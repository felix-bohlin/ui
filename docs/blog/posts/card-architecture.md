---
date: 2024-11-14
hideHeadings: true
title: Card component architecture design decisions
category: blog
tags: card, architecture decisions
excerpt: Is that even a thing? What is there to decide?
status: public
---

<style>
	.grid {
		display: grid;
		gap: 0 var(--size-3, 1rem);
		grid-template-columns: repeat(auto-fit, minmax(30ch, 1fr));
		margin: var(--size-3, 1rem) 0;
		& > * {
			margin: 0 !important;
		}
	}

	div[class*="language-"] {
		margin: 16px 0 !important;
	}

</style>

<hgroup>
	<p>2024-11-13</p>
	<h1>Card component architecture design decisions</h1>
	<p><a href="/components/card">Card</a> components are very flexible, which means they could basically do anything - making the design of it a surprising challenge. Let's talk about that.</p>
</hgroup>

By just looking at the examples below `card-alternative.html` is much more elegant and semantic than the card you'll find today in Open Props UI.

<div class="grid">

::: code-group

```html [card.html]
<div class="card">
  <hgroup>
    <!-- -->
  </hgroup>
  <div class="content">
    <!--  -->
  </div>
  <div class="actions">
    <!--  -->
  </div>
</div>
```

:::

::: code-group

```html [card-alternative.html]
<article class="card">
  <header>
    <!--  -->
  </header>
  <div class="content">
    <!--  -->
  </div>
  <footer>
    <!--  -->
  </footer>
</article>
```

:::

</div>

This would unfortunately cause inconsistencies between components. The [accordion](/components/accordion#actions) component already follows the heading/content/actions pattern - having cards use a different structure would mean developers would need to remember two different approaches for basically the same layout.

<div class="grid">

::: code-group

```html {5-10} [accordion.html]
<details>
  <summary>
    <!--  -->
  </summary>
  <div class="content">
    <!--  -->
  </div>
  <div class="actions">
    <!--  -->
  </div>
</details>
```

:::

::: code-group

```html {5-10} [card.html]
<div class="card">
  <hgroup>
    <!-- -->
  </hgroup>
  <div class="content">
    <!--  -->
  </div>
  <div class="actions">
    <!--  -->
  </div>
</div>
```

:::

</div>

The alternative is to wrap the accordion content in an `<article>` element so we can define a [sectioning content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#sectioning_content), thereby allowing us to use the `<footer>` instead of the `.actions` class.

::: code-group

```html {6,13} [accordion.html]
<details>
  <summary>
    <!--  -->
  </summary>

  <article>
    <div class="content">
      <!--  -->
    </div>
    <footer>
      <!--  -->
    </footer>
  </article>
</details>
```

:::

This though, doesn't look right at all. Why? Well, according to the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) each `<article>` should among other things:

- represent a self-contained, independent item of content
- "be identified, typically by including a heading (`<h1>` - `<h6>` element) as a child of the `<article>` element".

This solution doesn't really meet those criteria.

## The decision

:x: Have different HTML structures for the accordion, card and any other future component that might share the same heading, content, actions structure. This solution should promote more semantic HTML.

:white_check_mark: Streamline the structure into a more cohesive one. It prioritizes DX over perfect semantics and should result in less things to memorize and reduce cognitive load.

### Reasoning

Reducing the learning curve and barrier to entry when making a component library is one of the most important aspects. This isn't black and white and, of course _depends_ :tm: but in this case it was the right call. This perfectly illustrates the tension in component library design between what's theoretically pure and practical.

Do you agree? If not, [let me know](https://github.com/felix-bohlin/ui/discussions) or why not open an [issue or a PR](https://github.com/felix-bohlin/ui)? :)

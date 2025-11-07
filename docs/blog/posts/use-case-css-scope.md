---
date: 2024-11-14
overline: "2024-11-14"
title: A perfect use case for @scope
description: So many ugly hacks... gone!
category: blog
tags: "@scope, typography"
excerpt: What a life-saver!
status: public
---

<script setup>
import Example from "../../.vitepress/theme/app/components/Example.vue"
import Baseline from "../../.vitepress/theme/app/components/Baseline.vue"
</script>

<Baseline :ids="['scope']" />

## The problem

Below is a simplification of what an article page on this website could look like. `.rich-text` provides very nice rich text styles for blog and docs articles.

::: code-group

```html [article.html]
<article class="rich-text">
  <h1>Title</h1>
  <p>Paragraph</p>

  <div class="code-example-component">
    <!--  -->
  </div>
</article>
```

:::

The problem anyone runs into when approaching a page structure like this is that the `.rich-text` styles sneak into your preciously styled components that you don't want polluted with other styles. When coding vanilla CSS we're completely at
the mercy of [ _the
cascade_](https://web.dev/learn/css/the-cascade?continue=https%3A%2F%2Fweb.dev%2Flearn%2Fcss%2F%23article-https%3A%2F%2Fweb.dev%2Flearn%2Fcss%2Fthe-cascade):tm:,
so we need to be mindful of what styles flow where.

But what if we could tell CSS to just... look the other way and not care about our custom, precious components? :shrug:

## Enter `@scope`

Developers have been quite confused by `@scope` ever since it was announced believing CSS _finally_ solved style
scoping, but no that's not it. Basically `@scope` is primarily about defining a boundary for where your styles should
apply, and depending on how creative you get with the selectors you can do some pretty cool stuff. If that meant absolutely nothing to you, don't worry - you will get the hang of it soon. Keep reading.

::: tip
Read through the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) for more comprehensive info. It's
actually quite good.
:::

If we introduce a second class, let's call it `.not-rich-text`, we can use `@scope` to create a little fence around the
elements we want to protect.

::: code-group

```html{5} [article.html]
<article class="rich-text">
  <h1>Title</h1>
  <p>Paragraph</p>

  <div class="code-example-component not-rich-text">
    <!--  -->
  </div>
</article>
```

:::

The only change to our fairly large chunk of rich text styles is wrapping it like this:

::: code-group

```css [typography.css]
@scope (.rich-text) to (.not-rich-text) {
  :scope {
    /* rich text styles */
  }
}
```

:::

::: info Wait a minute! What's `:scope`?
Easy! The `:scope` pseudo-class represents the scope's root. In this case it's `.rich-text`
:::

## End result

Notice how the text styles are different from the ones in the article around the code example component! There are no
margins on the any of them, for instance. Our little style fence works!

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
<article class="rich-text">
  <!-- this article -->

  <div class="code-example-component not-rich-text">
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
  </div>
</article>
```

  </template>
</Example>

Ta-daa! :clap:

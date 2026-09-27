# Typography

Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in `.ui-rich-text`.

## Class-based

Utils that you can plop down wherever.

### Variants

```vue
<template>
  <h1 class="ui-h1">Heading 1</h1>
  <h2 class="ui-h2">Heading 2</h2>
  <h3 class="ui-h3">Heading 3</h3>
  <h4 class="ui-h4">Heading 4</h4>
  <h5 class="ui-h5">Heading 5</h5>
  <h6 class="ui-h6">Heading 6</h6>
  <p class="ui-p ui-large">Body Large</p>
  <p class="ui-p">Body</p>
  <p class="ui-overline">Overline</p>
  <p class="ui-caption">Caption</p>
</template>
```

### Heading group

```vue
<template>
  <div class="ui-hgroup">
    <p class="ui-overline">Zero or more p elements</p>
    <h2 class="ui-h2">Followed by one h* element</h2>
    <p class="ui-p">Followed by zero or more p elements</p>
  </div>
</template>
```

### Blockquote

### Code block

## Inline text elements

| Result            | Element           | Class       |
| ----------------- | ----------------- | ----------- |
| Abbr.             | `<abbr>`          | `.ui-abbr`  |
| Definition        | `<dfn>`           | `.ui-dfn`   |
| **Bold**          | `<strong>`, `<b>` | —           |
| *Italic*          | `<i>`, `<em>`     | —           |
| Citation          | `<cite>`          | `.ui-cite`  |
| `Ctrl + S`        | `<kbd>`           | `.ui-kbd`   |
| *Highlight*       | `<mark>`          | `.ui-mark`  |
| ~~Strikethrough~~ | `<s>`             | `.ui-s`     |
| Small             | `<small>`         | `.ui-small` |
| Text Sub          | `<sub>`           | `.ui-sub`   |
| Text Sup          | `<sup>`           | `.ui-sup`   |
| *Underline*       | `<u>`             | `.ui-u`     |
| ~~Deleted~~       | `<del>`           | `.ui-del`   |
| Inserted          | `<ins>`           | `.ui-ins`   |
| `variable`        | `<var>`           | `.ui-var`   |
| `sample output`   | `<samp>`          | `.ui-samp`  |

## Classless

Wrap your code in `.ui-rich-text` to add typographic styles to its children. It's extra handy when you can't control the contents yourself, like printing text from a CMS.

```html
<article class="ui-rich-text">
  <!-- -->
</article>
```

### Classless showcase

Let's put everything together and see how all elements look in a classless, rich-text context.

## API

| Prop    | Type                                                                                                                                              | Default | Description                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| Classes | `.ui-h1`–`.ui-h6`, `.ui-p`, `.ui-overline`, `.ui-caption`, `.ui-hgroup`, `.ui-blockquote`, `pre.ui-code-block`, inline utilities, `.ui-rich-text` | -       | CSS-only typography. Apply classes on elements in templates; no Astro component. |
| Sizes   | `.ui-small`, `.ui-large`                                                                                                                          | -       | Size modifiers on `.ui-p`.                                                       |

## Browser support

- Chromium: Full support Supported since v143.
- Firefox: Full support Supported since v146.
- Safari: Partial support Missing: box-decoration-break.

See also the [full browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support.md).

## Installation

- `opui-css/css/components/typography.css`


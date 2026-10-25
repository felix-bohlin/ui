# Typography

Styles for headings, body text, and other text content. Use util classes anywhere or wrap content in .ui-rich-text.

- CSS: `opui-css/css/components/typography.css` and `opui-css/css/components/link.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/typography.md), [Astro](https://open-props-ui.netlify.app/astro/components/typography.md), [React](https://open-props-ui.netlify.app/react/components/typography.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/typography.md), [Vue](https://open-props-ui.netlify.app/vue/components/typography.md).

## Typography (CSS only)

### Parts

- `.ui-rich-text` (root): Classless typography for uncontrolled child markup.

### Classes

- Blockquote: `.ui-blockquote`. Quoted block with a start border.
- Caption: `.ui-caption`. Muted supporting text.
- Code block: `pre.ui-code-block`. Monospace preformatted block.
- Colors: `critical` (`.ui-critical`), `info` (`.ui-info`), `neutral` (`.ui-neutral`), `success` (`.ui-success`), `warning` (`.ui-warning`). Tone of `.ui-swatch`. Without it, the swatch takes the palette accent of the scope it sits in.
- Heading: `h1` (`.ui-h1`), `h2` (`.ui-h2`), `h3` (`.ui-h3`), `h4` (`.ui-h4`), `h5` (`.ui-h5`), `h6` (`.ui-h6`). Heading styles for any element.
- Heading group: `.ui-hgroup`. Groups an overline, heading, and optional body copy.
- Icon: `.ui-icon`. Sizes an inline `svg` to `--ui-icon-size` and keeps it from shrinking in a flex row.
- Inline: `abbr` (`.ui-abbr`), `cite` (`.ui-cite`), `del` (`.ui-del`), `dfn` (`.ui-dfn`), `ins` (`.ui-ins`), `kbd` (`.ui-kbd`), `mark` (`.ui-mark`), `s` (`.ui-s`), `samp` (`.ui-samp`), `small` (`.ui-small`), `sub` (`.ui-sub`), `sup` (`.ui-sup`), `u` (`.ui-u`), `var` (`.ui-var`). Inline text element utilities.
- Link: `.ui-link`. Link styles outside `.ui-rich-text`. On hover and focus, the underline gets thicker. The color gets darker in light mode and lighter in dark mode.
- Not rich text: `.ui-not-rich-text`. Ends the `.ui-rich-text` styles inside it.
- Overline: `.ui-overline`. Small uppercase label text.
- Paragraph: `.ui-p`. Body paragraph styling.
- Sizes: `large` (`.ui-large`), `medium` (default), `small` (`.ui-small`). Size modifiers on `.ui-p` and `.ui-icon`. An icon reads `--ui-icon-size-small` and `--ui-icon-size-large`.
- Swatch: `.ui-swatch`. A small colored dot for a legend, in `--_swatch-bg-color`, the palette accent of its tone or scope.

### Notes

- Astro and Vue: Add the classes to elements in your templates.
- React and Svelte: Add the classes to elements in your markup.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### typography.css

- `--_flow-gap`: Space between blocks in `.ui-rich-text`. Heading, `hr` and `figure` margins are multiples of it.
- `--_swatch-bg-color`: Fill of `.ui-swatch`. Defaults to `--ui-palette-accent`, the accent of the color class on the swatch or of the surrounding severity scope.

Outputs: `--_count-digits`, `--_font-scale` and `--_start-digits`.

### link.css

- `--_text-color`: Text and underline color of `.ui-link` and of links without a `ui-` class in `.ui-rich-text`. Defaults to `--ui-primary-text`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-code-bg-color`, `--ui-code-block-bg-color`, `--ui-code-block-text-color`, `--ui-critical-text`, `--ui-font-body`, `--ui-font-code`, `--ui-font-heading`, `--ui-font-size-caption`, `--ui-font-size-h1`, `--ui-font-size-h2`, `--ui-font-size-h3`, `--ui-font-size-h4`, `--ui-font-size-h5`, `--ui-font-size-h6`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-font-weight-bold`, `--ui-font-weight-medium`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-info`, `--ui-letter-spacing-caps`, `--ui-letter-spacing-display`, `--ui-letter-spacing-heading`, `--ui-line-height`, `--ui-on-inverse`, `--ui-palette-accent`, `--ui-primary-text`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-rhythm-step`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-success-text`, `--ui-surface-inverse`, `--ui-text`, `--ui-text-strong`, `--ui-text-subtle`, `--ui-underline-offset`, `--ui-underline-offset-small` and `--ui-underline-thickness-hover`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Variants

```html
<h1 class="ui-h1">Heading 1</h1>
<h2 class="ui-h2">Heading 2</h2>
<h3 class="ui-h3">Heading 3</h3>
<h4 class="ui-h4">Heading 4</h4>
<h5 class="ui-h5">Heading 5</h5>
<h6 class="ui-h6">Heading 6</h6>
<p class="ui-p ui-large">Body Large</p>
<p class="ui-p">Body</p>
<p class="ui-p ui-small">Body Small</p>
<p class="ui-overline">Overline</p>
<p class="ui-caption">Caption</p>
```

## Astro

There is no Astro component. Use the classes in your markup.

### Example: Variants

```astro
<h1 class="ui-h1">Heading 1</h1>
<h2 class="ui-h2">Heading 2</h2>
<h3 class="ui-h3">Heading 3</h3>
<h4 class="ui-h4">Heading 4</h4>
<h5 class="ui-h5">Heading 5</h5>
<h6 class="ui-h6">Heading 6</h6>
<p class="ui-p ui-large">Body Large</p>
<p class="ui-p">Body</p>
<p class="ui-p ui-small">Body Small</p>
<p class="ui-overline">Overline</p>
<p class="ui-caption">Caption</p>
```

## React

There is no React component. Use the classes in your markup.

### Example: Variants

```tsx
export default function Variants() {
  return (
    <>
      <h1 className="ui-h1">Heading 1</h1>
      <h2 className="ui-h2">Heading 2</h2>
      <h3 className="ui-h3">Heading 3</h3>
      <h4 className="ui-h4">Heading 4</h4>
      <h5 className="ui-h5">Heading 5</h5>
      <h6 className="ui-h6">Heading 6</h6>
      <p className="ui-p ui-large">Body Large</p>
      <p className="ui-p">Body</p>
      <p className="ui-p ui-small">Body Small</p>
      <p className="ui-overline">Overline</p>
      <p className="ui-caption">Caption</p>
    </>
  )
}
```

## Svelte

There is no Svelte component. Use the classes in your markup.

### Example: Variants

```svelte
<h1 class="ui-h1">Heading 1</h1>
<h2 class="ui-h2">Heading 2</h2>
<h3 class="ui-h3">Heading 3</h3>
<h4 class="ui-h4">Heading 4</h4>
<h5 class="ui-h5">Heading 5</h5>
<h6 class="ui-h6">Heading 6</h6>
<p class="ui-p ui-large">Body Large</p>
<p class="ui-p">Body</p>
<p class="ui-p ui-small">Body Small</p>
<p class="ui-overline">Overline</p>
<p class="ui-caption">Caption</p>
```

## Vue

There is no Vue component. Use the classes in your markup.

### Example: Variants

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
  <p class="ui-p ui-small">Body Small</p>
  <p class="ui-overline">Overline</p>
  <p class="ui-caption">Caption</p>
</template>
```

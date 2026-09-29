# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

**Quick start**

### npm

```sh
npm install opui-css open-props
```

```css
@import "opui-css/css/components/callout.css";
```

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/opui-css/dist/opui.css" />
```

### Copy the CSS

[Jump to source](#installation)

[Full setup guide](https://open-props-ui.netlify.app/html/guide/getting-started.md)

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md): takes over completely
- [Toast](https://open-props-ui.netlify.app/html/components/toast.md): informative but non-interruptive

## Variants

Tonal (default) and `.ui-outlined` variants.

```html
<article role="note" class="ui-callout">
  <div class="ui-content">
    <h3>Note</h3>
    <p>This is a tonal Callout!</p>
  </div>
</article>


<article role="note" class="ui-callout ui-outlined">
  <div class="ui-content">
    <h3>Note</h3>
    <p>This is an outlined Callout!</p>
  </div>
</article>
```

## Icon

Icon must be placed before the content.

```html
<article role="note" class="ui-callout">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal Callout with an icon.</div>
</article>
```

## Severities

Severity modifiers - `.ui-info`, `.ui-success`, `.ui-warning`, `.ui-critical` - plus the non-severity `.ui-neutral`tone for brand-tinted attention. The default is a plain surface.

**Icons and accessibility**

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```html
<article role="note" class="ui-callout ui-neutral">
  <div class="ui-content">This is a tonal neutral Callout</div>
</article>


<article role="note" class="ui-callout ui-info">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal info Callout</div>
</article>


<article role="note" class="ui-callout ui-warning">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal warning Callout</div>
</article>


<article role="note" class="ui-callout ui-critical">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
  >
    <path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path>
  </svg>
  <div class="ui-content">This is a tonal critical Callout</div>
</article>


<article role="note" class="ui-callout ui-outlined ui-neutral">
  <div class="ui-content">This is an outlined neutral Callout</div>
</article>


<article role="note" class="ui-callout ui-outlined ui-info">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path>
  </svg>
  <div class="ui-content">This is a outlined info Callout</div>
</article>


<article role="note" class="ui-callout ui-outlined ui-warning">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path>
  </svg>
  <div class="ui-content">This is a outlined warning Callout</div>
</article>


<article role="note" class="ui-callout ui-outlined ui-critical">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
  >
    <path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path>
  </svg>
  <div class="ui-content">This is a outlined critical Callout</div>
</article>
```

## Accessibility

- Add `role="note"` to the Callout container.
- Use both color and icon to help distinguish between Callout [severities](#severities).
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md) or [Toast](https://open-props-ui.netlify.app/html/components/toast.md).

## Anatomy

1. Container: must have `role="note"`.
2. Content: text, or wrapper with `.ui-content` class.
3. Icon (optional): `<svg>` element.

## API

| Type       | Modifiers                                                              | Default     | Description         |
| ---------- | ---------------------------------------------------------------------- | ----------- | ------------------- |
| Part       | `& > .ui-content`, `& > svg`                                           | -           | Internal structure. |
| Severities | `.ui-critical`, `.ui-info`, `.ui-neutral`,`.ui-success`, `.ui-warning` | -           | Severity modifiers. |
| Variants   | `.ui-tonal`, `.ui-outlined`                                            | `.ui-tonal` | Style modifiers.    |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support.md).

## Source

- `opui-css/css/components/callout.css`
`theme tokens (snippet)`


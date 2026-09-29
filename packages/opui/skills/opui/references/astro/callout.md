# Callout

Callouts call out for user attention. Should be part of the flow and used **without** interrupting the user's task.

**Quick start.** Run `npm install opui-css open-props`, then import the component and its styles. See [Getting started](https://open-props-ui.netlify.app/astro/guide/getting-started.md) for the full setup.

```astro
---
import "opui-css/css/components/callout.css"
import { Callout } from "opui-css/astro"
---
```

### Alternatives

You might want to check out:

- [Dialog](https://open-props-ui.netlify.app/astro/components/dialog.md): takes over completely

## Variants

Tonal (default) and outlined variants are available via the `variant` prop.

```astro
---
import { Callout } from "opui-css/astro"
---


<Callout>
  <Fragment slot="title">Note</Fragment>
  <p>
    This is a tonal Callout. Notice the lack of icons - it's not really needed
    here.
  </p>
</Callout>
<Callout variant="outlined">
  <Fragment slot="title">Another Callout</Fragment>
  <p>
    This is an outlined Callout. Why not use a <a
      class="ui-link"
      href="/components/card">Card</a
    > since they look very similar? For one, the Callout is a more focused component
    with different properties.
  </p>
</Callout>
```

## Icon

Icons are placed in the `icon` slot. You can also modify the component so you don't have to do it manually every time.

```astro
---
import { Callout } from "opui-css/astro"
---


<Callout>
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path></svg
  >
  This is a tonal Callout with an icon.
</Callout>
```

## Severities

The `severity` prop accepts `info`, `success`, `warning`, and `critical`, plus a non-severity`neutral` tone for brand-tinted attention. The default is a plain surface.

**Icons and accessibility**

Omitting an icon is possible. However, it helps having one if you need to convey a specific kind of severity in your Callout message. For instance, colorblind users might be left confused if there's not enough visual guidance.

```astro
---
import { Callout } from "opui-css/astro"
---


<Callout severity="neutral">This is a tonal neutral Callout</Callout>
<Callout severity="info">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path></svg
  >
  This is a tonal info Callout
</Callout>
<Callout severity="warning">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path></svg
  >
  This is a tonal warning Callout
</Callout>
<Callout severity="critical">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
    ><path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path></svg
  >This is a tonal critical Callout
</Callout>


<Callout variant="outlined" severity="neutral"
  >This is an outlined neutral Callout</Callout
>
<Callout variant="outlined" severity="info">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M16 13a1 1 0 0 1 1 1v9a1 1 0 1 1-2 0v-9a1 1 0 0 1 1-1m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M2 16C2 8.268 8.268 2 16 2s14 6.268 14 14s-6.268 14-14 14S2 23.732 2 16M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12s12-5.373 12-12S22.627 4 16 4"
    ></path></svg
  >
  This is an outlined info Callout
</Callout>
<Callout variant="outlined" severity="warning">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    ><path
      fill="currentColor"
      d="M17.25 22a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 9a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0v-8a1 1 0 0 0-1-1m-3.064-5.191c1.332-2.41 4.796-2.41 6.128 0l10.493 18.999C30.846 25.14 29.158 28 26.494 28H5.507c-2.665 0-4.352-2.86-3.064-5.192zm4.377.967a1.5 1.5 0 0 0-2.626 0L4.194 23.775A1.5 1.5 0 0 0 5.507 26h20.987a1.5 1.5 0 0 0 1.313-2.225z"
    ></path></svg
  >
  This is an outlined warning Callout
</Callout>
<Callout variant="outlined" severity="critical">
  <svg
    slot="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 48 48"
    ><path
      fill="currentColor"
      d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5"
    ></path></svg
  >This is an outlined critical Callout
</Callout>
```

## Accessibility

- The `role="note"` attribute is automatically added to the Callout container.
- Use both color and icon to help distinguish between Callout [severities](#severities).
- Don't interrupt the user with a Callout. In that case, use [Dialog](https://open-props-ui.netlify.app/astro/components/dialog.md).

## Anatomy

1. Container: the `<Callout>` component.
2. Content: text, or wrapper with `.ui-content` class.
3. Icon (optional): `<svg slot="icon">` element.

## API

| Prop       | Type                                                          | Default   | Description                                       |
| ---------- | ------------------------------------------------------------- | --------- | ------------------------------------------------- |
| `variant`  | `"tonal" \| "outlined"`                                       | `"tonal"` | The visual style of the callout.                  |
| `severity` | `"critical"`, `"info"`, `"neutral"`, `"success"`, `"warning"` | -         | The severity level, affecting the color and icon. |

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

See also the [full browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support.md).

## Source

- `opui-css/css/components/callout.css`
`theme tokens (snippet)`


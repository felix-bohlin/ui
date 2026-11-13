# Avatar

An image, initials or icon that stands for a person or an entity.

- CSS: `opui-css/css/components/avatar.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/avatar.md), [Astro](https://opui.dev/astro/components/avatar.md), [React](https://opui.dev/react/components/avatar.md), [Svelte](https://opui.dev/svelte/components/avatar.md), [Vue](https://opui.dev/vue/components/avatar.md).

## Avatar

### Parts

- `.ui-avatar` (root): Container element.
- `<img>` (prop `label`, prop `src`): The avatar image. Its `alt` is `label`.

### Props and modifiers

- `aria-label`: `string`. The accessible name of a link or button avatar, instead of `label`. The Astro, React and Svelte types require one of `label`, `aria-label` and `aria-labelledby` on a link or button. In Vue it passes through as an attribute.
- `aria-labelledby`: `string`. The id of the element that names a link or button avatar, instead of `label`.
- `as`: `"a" | "button" | "div"`, default `"div"`. The element to render. Defaults to `"a"` with `href`.
- `disabled`: `boolean`. Disables a button avatar. A link avatar drops its `href` and gets `role="link"` and `aria-disabled="true"` instead.
- `href`: `string`. The link to use. Renders an `<a>`.
- `label`: `string`. The name of the person or thing: the `alt` of the image, or visually hidden text next to the letters or icon. Leave it out when the name is shown next to the avatar, which then is decorative. A link or button avatar needs it.
- `shape`: `"circle"` (default), `"rounded"` (`.ui-rounded`), `"squared"` (`.ui-squared`), `"squircle"` (`.ui-squircle`). The shape of the avatar.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `src`: `string`. The image source. Replaces the content. Without it, the avatar shows its content, so a missing photo falls back to the letters.
- State (HTML): `button` (`button[disabled]`), `link` (`a[aria-disabled="true"]`). Disables a button avatar. A link avatar, which can't take `disabled`, drops its `href` and takes `role="link"` and `aria-disabled="true"` instead.
- `variant`: `"filled"` (default), `"outlined"` (`.ui-outlined`), `"tonal"` (`.ui-tonal`). The variant to use. `filled` is the primary color, `outlined` the border color with no fill and `tonal` the primary tint.

### Slots

- `default`: Letters or an icon, when there's no image. They are hidden from assistive technology: `label` names the avatar.

## AvatarGroup

### Parts

- `.ui-avatar-group` (root): A group of overlapping avatars.

### Props and modifiers

- `aria-label`: `string`, `[aria-label]`. The accessible name of the group. The Astro, React and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.
- `aria-labelledby`: `string`. The id of the element that names the group, instead of `aria-label`.

### Slots

- `default`: The avatars.

### Notes

- HTML: The root needs `role="group"` and an `aria-label`.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### avatar.css

- `--_bg-color`: The background. Defaults to `--ui-primary`. An avatar with an `img` is always transparent.
- `--_font-size`: The font size of initials. Set by the size classes.
- `--_icon-size`: The maximum width of an `svg`. Set by `.ui-x-small` and `.ui-small`.
- `--_margin`: How much avatars in a `.ui-avatar-group` overlap. Set on the group.
- `--_outline-color`: The ring around each avatar in a `.ui-avatar-group`. Defaults to `--ui-surface`. Set on the group.
- `--_outline-width`: Width of the ring around each avatar in a `.ui-avatar-group`. Set on the group.
- `--_outlined-border-color`: The border of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_size`: The width and height. Defaults to `--ui-control-size`, set by the size classes.
- `--_text-color`: The text and icon color. Defaults to `--ui-on-primary`.
- `--_tonal-bg-color`: The background of `.ui-tonal`. Defaults to `--ui-primary-tonal`, or the palette tint.
- `--_tonal-text-color`: The text and icon color of `.ui-tonal`. Defaults to `--ui-on-primary-tonal`, or the palette text on the tint.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-control-size`, `--ui-control-size-large`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-disabled-opacity`, `--ui-font-size-caption`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-palette-on-tint`, `--ui-palette-tint`, `--ui-primary`, `--ui-primary-tonal`, `--ui-radius-round`, `--ui-radius-small`, `--ui-space-2`, `--ui-surface` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Image

```html
<div class="ui-avatar">
  <img src="/photos/lou-headstock.png" alt="Lou Headstock" />
</div>

<div class="ui-avatar">
  <img src="/photos/holly-humbucker.png" alt="Holly Humbucker" />
</div>

<div class="ui-avatar">
  <img src="/photos/percy-groove.png" alt="Percy Groove" />
</div>
```

## Astro

`import { Avatar, AvatarGroup } from "opui-css/astro"`

### Example: Image

```astro
---
import { Avatar } from "opui-css/astro"
---

<Avatar label="Lou Headstock" src="/photos/lou-headstock.png" />

<Avatar label="Holly Humbucker" src="/photos/holly-humbucker.png" />

<Avatar label="Percy Groove" src="/photos/percy-groove.png" />
```

## React

`import { Avatar, AvatarGroup } from "opui-css/react"`

### Example: Image

```tsx
import { Avatar } from "opui-css/react"

export default function Image() {
  return (
    <>
      <Avatar label="Lou Headstock" src="/photos/lou-headstock.png" />

      <Avatar label="Holly Humbucker" src="/photos/holly-humbucker.png" />

      <Avatar label="Percy Groove" src="/photos/percy-groove.png" />
    </>
  )
}
```

## Svelte

`import { Avatar, AvatarGroup } from "opui-css/svelte"`

### Example: Image

```svelte
<script lang="ts">
  import { Avatar } from "opui-css/svelte"
</script>

<Avatar label="Lou Headstock" src="/photos/lou-headstock.png" />

<Avatar label="Holly Humbucker" src="/photos/holly-humbucker.png" />

<Avatar label="Percy Groove" src="/photos/percy-groove.png" />
```

## Vue

`import { Avatar, AvatarGroup } from "opui-css/vue"`

### Example: Image

```vue
<script setup lang="ts">
import { Avatar } from "opui-css/vue"
</script>

<template>
  <Avatar label="Lou Headstock" src="/photos/lou-headstock.png" />

  <Avatar label="Holly Humbucker" src="/photos/holly-humbucker.png" />

  <Avatar label="Percy Groove" src="/photos/percy-groove.png" />
</template>
```

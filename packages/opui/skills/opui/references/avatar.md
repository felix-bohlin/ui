# Avatar

Avatars show a person or entity as an image, initials or icon.

- CSS: `opui-css/css/components/avatar.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/avatar.md), [Astro](https://open-props-ui.netlify.app/astro/components/avatar.md), [React](https://open-props-ui.netlify.app/react/components/avatar.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/avatar.md), [Vue](https://open-props-ui.netlify.app/vue/components/avatar.md).

## Avatar

### Parts

- `.ui-avatar` (root): Container element.
- `<img>` (prop `src`, prop `alt`): The avatar image.

### Props and modifiers

- `alt`: `string`. Alternative text for the image. Required with `src`. Use an empty string when the name is shown next to it.
- `as`: `"a" | "button" | "div"`, default `"div"`. The element to render. Defaults to `"a"` with `href`.
- `disabled`: `boolean`. Disables a button avatar. A link avatar drops its `href` and gets `aria-disabled="true"` instead.
- `href`: `string`. The link to use. Renders an `<a>`.
- `shape`: `"circle"` (default), `"rounded"` (`.ui-rounded`), `"squared"` (`.ui-squared`), `"squircle"` (`.ui-squircle`). The shape of the avatar.
- `size`: `"large"` (`.ui-large`), `"medium"` (default), `"small"` (`.ui-small`), `"x-small"` (`.ui-x-small`). The size of the element.
- `src`: `string`. The image source. Replaces the content.
- State (HTML): `button` (`button[disabled]`), `link` (`a[aria-disabled="true"]`). Disables a button avatar. A link avatar, which can't take `disabled`, drops its `href` and takes `aria-disabled="true"` instead.

### Slots

- `default`: Letters or an icon, when there's no image.

## AvatarGroup

### Parts

- `.ui-avatar-group` (root): A group of overlapping avatars.

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
- `--_size`: The width and height. Defaults to `--ui-control-size`, set by the size classes.
- `--_text-color`: The text and icon color. Defaults to `--ui-on-primary`.

## Theme tokens

The stylesheets read `--ui-border-width`, `--ui-border-width-thick`, `--ui-control-size`, `--ui-control-size-large`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-disabled-opacity`, `--ui-font-size-caption`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-on-primary`, `--ui-primary`, `--ui-radius-round`, `--ui-radius-small`, `--ui-space-2` and `--ui-surface`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Image

```html
<div class="ui-avatar">
  <img
    src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
    alt="Maya Lind"
  />
</div>

<div class="ui-avatar">
  <img
    src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
    alt="Omar Haddad"
  />
</div>

<div class="ui-avatar">
  <img
    src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
    alt="Priya Nair"
  />
</div>
```

## Astro

`import { Avatar, AvatarGroup } from "opui-css/astro"`

### Example: Image

```astro
---
import { Avatar } from "opui-css/astro"
---

<Avatar
  alt="Maya Lind"
  src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
/>

<Avatar
  alt="Omar Haddad"
  src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
/>

<Avatar
  alt="Priya Nair"
  src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
/>
```

## React

`import { Avatar, AvatarGroup } from "opui-css/react"`

### Example: Image

```tsx
import { Avatar } from "opui-css/react"

export default function Image() {
  return (
    <>
      <Avatar
        alt="Maya Lind"
        src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
      />

      <Avatar
        alt="Omar Haddad"
        src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
      />

      <Avatar
        alt="Priya Nair"
        src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
      />
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

<Avatar
  alt="Maya Lind"
  src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
/>

<Avatar
  alt="Omar Haddad"
  src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
/>

<Avatar
  alt="Priya Nair"
  src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
/>
```

## Vue

`import { Avatar, AvatarGroup } from "opui-css/vue"`

### Example: Image

```vue
<script setup lang="ts">
import { Avatar } from "opui-css/vue"
</script>

<template>
  <Avatar
    alt="Maya Lind"
    src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
  />

  <Avatar
    alt="Omar Haddad"
    src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
  />

  <Avatar
    alt="Priya Nair"
    src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
  />
</template>
```

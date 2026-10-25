# Avatar

## Image

```tsx
import { Avatar } from "opui-css/react"

export default function Image() {
  return (
    <>
      <Avatar
        src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?w=96&h=96&fit=crop&auto=format"
        alt="Maya Lind"
      />

      <Avatar
        src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?w=96&h=96&fit=crop&auto=format"
        alt="Omar Haddad"
      />

      <Avatar
        src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?w=96&h=96&fit=crop&auto=format"
        alt="Priya Nair"
      />
    </>
  )
}
```

## Letter

```tsx
import { Avatar } from "opui-css/react"

export default function Letter() {
  return (
    <>
      <Avatar aria-label="Lena Ek" role="img">
        LE
      </Avatar>
      <Avatar aria-label="Tom Tanaka" role="img">
        TT
      </Avatar>
      <Avatar aria-label="Elif Rahman" role="img">
        ER
      </Avatar>
    </>
  )
}
```

## Icon

```tsx
import { Avatar } from "opui-css/react"

export default function Icon() {
  return (
    <>
      <Avatar aria-label="Developer" role="img">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5zm10.707 2.793a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 16l4.293-4.293a1 1 0 0 0 0-1.414m4.586 1.414L22.586 16l-4.293 4.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414"
          ></path>
        </svg>
      </Avatar>

      <Avatar aria-label="Contact" role="img">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Avatar>

      <Avatar aria-label="Guest" role="img">
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </Avatar>
    </>
  )
}
```

## Shapes

Set `shape` to `rounded`, `squared` or `squircle`. The default is `circle`.

```tsx
import { Avatar } from "opui-css/react"

export default function Shapes() {
  return (
    <>
      <Avatar
        shape="rounded"
        src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?w=96&h=96&fit=crop&auto=format"
        alt="Jonas Berg"
      />

      <Avatar aria-label="Sam Quist" role="img" shape="squared">
        SQ
      </Avatar>

      <Avatar
        shape="squircle"
        src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?w=96&h=96&fit=crop&auto=format"
        alt="Sara Kim"
      />
    </>
  )
}
```

## Sizes

Use `size="x-small"`, `size="small"` or `size="large"` to match the control sizes, for example in dense lists, table rows and bylines. Letters and icons scale with the avatar.

The default is `size="medium"`.

```tsx
import { Avatar } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Avatar aria-label="Lena Ek" role="img" size="x-small">
        LE
      </Avatar>
      <Avatar aria-label="Tom Tanaka" role="img" size="small">
        TT
      </Avatar>
      <Avatar aria-label="Elif Rahman" role="img">
        ER
      </Avatar>
      <Avatar aria-label="Kai Lund" role="img" size="large">
        KL
      </Avatar>
    </>
  )
}
```

## Disabled

Disable a button avatar with `disabled`. A link avatar drops its `href` and gets `aria-disabled="true"` instead.

```tsx
import { Avatar } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Avatar aria-label="Eva Falk" as="button">
        EF
      </Avatar>
      <Avatar aria-label="Gustav Holm" as="button" disabled>
        GH
      </Avatar>
      <Avatar aria-label="Ida Jansson" href="#">
        IJ
      </Avatar>
      <Avatar aria-label="Karl Lund" disabled href="#">
        KL
      </Avatar>
    </>
  )
}
```

## Grouped

Group multiple avatars in an `AvatarGroup` with an `aria-label`.

```tsx
import { Avatar, AvatarGroup } from "opui-css/react"

export default function Grouped() {
  return (
    <AvatarGroup aria-label="Team">
      <Avatar aria-label="Anna Berg" role="img">
        AB
      </Avatar>
      <Avatar aria-label="Carl Dahl" role="img">
        CD
      </Avatar>
      <Avatar aria-label="Eva Falk" as="button">
        EF
      </Avatar>
      <Avatar aria-label="Gustav Holm" as="button">
        GH
      </Avatar>
      <Avatar aria-label="Ida Jansson" href="#">
        IJ
      </Avatar>
      <Avatar aria-label="Karl Lund" href="#">
        KL
      </Avatar>
    </AvatarGroup>
  )
}
```

A [Badge](https://open-props-ui.netlify.app/react/components/badge.md) on an avatar in a group sits on the avatar's start side, the part the next avatar doesn't cover.

## Accessibility

- Give an image avatar the person's name as its `alt`, not "Avatar". When the name is already shown next to it, use `alt=""` so it isn't read twice.
- Initials and icons have no name on their own. Add `role="img"` and an `aria-label` with the full name, or `aria-hidden="true"` when the name is next to it.
- A link or button avatar needs an `aria-label` that names the person, and a group of avatars an `aria-label` that names the group.

## API

### Avatar API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `alt` | `string` | - | Alternative text for the image. Required with `src`. Use an empty string when the name is shown next to it. |
| `as` | `"a"` , `"button"` , `"div"` | `"div"` | The element to render. Defaults to `"a"` with `href`. |
| `children` | `ReactNode` | - | Letters or an icon, when there's no image. |
| `disabled` | `boolean` | `false` | Disables a button avatar. A link avatar drops its `href` and gets `aria-disabled="true"` instead. |
| `href` | `string` | - | The link to use. Renders an `<a>`. |
| `shape` | `"circle"` , `"rounded"` , `"squared"` , `"squircle"` | `"circle"` | The shape of the avatar. |
| `size` | `"large"` , `"medium"` , `"small"` , `"x-small"` | `"medium"` | The size of the element. |
| `src` | `string` | - | The image source. Replaces the content. |

### Avatar group API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | - | The avatars. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-control-size` | `calc(2.5rem * var(--ui-density))` | Shared default height for fields and buttons so they line up. |
| `--ui-control-size-large` | `calc(2.875rem * var(--ui-density))` | Shared large height for fields and buttons. |
| `--ui-control-size-small` | `calc(2rem * var(--ui-density))` | Shared small height for fields and buttons. |
| `--ui-control-size-x-small` | `calc(1.75rem * var(--ui-density))` | Shared x-small height for fields and buttons. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-large` | `var(--ui-font-size-500)` | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-large` | `1.5rem` | Icon size inside `Avatar`, and of an `svg` without a `width` in `normalize.css`. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-radius-small` | `min(5px, var(--ui-radius))` | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-radius`, capped at 5px. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | The background. Defaults to `--ui-primary`. An avatar with an `img` is always transparent. |
| `--_font-size` | Input | The font size of initials. Set by the size classes. |
| `--_icon-size` | Input | The maximum width of an `svg`. Set by `.ui-x-small` and `.ui-small`. |
| `--_margin` | Input | How much avatars in a `.ui-avatar-group` overlap. Set on the group. |
| `--_outline-color` | Input | The ring around each avatar in a `.ui-avatar-group`. Defaults to `--ui-surface`. Set on the group. |
| `--_outline-width` | Input | Width of the ring around each avatar in a `.ui-avatar-group`. Set on the group. |
| `--_size` | Input | The width and height. Defaults to `--ui-control-size`, set by the size classes. |
| `--_text-color` | Input | The text and icon color. Defaults to `--ui-on-primary`. |

## Installation

Import the components from `opui-css/react`:

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/react/guide/getting-started.md).

- `opui-css/css/components/avatar.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Blog list](https://open-props-ui.netlify.app/blocks/blog-list.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Empty states](https://open-props-ui.netlify.app/blocks/empty-states.md)
- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Forgot password](https://open-props-ui.netlify.app/blocks/forgot-password.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Kanban board](https://open-props-ui.netlify.app/blocks/kanban-board.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Testimonials](https://open-props-ui.netlify.app/blocks/testimonials.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)

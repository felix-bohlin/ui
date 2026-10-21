# Avatar

## Image

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

## Letter

```html
<div class="ui-avatar" role="img" aria-label="Lena Ek">LE</div>
<div class="ui-avatar" role="img" aria-label="Tom Tanaka">TT</div>
<div class="ui-avatar" role="img" aria-label="Elif Rahman">ER</div>
```

## Icon

```html
<div class="ui-avatar" role="img" aria-label="Developer">
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
</div>

<div class="ui-avatar" role="img" aria-label="Contact">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M5.25 4A3.25 3.25 0 0 0 2 7.25v17.5A3.25 3.25 0 0 0 5.25 28h21.5A3.25 3.25 0 0 0 30 24.75V7.25A3.25 3.25 0 0 0 26.75 4zM18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1m1 4h6a1 1 0 0 1 0 2h-6a1 1 0 1 1 0-2m-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5"
    ></path>
  </svg>
</div>

<div class="ui-avatar" role="img" aria-label="Guest">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2m0 22.5c-3.866 0-7-2.429-7-6.071A2.43 2.43 0 0 1 11.429 16h9.142A2.43 2.43 0 0 1 23 18.429c0 3.642-3.134 6.071-7 6.071m0-10A3.75 3.75 0 1 1 16 7a3.75 3.75 0 0 1 0 7.5"
    ></path>
  </svg>
</div>
```

## Variants

Change the shape of the avatar with the `.ui-rounded`, `.ui-squared` and `.ui-squircle` classes.

```html
<div class="ui-avatar ui-rounded">
  <img
    src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?w=96&h=96&fit=crop&auto=format"
    alt="Jonas Berg"
  />
</div>

<div class="ui-avatar ui-squared" role="img" aria-label="Sam Quist">SQ</div>

<div class="ui-avatar ui-squircle">
  <img
    src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?w=96&h=96&fit=crop&auto=format"
    alt="Sara Kim"
  />
</div>
```

## Sizes

Use `.ui-x-small`, `.ui-small` or `.ui-large` to match the control sizes, for example in dense lists, table rows and bylines. Letters and icons scale with the avatar.

```html
<div class="ui-avatar ui-x-small" role="img" aria-label="Lena Ek">LE</div>
<div class="ui-avatar ui-small" role="img" aria-label="Tom Tanaka">TT</div>
<div class="ui-avatar" role="img" aria-label="Elif Rahman">ER</div>
<div class="ui-avatar ui-large" role="img" aria-label="Kai Lund">KL</div>
```

## Grouped

Group multiple avatars in a `.ui-avatar-group` element with `role="group"` and an `aria-label`.

```html
<div class="ui-avatar-group" role="group" aria-label="Team">
  <div class="ui-avatar" role="img" aria-label="Anna Berg">AB</div>
  <div class="ui-avatar" role="img" aria-label="Carl Dahl">CD</div>
  <button type="button" class="ui-avatar" aria-label="Eva Falk">EF</button>
  <button type="button" class="ui-avatar" aria-label="Gustav Holm">GH</button>
  <a href="#" class="ui-avatar" aria-label="Ida Jansson">IJ</a>
  <a href="#" class="ui-avatar" aria-label="Karl Lund">KL</a>
</div>
```

A [Badge](https://open-props-ui.netlify.app/html/components/badge.md) on an avatar in a group sits on the avatar's start side, the part the next avatar doesn't cover.

## Accessibility

- Give an image avatar the person's name as its `alt`, not "Avatar". When the name is already shown next to it, use `alt=""` so it isn't read twice.
- Initials and icons have no name on their own. Add `role="img"` and an `aria-label` with the full name, or `aria-hidden="true"` when the name is next to it.
- A link or button avatar needs an `aria-label` that names the person, and a group of avatars an `aria-label` that names the group.

## API

### Avatar API

| Type     | Modifiers                                    | Default | Description              |
| -------- | -------------------------------------------- | ------- | ------------------------ |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`      | -       | The size of the element. |
| Variants | `.ui-rounded`, `.ui-squared`, `.ui-squircle` | -       | The variant to use.      |

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-avatar` | Container element. |
| `<img>`      | The avatar image.  |

#### CSS variables

| Variable                    | Default                                                                                  | Description                                                                                                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width`         | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-border-width-thick`   | `var(--border-size-2)`                                                                   | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar. |
| `--ui-control-size`         | `calc(40px * var(--ui-density))`                                                         | Shared default height for fields and buttons so they line up.                                                                                                                                                                               |
| `--ui-control-size-large`   | `calc(46px * var(--ui-density))`                                                         | Shared large height for fields and buttons.                                                                                                                                                                                                 |
| `--ui-control-size-small`   | `calc(32px * var(--ui-density))`                                                         | Shared small height for fields and buttons.                                                                                                                                                                                                 |
| `--ui-control-size-x-small` | `calc(28px * var(--ui-density))`                                                         | Shared x-small height for fields and buttons.                                                                                                                                                                                               |
| `--ui-disabled-opacity`     | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                       |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-font-size-large`      | `var(--ui-font-size-500)`                                                                | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                                                           |
| `--ui-font-size-small`      | `var(--ui-font-size-200)`                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                     |
| `--ui-icon-size`            | `var(--size-4)`                                                                          | Default icon size inside components.                                                                                                                                                                                                        |
| `--ui-icon-size-large`      | `var(--size-5)`                                                                          | Icon size inside `Avatar` and `List`.                                                                                                                                                                                                       |
| `--ui-icon-size-small`      | `var(--size-3)`                                                                          | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                  |
| `--ui-primary`              | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                |
| `--ui-primary-contrast`     | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                          |
| `--ui-radius-round`         | `var(--radius-round)`                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                          |
| `--ui-radius-small`         | `min(var(--radius-2), var(--ui-border-radius))`                                          | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-border-radius`, capped at 5px.                                                                              |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                        | Page and card background.                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Avatar group API

#### Parts

| Part               | Description                     |
| ------------------ | ------------------------------- |
| `.ui-avatar-group` | A group of overlapping avatars. |

#### CSS variables

| Variable                    | Default                                                                                  | Description                                                                                                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-width`         | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                     |
| `--ui-border-width-thick`   | `var(--border-size-2)`                                                                   | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar. |
| `--ui-control-size`         | `calc(40px * var(--ui-density))`                                                         | Shared default height for fields and buttons so they line up.                                                                                                                                                                               |
| `--ui-control-size-large`   | `calc(46px * var(--ui-density))`                                                         | Shared large height for fields and buttons.                                                                                                                                                                                                 |
| `--ui-control-size-small`   | `calc(32px * var(--ui-density))`                                                         | Shared small height for fields and buttons.                                                                                                                                                                                                 |
| `--ui-control-size-x-small` | `calc(28px * var(--ui-density))`                                                         | Shared x-small height for fields and buttons.                                                                                                                                                                                               |
| `--ui-disabled-opacity`     | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                       |
| `--ui-font-size-caption`    | `var(--ui-font-size-100)`                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                              |
| `--ui-font-size-large`      | `var(--ui-font-size-500)`                                                                | Font size of lead paragraphs, `.ui-p.ui-large`, the `Drawer` title and large `Avatar` initials. Defaults to `--ui-font-size-500`.                                                                                                           |
| `--ui-font-size-small`      | `var(--ui-font-size-200)`                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                     |
| `--ui-icon-size`            | `var(--size-4)`                                                                          | Default icon size inside components.                                                                                                                                                                                                        |
| `--ui-icon-size-large`      | `var(--size-5)`                                                                          | Icon size inside `Avatar` and `List`.                                                                                                                                                                                                       |
| `--ui-icon-size-small`      | `var(--size-3)`                                                                          | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                  |
| `--ui-primary`              | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                |
| `--ui-primary-contrast`     | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                          |
| `--ui-radius-round`         | `var(--radius-round)`                                                                    | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers.                                                                                                          |
| `--ui-radius-small`         | `min(var(--radius-2), var(--ui-border-radius))`                                          | Corner radius of small parts: `kbd`, inline `code`, `mark`, `var`, `Tooltip`, the file input and a square `Avatar` image. `--ui-border-radius`, capped at 5px.                                                                              |
| `--ui-space-3`              | `calc(var(--size-3) * var(--ui-space-scale))`                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                             |
| `--ui-surface-default`      | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                        | Page and card background.                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

The root needs `role="group"` and an `aria-label`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property           | Kind  | Description                                                                                                |
| ------------------ | ----- | ---------------------------------------------------------------------------------------------------------- |
| `--_bg-color`      | Input | The background. Defaults to `--ui-primary`. An avatar with an `img` is always transparent.                 |
| `--_font-size`     | Input | The font size of initials. Set by the size classes.                                                        |
| `--_icon-size`     | Input | The maximum width of an `svg`. Set by `.ui-x-small` and `.ui-small`.                                       |
| `--_margin`        | Input | How much avatars in a `.ui-avatar-group` overlap. Set on the group.                                        |
| `--_outline-color` | Input | The ring around each avatar in a `.ui-avatar-group`. Defaults to `--ui-surface-default`. Set on the group. |
| `--_outline-width` | Input | Width of the ring around each avatar in a `.ui-avatar-group`. Set on the group.                            |
| `--_size`          | Input | The width and height. Defaults to `--ui-control-size`, set by the size classes.                            |
| `--_text-color`    | Input | The text and icon color. Defaults to `--ui-primary-contrast`.                                              |

## Under the hood

Read the post: [Squircle avatars with corner-shape](https://open-props-ui.netlify.app/learn/avatar-squircles)

1. Circle

   - `aspect-ratio: 1`: set the width, the height follows
   - Letters and icons center with flexbox
   - `overflow: clip` cuts everything to the circle

2. Image

   - `object-fit: cover` crops a photo of any aspect ratio
   - Absolutely positioned, so the image never sizes the avatar
   - `:has(img)` drops the fallback color behind the photo

3. Shapes

   - A shape is just a different `border-radius`
   - `corner-shape: squircle` turns a full radius into a superellipse
   - Without `corner-shape`, the squircle is a circle

4. Group

   - A negative start margin on each avatar after the first stacks it over the one before
   - A `box-shadow` ring in the surface color fakes a cutout
   - Logical margin, so the stack flips in right-to-left

Step 1 of 4: Circle

- [`aspect-ratio` ](https://webstatus.dev/features/aspect-ratio)(Widely available): Chrome 88+, Edge 88+, Firefox 89+, Safari 15+

```css
.avatar {
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--ui-primary);
  border-radius: var(--ui-radius-round);
  color: var(--ui-primary-contrast);
  display: inline-flex;
  flex-shrink: 0;
  inline-size: var(--size);
  justify-content: center;
  overflow: clip;
  position: relative;
}

.avatar svg {
  max-inline-size: 1.5rem;
}
```

Step 2 of 4: Image

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`object-fit` ](https://webstatus.dev/features/object-fit)(Widely available): Chrome 32+, Edge 79+, Firefox 36+, Safari 10+

```html
<div class="avatar">
  <img src="…" alt="…" />
</div>
```

```css
.avatar:has(img) {
  background-color: transparent;
}

.avatar img {
  block-size: 100%;
  inline-size: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
}
```

Step 3 of 4: Shapes

- [`corner-shape` ](https://webstatus.dev/features/corner-shape)(Limited availability): Chrome 139+, Edge 139+, Firefox not supported, Safari not supported

```css
.avatar.rounded {
  border-radius: var(--ui-radius-small);
}

.avatar.squircle {
  border-radius: var(--ui-radius-round);
  corner-shape: squircle;
}
```

Step 4 of 4: Group

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```html
<div class="avatar-group" role="group" aria-label="Team">
  <div class="avatar" role="img" aria-label="Anna Berg">AB</div>
  …
</div>
```

```css
.avatar-group {
  display: flex;
}

.avatar-group .avatar {
  box-shadow: 0 0 0 2px var(--ui-surface-default);
}

.avatar-group > * + * {
  margin-inline-start: calc(-1 * var(--overlap));
}
```

## Browser support

- Chromium: Full support Supported since v139.
- Firefox: Partial support Missing: corner-shape.
- Safari: Partial support Missing: corner-shape.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Avatar.md).

## Installation

- `opui-css/css/components/avatar.css`

## Changelog

### What's new

- Initials read the type roles: `--ui-font-size-caption`, `--ui-font-size-small` and `--ui-font-size-large` by size.
- A badge on a [grouped](#grouped) avatar sits on its start side, the part the next avatar doesn't cover, with the same ring as the avatars.
- [Sizes](#sizes) with `.ui-x-small`, `.ui-small` and `.ui-large`.
- Breaking: `--_color` is `--_text-color` and `--_width` is `--_size` ([Under the hood](#under-the-hood)).
- Rounded avatars never get rounder than [`--ui-border-radius`](#api), so `0` squares them.
- The ring around [grouped](#grouped) avatars reads `--ui-border-width-thick`.

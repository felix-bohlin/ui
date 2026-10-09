# Avatar

## Image

```html
<div class="ui-avatar">
  <img
    src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Maya Lind"
  />
</div>

<div class="ui-avatar">
  <img
    src="https://images.unsplash.com/photo-1672714413950-c9f7c5a45fa1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Omar Haddad"
  />
</div>

<div class="ui-avatar">
  <img
    src="https://plus.unsplash.com/premium_photo-1675674458649-0c667500f3cc?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
<div class="ui-avatar">
  <svg
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

<div class="ui-avatar">
  <svg
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

<div class="ui-avatar">
  <svg
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

Change the shape of the avatar with the `.ui-squared`, `.ui-rounded` and `.ui-squircle` classes.

```html
<div class="ui-avatar ui-squared">SQ</div>

<div class="ui-avatar ui-rounded">
  <img
    src="https://images.unsplash.com/photo-1616286608358-0e1b143f7d2f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Jonas Berg"
  />
</div>

<div class="ui-avatar ui-squircle">
  <img
    src="https://plus.unsplash.com/premium_photo-1770631651199-d92007477b6f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

| Type     | Modifiers                                    | Default | Description                              |
| -------- | -------------------------------------------- | ------- | ---------------------------------------- |
| Group    | `.ui-avatar-group`                           | -       | Renders a container that groups avatars. |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`      | -       | The size of the avatar.                  |
| Variants | `.ui-rounded`, `.ui-squared`, `.ui-squircle` | -       | The variant to use.                      |

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `.ui-avatar` | Container element. |
| `<img>`      | The avatar image.  |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--control-size`         | `calc(40px * var(--density))`                                                         | Shared default height for fields and buttons so they line up.                                                                                                                                                |
| `--control-size-large`   | `calc(46px * var(--density))`                                                         | Shared large height for fields and buttons.                                                                                                                                                                  |
| `--control-size-small`   | `calc(32px * var(--density))`                                                         | Shared small height for fields and buttons.                                                                                                                                                                  |
| `--control-size-x-small` | `calc(28px * var(--density))`                                                         | Shared x-small height for fields and buttons.                                                                                                                                                                |
| `--font-size-05`         | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                        |
| `--icon-size`            | `var(--size-4)`                                                                       | Default icon size inside components.                                                                                                                                                                         |
| `--icon-size-large`      | `var(--size-5)`                                                                       | Icon size inside `Avatar` and `List`.                                                                                                                                                                        |
| `--icon-size-small`      | `var(--size-3)`                                                                       | Icon size inside `Chip`.                                                                                                                                                                                     |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

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

   - A negative `margin-inline-end` stacks each avatar under the next
   - A `box-shadow` ring in the surface color fakes a cutout
   - Logical margin, so the stack flips in right-to-left

Step 1 of 4: Circle

- [`aspect-ratio` ](https://webstatus.dev/features/aspect-ratio)(Widely available): Chrome 88+, Edge 88+, Firefox 89+, Safari 15+

```css
.avatar {
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--primary);
  border-radius: var(--radius-round);
  color: var(--primary-contrast);
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
  border-radius: var(--radius-2);
}

.avatar.squircle {
  border-radius: var(--radius-round);
  corner-shape: squircle;
}
```

Step 4 of 4: Group

- [Logical properties ](https://webstatus.dev/features/logical-properties)(Widely available): Chrome 89+, Edge 89+, Firefox 66+, Safari 15+

```html
<div class="avatar-group" role="group">
  <div class="avatar">AB</div>
  …
</div>
```

```css
.avatar-group {
  display: flex;
}

.avatar-group .avatar {
  box-shadow: 0 0 0 2px var(--surface-default);
  margin-inline-end: calc(-1 * var(--overlap));
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

- A badge on a [grouped](#grouped) avatar sits on its start side, the part the next avatar doesn't cover.
- [Sizes](#sizes) with `.ui-x-small`, `.ui-small` and `.ui-large`.

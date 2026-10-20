# Button

Buttons do things, like saving a form or opening a dialog. For filters, tags and choices, use a [Chip](https://open-props-ui.netlify.app/react/components/chip.md).

## Anatomy

- `<Button>`

  Container element.

- `<svg>`

  An optional icon.

- `<span class="ui-text">`

  The label. Wrap it when the button has an icon. The CSS looks for the element, the class is a hook.

## Variants

Change the button variant with the `variant` prop.

```tsx
import { Button } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <div className="example-row">
        <Button>Text</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">Link</Button>
      </div>
      <div className="example-row">
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Button variant="outlined" href="#">
          Link
        </Button>
      </div>
      <div className="example-row">
        <Button variant="tonal">Tonal</Button>
        <Button variant="tonal" disabled>
          Disabled
        </Button>
        <Button variant="tonal" href="#">
          Link
        </Button>
      </div>
      <div className="example-row">
        <Button variant="filled">Filled</Button>
        <Button variant="filled" disabled>
          Disabled
        </Button>
        <Button variant="filled" href="#">
          Link
        </Button>
      </div>
    </>
  )
}
```

A default (text) button link with `aria-current="page"` keeps the pressed background, to mark the current page in navigation. Outlined, tonal and filled buttons don't change.

## Colors

Pass `color` to apply a brand or destructive color: `primary` or `critical`. The default is a neutral gray.

```tsx
import { Button } from "opui-css/react"

export default function Colors() {
  return (
    <>
      <div className="example-row">
        <Button color="primary">Primary</Button>
        <Button color="primary" variant="outlined">
          Outlined
        </Button>
        <Button color="primary" variant="tonal">
          Tonal
        </Button>
        <Button color="primary" variant="filled">
          Filled
        </Button>
      </div>
      <div className="example-row">
        <Button color="critical">Critical</Button>
        <Button color="critical" variant="outlined">
          Outlined
        </Button>
        <Button color="critical" variant="tonal">
          Tonal
        </Button>
        <Button color="critical" variant="filled">
          Filled
        </Button>
      </div>
    </>
  )
}
```

## Sizes

Resize any button using the `size` prop: `x-small`, `small`, default and `large`.

```tsx
import { Button } from "opui-css/react"

export default function SizesCode() {
  return (
    <>
      <Button size="x-small">x-small</Button>
      <Button size="small">Small</Button>
      <Button>Default</Button>
      <Button size="large">Large</Button>

      <Button variant="filled" size="x-small">
        x-small
      </Button>
      <Button variant="filled" size="small">
        Small
      </Button>
      <Button variant="filled">Default</Button>
      <Button variant="filled" size="large">
        Large
      </Button>

      <Button size="x-small" variant="outlined">
        <span className="ui-text">x-small</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button size="small" variant="outlined">
        <span className="ui-text">Small</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="outlined">
        <span className="ui-text">Default</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="outlined" size="large">
        <span className="ui-text">Large</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
    </>
  )
}
```

## Buttons with icon and label

Include an icon alongside text by nesting it within the component. Wrap the label in a `<span className="ui-text">`. The CSS looks for the wrapper element, the class is a hook for your own styles. The wrapper tightens the padding on the icon side, and a button whose only element is an `svg` is styled as icon-only, even with text next to it.

```tsx
import { Button } from "opui-css/react"

export default function IconAndLabelCode() {
  return (
    <>
      <Button>
        <span className="ui-text">Text</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="outlined">
        <span className="ui-text">Outlined</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="tonal">
        <span className="ui-text">Tonal</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>
      <Button variant="filled">
        <span className="ui-text">Filled</span>
        <svg aria-hidden="true">{/* */}</svg>
      </Button>

      <Button>
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Text</span>
      </Button>
      <Button variant="outlined">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Outlined</span>
      </Button>
      <Button variant="tonal">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Tonal</span>
      </Button>
      <Button variant="filled">
        <svg aria-hidden="true">{/* */}</svg>
        <span className="ui-text">Filled</span>
      </Button>
    </>
  )
}
```

## Keyboard

Use the `<kbd>` element to provide keyboard hints within a button.

```tsx
import { Button } from "opui-css/react"

export default function Keyboard() {
  return (
    <>
      <Button>
        Terminal <kbd>Ctrl+Alt+T</kbd>
      </Button>
      <Button variant="outlined">
        Spotlight <kbd>⌘Space</kbd>
      </Button>
      <Button variant="tonal">
        Lock <kbd>Win+L</kbd>
      </Button>
    </>
  )
}
```

## Icon-only

Set `iconOnly` and name the button with `aria-label`. The types require `aria-label` when `iconOnly` is set. Add `round` for a circle.

```tsx
import { Button } from "opui-css/react"

const editIcon = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z"
    ></path>
  </svg>
)

export default function IconOnly() {
  return (
    <>
      <div className="example-row">
        <Button aria-label="Edit" iconOnly>
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round>
          {editIcon}
        </Button>
      </div>
      <div className="example-row">
        <Button aria-label="Edit" iconOnly variant="outlined">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round variant="outlined">
          {editIcon}
        </Button>
      </div>
      <div className="example-row">
        <Button aria-label="Edit" iconOnly variant="tonal">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round variant="tonal">
          {editIcon}
        </Button>
      </div>
      <div className="example-row">
        <Button aria-label="Edit" iconOnly variant="filled">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round variant="filled">
          {editIcon}
        </Button>
      </div>
      <div className="example-row">
        <Button aria-label="Edit" iconOnly round size="x-small" variant="tonal">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round size="small" variant="tonal">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round variant="tonal">
          {editIcon}
        </Button>
        <Button aria-label="Edit" iconOnly round size="large" variant="tonal">
          {editIcon}
        </Button>
      </div>
    </>
  )
}
```

## Disabled

Disable the button with the `disabled` prop. Links can't be disabled, so with `href` it drops the `href` and sets `aria-disabled="true"` instead. The link can't be clicked or focused.

```tsx
import { Button } from "opui-css/react"

export default function DisabledCode() {
  return (
    <>
      <Button disabled>Text</Button>
      <Button disabled href="#">
        Link
      </Button>
    </>
  )
}
```

## File upload

Is it a button? Is it an input? You can find the [docs for it here](https://open-props-ui.netlify.app/react/components/text-field.md#file) at least.

## API

### Button API

| Prop         | Type                                  | Default    | Description                                                                          |
| ------------ | ------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `aria-label` | `string`                              | -          | The accessible name. Required with `iconOnly`, for buttons without visible text.     |
| `as`         | `"a"` , `"button"`                    | `"button"` | The element to render. Defaults to `"a"` with `href`.                                |
| `children`   | `ReactNode`                           | -          | The label and an optional icon.                                                      |
| `color`      | `"critical"` , `"primary"`            | -          | Optional colors.                                                                     |
| `disabled`   | `boolean`                             | `false`    | Disables the button. A link button drops its `href` and gets `aria-disabled="true"`. |
| `href`       | `string`                              | -          | The link to use. Renders an `<a>`.                                                   |
| `iconOnly`   | `boolean`                             | `false`    | Marks the button as icon-only, so `aria-label` is required. Types only.              |
| `round`      | `boolean`                             | `false`    | Fully rounded corners, a circle when icon-only.                                      |
| `size`       | `"large"` , `"small"` , `"x-small"`   | -          | The size of the element.                                                             |
| `variant`    | `"filled"` , `"outlined"` , `"tonal"` | -          | The variant to use.                                                                  |

#### CSS variables

| Variable                            | Default                                                                                  | Description                                                                                                                                                                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-radius`                | `var(--size-2)`                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.              |
| `--ui-border-width`                 | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                       |
| `--ui-button-accent`                | Unset                                                                                    | Color of `Button` and `ButtonGroup` without `.ui-primary` or `.ui-critical`: the fill of filled buttons, the text and border of outlined and text buttons. When unset, the darkest palette color in light mode and the lightest in dark mode. |
| `--ui-button-accent-contrast`       | Unset                                                                                    | Text color on a filled `--ui-button-accent` button. Set it with `--ui-button-accent`.                                                                                                                                                         |
| `--ui-button-border-color`          | Unset                                                                                    | Border color of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal`, and of the edge and dividers of a `ButtonGroup` with one of them. When unset, filled and tonal buttons have no visible border and outlined ones use their color.   |
| `--ui-button-border-radius`         | Unset                                                                                    | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-border-radius`, also where it's set on a part of the page.                                                                         |
| `--ui-button-font-weight`           | Unset                                                                                    | Font weight of `Button`. When unset, buttons follow `--ui-font-weight-bold`.                                                                                                                                                                  |
| `--ui-button-hover-shadow`          | Unset                                                                                    | Shadow of `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover. When unset, it keeps `--ui-shadow-control`.                                                                                                                     |
| `--ui-button-hover-translate`       | Unset                                                                                    | Moves `Button` with `.ui-filled`, `.ui-outlined` or `.ui-tonal` on hover, as a `translate` value. Pair it with `--ui-button-hover-shadow` to press buttons into their shadow. `none` when unset.                                              |
| `--ui-button-outlined-border-color` | Unset                                                                                    | Border color of `Button` with `.ui-outlined`, and of the edge and dividers of an outlined `ButtonGroup`. Beats `--ui-button-border-color` there. When unset, they follow `--ui-button-border-color`, or their color.                          |
| `--ui-button-size`                  | `var(--ui-control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                                                      |
| `--ui-button-size-large`            | `var(--ui-control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                                                             |
| `--ui-button-size-small`            | `var(--ui-control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                                                             |
| `--ui-button-size-x-small`          | `var(--ui-control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                                                         |
| `--ui-critical`                     | `var(--ui-red)`                                                                          | Severity color for errors and destructive actions.                                                                                                                                                                                            |
| `--ui-disabled-opacity`             | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                         |
| `--ui-duration-fast`                | `0.1s`                                                                                   | Transition duration for hover and press feedback.                                                                                                                                                                                             |
| `--ui-ease`                         | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                               |
| `--ui-font-code`                    | `var(--font-mono)`                                                                       | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                             |
| `--ui-font-size-05`                 | `0.875rem`                                                                               | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                                                         |
| `--ui-font-size-control`            | `var(--font-size-1)`                                                                     | Font size of the default `Button`, `TextField`, `Textarea` and `Select`. The size classes set their own.                                                                                                                                      |
| `--ui-font-weight-bold`             | `var(--font-weight-7)`                                                                   | Font weight for headings, buttons and terms.                                                                                                                                                                                                  |
| `--ui-font-weight-normal`           | `var(--font-weight-4)`                                                                   | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                  |
| `--ui-motion`                       | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/react/guide/theming.md#motion).                                     |
| `--ui-primary`                      | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                  |
| `--ui-primary-contrast`             | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                            |
| `--ui-primary-text`                 | Unset                                                                                    | Primary as a text color: links, and `Button` with `.ui-primary` and no variant or `.ui-outlined`. When unset, each derives a readable shade from `--ui-primary`. Set it when the primary is too light or too dark for text.                   |
| `--ui-shadow-control`               | `none`                                                                                   | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                |
| `--ui-state-active-alpha`           | `20%`                                                                                    | Alpha of the pressed state layer on neutral buttons in light mode.                                                                                                                                                                            |
| `--ui-state-active-alpha-accent`    | `25%`                                                                                    | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                             |
| `--ui-state-active-alpha-dark`      | `30%`                                                                                    | Alpha of the pressed state layer on neutral buttons in dark mode.                                                                                                                                                                             |
| `--ui-state-hover-alpha`            | `10%`                                                                                    | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                                                              |
| `--ui-state-hover-alpha-accent`     | `15%`                                                                                    | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                               |
| `--ui-state-hover-alpha-dark`       | `20%`                                                                                    | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                               |
| `--ui-surface-filled`               | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                        | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                         |
| `--ui-surface-tonal`                | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                        | Background of tonal variants.                                                                                                                                                                                                                 |
| `--ui-text-disabled`                | `color-mix( in oklch, var(--ui-text-muted) 50%, var(--ui-surface-default) )`             | Text color of disabled buttons and chips.                                                                                                                                                                                                     |
| `--ui-text-muted-contrast`          | `light-dark(var(--ui-gray-4), var(--ui-gray-13))`                                        | Muted text color on an inverted surface.                                                                                                                                                                                                      |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/react/guide/customizing.md#component-properties) has examples.

| Property                      | Kind   | Description                                                                                                                                                                          |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--_accent`                   | Input  | The accent color. Fills, borders, text, hover and active states are derived from it. Defaults to `--ui-button-accent` when a theme sets it. `.ui-primary` and `.ui-critical` set it. |
| `--_accent-contrast`          | Input  | Text color on a fill of `--_accent`. Defaults to `--ui-button-accent-contrast` when a theme sets it.                                                                                 |
| `--_accent-text`              | Output | Text color of text and outlined buttons. `--_accent`, lightened in dark mode to stay readable.                                                                                       |
| `--_accent-tonal`             | Input  | Background of `.ui-tonal`.                                                                                                                                                           |
| `--_accent-tonal-contrast`    | Input  | Text color of `.ui-tonal`.                                                                                                                                                           |
| `--_bg-color`                 | Output | The current background. Set by the variant, hover, active and disabled states.                                                                                                       |
| `--_border-color`             | Output | The current border color. Set by the variant and states.                                                                                                                             |
| `--_border-radius`            | Input  | The corner radius. Defaults to `--ui-button-border-radius`, `.ui-rounded` makes it round.                                                                                            |
| `--_border-width`             | Input  | The border width.                                                                                                                                                                    |
| `--_default-active-bg-color`  | Output | Pressed background of text buttons, from `--_accent`.                                                                                                                                |
| `--_default-hover-bg-color`   | Output | Hover background of text buttons, from `--_accent`.                                                                                                                                  |
| `--_duration`                 | Output | Duration of the transitions, `--ui-duration-fast` times `--_motion`.                                                                                                                 |
| `--_ease`                     | Input  | Easing of the transitions. Defaults to `--ui-ease`.                                                                                                                                  |
| `--_filled-active-bg-color`   | Output | Pressed background of filled buttons, from `--_accent`.                                                                                                                              |
| `--_filled-hover-bg-color`    | Output | Hover background of filled buttons, from `--_accent`.                                                                                                                                |
| `--_font-size`                | Input  | The font size. Set by the size classes.                                                                                                                                              |
| `--_icon-size`                | Input  | The size of a direct child `svg`. Icon-only buttons scale it with `--_min-height`.                                                                                                   |
| `--_min-height`               | Input  | The height. Set by the size classes.                                                                                                                                                 |
| `--_motion`                   | Input  | Motion multiplier for the transitions. `0` turns them off.                                                                                                                           |
| `--_outlined-active-bg-color` | Output | Pressed background of outlined buttons, from `--_accent`.                                                                                                                            |
| `--_padding-inline`           | Input  | The inline padding. Set by the size classes.                                                                                                                                         |
| `--_shadow`                   | Input  | The shadow. `--ui-shadow-control` on `.ui-filled`, `.ui-outlined` and `.ui-tonal`, none on text buttons.                                                                             |
| `--_text-color`               | Output | The current text color. Set by the variant, hover, active and disabled states.                                                                                                       |

## Under the hood

Read the post: [One Button, no IconButton](https://open-props-ui.netlify.app/learn/button-icon-only-has)

1. Base

   - Shown tonal for visibility, the library default is a text button
   - Padding in `ex` so it scales with the font
   - One custom property per size, every size reuses the same rules
   - The icon is `0.7lh`, so it follows the line height

2. Icon-only

   - `:has(> svg:only-child)` spots an icon-only button
   - Square at every size: no `IconButton`, no extra class
   - The icon scales with the button instead of the text

3. Icon side

   - Tighter padding on the icon side balances the optical weight
   - Text nodes aren't elements, so the label needs a wrapper element. In `<span class="ui-text">` the class is only a hook

Step 1 of 3: Base

```css
.button {
  align-items: center;
  background-color: var(--ui-surface-tonal);
  border: 1px solid var(--ui-border-color);
  border-radius: var(--radius-2);
  color: var(--ui-text-primary);
  display: inline-flex;
  gap: 1ex;
  min-block-size: var(--size);
  padding-inline: var(--padding-inline);
}

.button > svg {
  block-size: auto;
  flex-shrink: 0;
  inline-size: auto;
  max-block-size: var(--ui-icon-size, 0.7lh);
}
```

Step 2 of 3: Icon-only

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.button:has(> svg:only-child) {
  --ui-icon-size: calc(var(--size) * 0.6);
  justify-content: center;
  min-inline-size: var(--size);
  padding-inline: 0;
}
```

Step 3 of 3: Icon side

```html
<button class="button" type="button">
  <svg>…</svg>
  <span class="ui-text">Download</span>
</button>
```

```css
.button:has(> svg:first-child + *) {
  padding-inline-start: calc(var(--padding-inline) * 0.75);
}

.button:has(> * + svg:last-child) {
  padding-inline-end: calc(var(--padding-inline) * 0.75);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Button.md).

## Installation

Import the component from `opui-css/react`:

### Used by

- [Button Group](https://open-props-ui.netlify.app/react/components/button-group.md)

* `opui-css/css/components/button.css`

## Changelog

### What's new

- [Icon-only](#icon-only) buttons need no extra class, and `round` makes them round.
- Breaking: icon styles only apply to a direct child `svg`. Wrap the label in a `<span class="ui-text">` next to an icon to [tighten the padding](#buttons-with-icon-and-label), or the button renders as icon-only.
- Links with `aria-disabled="true"` [look and act disabled](#disabled).
- [Primary and critical](#colors) colors pass contrast in light and dark mode.
- [`iconOnly`](#icon-only) makes `aria-label` required on icon-only buttons (types only).
- Breaking: `--_color`, `--_color-contrast` and `--_color-tonal` are `--_accent`, `--_accent-contrast` and `--_accent-tonal` ([Under the hood](#under-the-hood)).
- Breaking: [disabled links](#disabled) have no `href`, so they can't be focused or followed.
- `--_duration` and `--_ease` set the transition duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-border-radius` through [`--ui-button-border-radius`](#api), so one token squares or rounds every component.
- Themes set the color of [default buttons](#colors) with [`--ui-button-accent`](#api) and `--ui-button-accent-contrast`, the border with `--ui-button-border-color` and `--ui-button-outlined-border-color`, the font weight with `--ui-button-font-weight`, the hover shadow and offset with `--ui-button-hover-shadow` and `--ui-button-hover-translate`, and the font size with `--ui-font-size-control`.
- [Primary](#colors) outlined and text buttons read `--ui-primary-text` when a theme sets it.

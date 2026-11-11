# Popover

A surface next to its trigger for content that isn't a list of actions.

- CSS: `opui-css/css/components/popover.css` and `opui-css/css/components/card.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/popover.md), [Astro](https://open-props-ui.netlify.app/astro/components/popover.md), [React](https://open-props-ui.netlify.app/react/components/popover.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/popover.md), [Vue](https://open-props-ui.netlify.app/vue/components/popover.md).

## Popover

### Parts

- `div.ui-popover[popover]` (root): The surface, a `<div>` with `popover` and `role="dialog"`, placed next to its trigger.
- `.ui-header` (`PopoverHeader`): The header, a row for the title and anything next to it, with an optional close button.
- `<h2>` (`PopoverTitle`): The title. Names the popover through `aria-labelledby`.
- `.ui-content` (`PopoverContent`): The scrollable content.
- `.ui-footer` (`PopoverFooter`): The footer, a row at the end.

### Props and modifiers

- `align`: `"end"` (`.ui-align-end`), `"start"` (default). Which edge of the trigger the popover lines up with.
- Anchor position area (HTML): `--ui-anchor-position-area`, default `"self-block-end span-self-inline-end"`. Any valid `position-area` value. Overrides the side and alignment classes. The `self-` keywords follow the popover's own direction, so the placement mirrors in a right-to-left part of a left-to-right page.
- `closeOnNavigate`: `boolean`, `[data-close-on-navigate]`. Closes the popover when the page navigates: a link inside it, Back and Forward, or a client router. A hash link or a replaced query on the same path keeps it open. Reads the Navigation API.
- `id`: `string`. The id of the popover, which the trigger's `commandfor` points at. Required.
- `popover`: `"auto"` (default), `"manual"` (`[popover="manual"]`). The popover type. With `manual`, Esc and a click outside don't close the popover, and opening another popover doesn't either.
- `side`: `"block-end"` (default), `"block-start"` (`.ui-block-start`), `"inline-end"` (`.ui-inline-end`), `"inline-start"` (`.ui-inline-start`). The side of the trigger the popover opens on.
- Trigger (HTML): `button[commandfor][command="toggle-popover"]`. Opens the popover. `commandfor` is the popover id.

### Slots

- `default`: The popover parts. Other content, such as a `List`, sits edge to edge, and scrolls on its own between a header and a footer.

### Notes

- HTML: Open the popover with a button that has `commandfor` set to the popover id and `command="toggle-popover"`, and point `aria-labelledby` at its heading. For `[data-close-on-navigate]`, import `opui-css/elements/close-on-navigate.js`.
- Astro, React, Svelte and Vue: Attributes that aren't props go to the `<div>`, like `aria-label`. Without `aria-label` or `aria-labelledby`, the `PopoverTitle` names the popover. A popover without a `PopoverTitle` needs an `aria-label`.

## PopoverHeader

### Parts

- `.ui-header` (root): Container element.
- `<button>` (prop `closeLabel`, slot `close-icon`): Closes the popover. Renders a close icon by default, or the `svg` in `close-icon`.

### Props and modifiers

- `closeLabel`: `string`. The accessible name of the close button. Set it to add a close button at the end of the title row, which closes its `Popover` through the popover's `id`.

### Slots

- `default`: The `PopoverTitle`, and any other content before the close button.

## PopoverFooter

### Parts

- `.ui-footer` (root): A row at the end, for buttons, text or anything else.
- `.ui-footer > .ui-actions`: Groups buttons. Moves to the end when other content comes first.

### Props and modifiers

- `align`: `"end"` (default), `"start"` (`.ui-align-start`). Alignment for the footer content.

### Slots

- `default`: The footer content, such as buttons.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### popover.css

- `--_bg-color`: The background. Defaults to `--ui-surface-elevated`, which `Menu` sets again over `list.css`.
- `--_border-color`: The edge color. `--ui-border-color-raised` when a theme sets it, otherwise `--ui-border-color-on-raised`.
- `--_border-width`: The border width. Defaults to `--ui-border-width`.
- `--_max-block-size`: Maximum height.
- `--_max-inline-size`: Maximum width of a `.ui-popover`, capped to fit the viewport. Defaults to `24rem`.
- `--_min-block-size`: Height the popover keeps when space is tight, unless its content is shorter. Needs `calc-size()`.
- `--_min-inline-size`: Minimum width of a `.ui-popover`, capped to fit the viewport. Defaults to `16rem`, so a popover too wide for the space on its side moves below or above its trigger instead of shrinking.
- `--_motion`: Motion multiplier for the transitions. `0` turns them off.
- `--_offset`: Gap between the popover and its invoker.
- `--_padding`: Padding of the header, content and footer of a `.ui-popover`. Defaults to `--ui-space-3`.
- `--_radius`: The corner radius. Defaults to `--ui-popover-radius`, or `--ui-radius` when the theme doesn't set it. `Menu` reads `--ui-menu-radius` first.
- `--_shadow`: The shadow. Defaults to `--ui-shadow-overlay`.
- `--_title-font-size`: Font size of the title in the header, declared in `card.css` and set to `--ui-font-size-h6` here.

Outputs: `--_content-anchor`, `--_duration`, `--_ease`, `--_ease-move`, `--_fit-max-block-size`, `--_margin-block`, `--_margin-inline`, `--_position-area`, `--_side` and `--_span`.

### card.css

- `--_actions-padding-inline`: Inline padding of `.ui-actions`. Defaults to `--_padding`. The actions pass it on as `--ui-card-padding`, so a text button at either end keeps its focus ring inside the card.
- `--_backdrop-bg-color`: Backdrop color of a dialog or drawer. Defaults to `--ui-backdrop-bg-color`.
- `--_backdrop-blur`: Backdrop filter of a dialog or drawer. Defaults to a `--ui-backdrop-blur` blur.
- `--_ease`: Easing of the card link border transition and the focus ring animation. Defaults to `--ui-ease`.
- `--_elevated-bg-color`: Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`.
- `--_elevated-shadow`: Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`.
- `--_footer-gap`: Gap between the items in a dialog's, drawer's or popover's `.ui-footer` and between the buttons in its `.ui-actions`. Defaults to `--ui-space-2`.
- `--_gap`: Gap between the parts. `--ui-space-3`, or `--ui-space-2` in `.ui-dense`. The part after an image subtracts it from its padding.
- `--_media-inline-size`: Width of the image when it sits at the start of the card, and the start margin of the parts next to it. Defaults to `40%` of the card.
- `--_motion`: Motion multiplier for the card link border transition and the focus ring animation. `0` turns them off.
- `--_outlined-border-color`: Border color of `.ui-outlined`. Defaults to `--ui-border-color`.
- `--_padding`: Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset.
- `--_scroll-shadow`: Shadow at the edges of a dialog's, drawer's or popover's `.ui-content` when it scrolls. Defaults to `--ui-shadow-scroll`.
- `--_surface-bg-color`: Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`.
- `--_title-font-size`: Font size of a dialog's, drawer's or popover's title, a heading in `.ui-header`. Defaults to `--ui-font-size-h4`, and `popover.css` sets it to `--ui-font-size-h6`.
- `--_tonal-bg-color`: Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`.

Outputs: `--_bg-color`, `--_border-color`, `--_border-width`, `--_content-anchor`, `--_duration`, `--_orientation` and `--_shadow`.

## Theme tokens

The stylesheets read `--ui-backdrop-bg-color`, `--ui-backdrop-blur`, `--ui-border-color`, `--ui-border-color-on-raised`, `--ui-border-color-raised`, `--ui-border-width`, `--ui-border-width-thick`, `--ui-card-padding`, `--ui-duration`, `--ui-duration-slow`, `--ui-ease`, `--ui-ease-enter`, `--ui-ease-exit`, `--ui-ease-move`, `--ui-field-border-color-on-raised`, `--ui-focus-border-color`, `--ui-focus-ring-color`, `--ui-focus-ring-inset`, `--ui-focus-ring-offset`, `--ui-focus-ring-style`, `--ui-focus-ring-width`, `--ui-font-size-body`, `--ui-font-size-caption`, `--ui-font-size-h4`, `--ui-font-size-h6`, `--ui-letter-spacing-heading`, `--ui-line-height-tight`, `--ui-motion`, `--ui-popover-radius`, `--ui-primary`, `--ui-radius`, `--ui-rhythm-step`, `--ui-shadow-elevated`, `--ui-shadow-overlay`, `--ui-shadow-scroll`, `--ui-shadow-surface`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-5`, `--ui-space-6`, `--ui-surface`, `--ui-surface-elevated`, `--ui-surface-tonal`, `--ui-text` and `--ui-text-strong`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<button
  class="ui-button ui-outlined"
  type="button"
  command="toggle-popover"
  commandfor="popover-basics-1"
>
  Notifications
</button>
<div
  aria-labelledby="popover-basics-1-title"
  class="ui-popover"
  data-close-on-navigate
  id="popover-basics-1"
  popover
  role="dialog"
>
  <div class="ui-header">
    <h2 id="popover-basics-1-title">Notifications</h2>
    <button
      class="ui-button ui-round ui-small"
      type="button"
      aria-label="Close"
      command="hide-popover"
      commandfor="popover-basics-1"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
        ></path>
      </svg>
    </button>
  </div>
  <div class="ui-content">
    <p>Maja commented on your photo from the summer trip.</p>
    <p>Jonas wrote on your wall.</p>
  </div>
  <div class="ui-footer">
    <a class="ui-button" href="/guide/getting-started/">See all</a>
  </div>
</div>

<script type="module">
  import "opui-css/elements/close-on-navigate.js"
</script>
```

## Astro

`import { Popover, PopoverContent, PopoverFooter, PopoverHeader, PopoverTitle } from "opui-css/astro"`

- `PopoverHeader` named slots: `close-icon`. Fill one with `slot="close-icon"` on a child.

### Example: Basics

```astro
---
import {
  Button,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "opui-css/astro"
---

<Button
  command="toggle-popover"
  commandfor="popover-basics-1"
  variant="outlined"
>
  Notifications
</Button>
<Popover closeOnNavigate id="popover-basics-1">
  <PopoverHeader closeLabel="Close">
    <PopoverTitle>Notifications</PopoverTitle>
  </PopoverHeader>
  <PopoverContent>
    <p>Maja commented on your photo from the summer trip.</p>
    <p>Jonas wrote on your wall.</p>
  </PopoverContent>
  <PopoverFooter>
    <Button href="/guide/getting-started/">See all</Button>
  </PopoverFooter>
</Popover>
```

## React

`import { Popover, PopoverContent, PopoverFooter, PopoverHeader, PopoverTitle } from "opui-css/react"`

- `PopoverHeader` slot props (`ReactNode`): `children` and `closeIcon`.
- Client components (`"use client"`): `Popover` and `PopoverHeader`.

### Example: Basics

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="popover-basics-1"
        variant="outlined"
      >
        Notifications
      </Button>
      <Popover closeOnNavigate id="popover-basics-1">
        <PopoverHeader closeLabel="Close">
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        <PopoverContent>
          <p>Maja commented on your photo from the summer trip.</p>
          <p>Jonas wrote on your wall.</p>
        </PopoverContent>
        <PopoverFooter>
          <Button href="/guide/getting-started/">See all</Button>
        </PopoverFooter>
      </Popover>
    </>
  )
}
```

## Svelte

`import { Popover, PopoverContent, PopoverFooter, PopoverHeader, PopoverTitle } from "opui-css/svelte"`

- `PopoverHeader` slot snippets: `children` and `closeIcon`.

### Example: Basics

```svelte
<script lang="ts">
  import {
    Button,
    Popover,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTitle,
  } from "opui-css/svelte"
</script>

<Button
  command="toggle-popover"
  commandfor="popover-basics-1"
  variant="outlined"
>
  Notifications
</Button>
<Popover closeOnNavigate id="popover-basics-1">
  <PopoverHeader closeLabel="Close">
    <PopoverTitle>Notifications</PopoverTitle>
  </PopoverHeader>
  <PopoverContent>
    <p>Maja commented on your photo from the summer trip.</p>
    <p>Jonas wrote on your wall.</p>
  </PopoverContent>
  <PopoverFooter>
    <Button href="/guide/getting-started/">See all</Button>
  </PopoverFooter>
</Popover>
```

## Vue

`import { Popover, PopoverContent, PopoverFooter, PopoverHeader, PopoverTitle } from "opui-css/vue"`

- `PopoverHeader` named slots: `close-icon`. Fill one with `<template #close-icon>`.

### Example: Basics

```vue
<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
} from "opui-css/vue"
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="popover-basics-1"
    variant="outlined"
  >
    Notifications
  </Button>
  <Popover closeOnNavigate id="popover-basics-1">
    <PopoverHeader closeLabel="Close">
      <PopoverTitle>Notifications</PopoverTitle>
    </PopoverHeader>
    <PopoverContent>
      <p>Maja commented on your photo from the summer trip.</p>
      <p>Jonas wrote on your wall.</p>
    </PopoverContent>
    <PopoverFooter>
      <Button href="/guide/getting-started/">See all</Button>
    </PopoverFooter>
  </Popover>
</template>
```

# Message

Chat bubbles that group by sender, with attachments, reactions and a typing indicator.

- CSS: `opui-css/css/components/message.css`, `opui-css/css/components/reactions.css` and `opui-css/css/components/avatar.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/message.md), [Astro](https://opui.dev/astro/components/message.md), [Nunjucks](https://opui.dev/nunjucks/components/message.md), [React](https://opui.dev/react/components/message.md), [Solid](https://opui.dev/solid/components/message.md), [Svelte](https://opui.dev/svelte/components/message.md), [Vue](https://opui.dev/vue/components/message.md).

## MessageList

### Parts

- `ol.ui-message-list` (root): The conversation, an ordered list.
- `li.ui-message` (`Message`): A message. Consecutive messages on the same side group into a run.

### Props and modifiers

- `direct`: `boolean`, `.ui-direct`. A chat between two people: no message shows its author's name or avatar, since the chat's own title names the other person. Screen readers still hear the name.
- `role`: `string`, default `"list"`. The `role` of the `<ol>`, such as `log` for a live conversation. `list` keeps Safari announcing a list.

### Slots

- `default`: The messages, and any other `li` between them, such as a date in `li.ui-divider`, which starts a new run.

### Notes

- Name the list with `aria-label`, such as the other person or the channel, so a screen reader knows which conversation it is.

## Message

### Parts

- `li.ui-message` (root): A message.
- `.ui-avatar` (slot `start`): The sender's `Avatar`, from the `start` slot, shown on the last message of a run. It takes no `label`: `author` names the message.
- `.ui-content` (slot `default`): The bubble.
- `.ui-header` (prop `author`): The sender's name.
- `.ui-footer` (prop `datetime`, prop `time`): The time, and content such as a read receipt.
- `.ui-end` (slot `end`): Content after the time, such as a read receipt.
- `.ui-actions` (slot `actions`): Buttons beside the bubble, such as a round `Button` that opens a horizontal `Menu` of emoji. On a device that can hover, they show while the message is hovered, holds focus or has a popover open.
- `.ui-bottom` (slot `bottom`): The `Reactions`, whose pills sit over the bottom edge of the bubble.

### Props and modifiers

- `author`: `string`. The sender, shown on the first message of a run and read by screen readers on every message.
- `datetime`: `string`, `time[datetime]`. The machine-readable date and time of `time`.
- `newAuthor`: `boolean`, `.ui-new-author`. Starts a new run when the author changes, for a group chat.
- `outgoing`: `boolean`, `.ui-outgoing`. A message you sent. It aligns to the end in the primary color, and its author is visually hidden.
- `time`: `string`. The time as shown, at the end of the bubble.
- `typing`: `boolean`, `.ui-typing`. Shows animated dots instead of the content. The default slot becomes the status text for screen readers.

## Reactions

### Parts

- `opui-reactions.ui-reactions` (root): The `<opui-reactions>` custom element, a row that wraps, and `display: contents` in the `bottom` slot of a `Message`. A click on a pill, or on a button with `command="--react"`, this element in `commandfor` and the emoji as its `value`, fires a `reaction` event that bubbles, and changes nothing. A pick of an emoji you already reacted with asks to uncheck it, and the menu the button is in closes. While it has `data-hydrating`, which the React, Solid, Svelte and Vue components render until they hydrate, clicks ask for nothing.
- `.ui-toggle-group`: The `ToggleGroup` of pills, named by the `aria-label` or `aria-labelledby` of the component.
- `.ui-toggle-button` (prop `items`, prop `quick`): A reaction: a checkbox `ToggleButton` drawn as a pill, checked when you reacted with it.
- `<span role="status">`: The live region that `announce()` writes to, visually hidden with `.ui-sr-only`.

### Props and modifiers

- `@reaction` (Vue): `(event: CustomEvent<ReactionDetail>) => void`. Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change `items`.
- `aria-label`: `string`. The accessible name of the group of pills. The Astro, React, Solid and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.
- `aria-labelledby`: `string`. The id of the element that names the group of pills, instead of `aria-label`.
- `items`: `ReactionsItem[]`. The reactions in use, as `{ aria-label, checked, label, value }` objects: the name with the count in `aria-label`, such as `Thumbs up, 2`, the emoji with the count in `label`, and `checked` on the ones you reacted with.
- `name`: `string`. The `name` of the checkboxes.
- `onreaction` (Svelte): `(event: CustomEvent<ReactionDetail>) => void`. Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change `items`.
- `onReaction` (React and Solid): `(event: CustomEvent<ReactionDetail>) => void`. Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change `items`.
- `quick`: `ReactionsItem`. The one-tap reaction, as an item without a count: `{ aria-label, label, value }`. Its pill always comes first. While `items` has no entry with its `value`, the pill is unchecked, has a dashed border and shows `label` alone.
- Quick label (HTML): `[quick-label]`. The name of the quick reaction without a count, such as `Thumbs up`, which `delete()` gives its pill.
- Quick text (HTML): `[quick-text]`. The emoji of the quick reaction without a count, which `delete()` gives its pill.
- Quick value (HTML): `[quick-value]`. The `value` of the quick reaction, the one-tap reaction whose pill comes first and stays when `delete()` is called with it.
- Suggested (HTML): `.ui-toggle-button.ui-suggested`. The pill of the quick reaction while nobody has picked it, which suggests it: a dashed border.

### Slots

- `default`: Content after the pills, such as the add reaction button and its `Menu` when they aren't in the `actions` slot of a `Message`.

### Element

- `<opui-reactions>`, defined by `opui-css/elements/reactions.js`:
  - `announce(message)`: Reads `message` to screen readers, through the `role="status"` child.
  - `delete(value)`: Removes the pill of `value`, and moves focus to the next pill, the previous one or the first button after the pills when the removed pill had it. The pill of the `quick-value` reaction stays, unchecked and `.ui-suggested`, with the `quick-label` and `quick-text` attributes as its name and text, and keeps focus.
  - `group`: The `.ui-toggle-group` of pills, or `null`. Read-only.
  - `reaction` event: Fires when a pill is clicked, or a button with `command="--react"` and this element in `commandfor`, with the `value` and the `checked` state asked for in `event.detail`. It bubbles, and changes nothing.
  - `set(value, reaction)`: Updates the pill of `value` with `{ checked, label, text }`, the accessible name in `label` and the emoji and count in `text`, or adds one at the end, and the `quick-value` reaction first. It removes `.ui-suggested` from the pill.

### Notes

- HTML: Put a `.ui-toggle-group` of checkbox `.ui-toggle-button` pills in `<opui-reactions class="ui-reactions">`, with an empty `<span class="ui-sr-only" role="status">` last, and import `opui-css/elements/reactions.js`. Each input takes the emoji's `value` and an `aria-label` with the name and the count, and a `<span aria-hidden="true">` after it shows the emoji and the count. Apply your server's answer with `set()` and `delete()`.
- Astro: The component loads `opui-css/elements/reactions.js`. A click never checks or unchecks a pill on its own: change `items` when your server answers. `announce(message)` on `event.target` reads a message to screen readers.
- Nunjucks: The macro renders the element without its script, so load `opui-css/elements/reactions.js` on the page. A click never checks or unchecks a pill on its own: change `items` when your server answers. `announce(message)` on `event.target` reads a message to screen readers.
- React: The component loads `opui-css/elements/reactions.js` once it mounts, unless the page imports it first. A click never checks or unchecks a pill on its own: change `items` when your server answers. `announce(message)` on `event.target` reads a message to screen readers.
- Solid, Svelte and Vue: The component imports `opui-css/elements/reactions.js`, so the element runs as soon as the component's code loads. A click never checks or unchecks a pill on its own: change `items` when your server answers. `announce(message)` on `event.target` reads a message to screen readers.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### message.css

- `--_actions-opacity`: Opacity of the actions on a device that can hover, while the message isn't hovered, doesn't hold focus and has no popover open. Defaults to `0`; `1` always shows them.
- `--_avatar-size`: Size of the avatar next to the bubble. Defaults to `--ui-control-size-small`.
- `--_bg-color`: Background of the bubble. Defaults to `--ui-surface-tonal`, and `--ui-primary` with `.ui-outgoing`.
- `--_ease`: Easing of the fade of the actions. Defaults to `--ui-ease`.
- `--_max-inline-size`: Widest bubble. Defaults to `36rem`, or 85% of the list when that is narrower.
- `--_motion`: Multiplies the typing animation and the fade of the actions. Defaults to `--ui-motion`, `0` under reduced motion.
- `--_radius`: Radius of the bubble corners. Defaults to `--ui-radius`, larger with `corner-shape: squircle`.
- `--_text-color`: Text color in the bubble. Defaults to `--ui-text-strong`, and `--ui-on-primary` with `.ui-outgoing`.
- `--_tight-radius`: Radius of the corners inside a run. Defaults to `--ui-radius-small`.

Outputs: `--_block-end-radius`, `--_block-start-radius`, `--_dot-image`, `--_duration`, `--_font-size` and `--_size`.

### reactions.css

Outputs: `--_border-color`, `--_divider-gap`, `--_font-size`, `--_selected-bg-color` and `--_size`.

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

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-border-width-large`, `--ui-button-size-x-small`, `--ui-contrast`, `--ui-control-size`, `--ui-control-size-large`, `--ui-control-size-small`, `--ui-control-size-x-small`, `--ui-duration`, `--ui-ease`, `--ui-focus-border-color`, `--ui-font-size-caption`, `--ui-font-size-large`, `--ui-font-size-small`, `--ui-font-weight-label`, `--ui-icon-size`, `--ui-icon-size-large`, `--ui-icon-size-small`, `--ui-motion`, `--ui-on-primary`, `--ui-on-primary-tonal`, `--ui-on-selected`, `--ui-palette-on-tonal`, `--ui-palette-tonal`, `--ui-primary`, `--ui-primary-tonal`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-selected`, `--ui-selected-strong`, `--ui-space-1`, `--ui-space-2`, `--ui-space-4`, `--ui-space-8`, `--ui-state-disabled-opacity`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div aria-label="Chat with Ellen" role="log">
  <ol class="ui-message-list" role="list" aria-label="Messages with Ellen">
    <li class="ui-message">
      <div class="ui-avatar">
        <span aria-hidden="true">EN</span>
      </div>
      <div class="ui-content">
        <p class="ui-header">Ellen</p>
        <p>Heyyy! Did your band notice you changed strings yet?</p>
        <p class="ui-footer">
          <time datetime="2026-10-08T14:02">14:02</time>
        </p>
      </div>
    </li>
    <li class="ui-message">
      <div class="ui-avatar">
        <span aria-hidden="true">EN</span>
      </div>
      <div class="ui-content">
        <p class="ui-header">Ellen</p>
        <p>Flatwounds, right? So rad.</p>
        <p class="ui-footer">
          <time datetime="2026-10-08T14:03">14:03</time>
        </p>
      </div>
    </li>
    <li class="ui-message ui-outgoing">
      <div class="ui-content">
        <p class="ui-header">You</p>
        <p>Nope, not even the drummer. Bummer, but WE know.</p>
        <p class="ui-footer">
          <time datetime="2026-10-08T14:18">14:18</time>
        </p>
      </div>
    </li>
    <li class="ui-message ui-outgoing">
      <div class="ui-content">
        <p class="ui-header">You</p>
        <p>Can you send me the tab for your slap break?</p>
        <p class="ui-footer">
          <time datetime="2026-10-08T14:19">14:19</time>
          <span class="ui-end">Read</span>
        </p>
      </div>
    </li>
  </ol>
</div>
```

## Astro

`import { Message, MessageList, Reactions } from "opui-css/astro"`

- `Message` named slots: `actions`, `bottom`, `end` and `start`. Fill one with `slot="actions"` on a child.

### Example: Basics

```astro
---
import { Avatar, Message, MessageList } from "opui-css/astro"
---

<div aria-label="Chat with Ellen" role="log">
  <MessageList aria-label="Messages with Ellen">
    <Message author="Ellen" datetime="2026-10-08T14:02" time="14:02">
      <Avatar slot="start">EN</Avatar>
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    </Message>
    <Message author="Ellen" datetime="2026-10-08T14:03" time="14:03">
      <Avatar slot="start">EN</Avatar>
      <p>Flatwounds, right? So rad.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
      <p>Nope, not even the drummer. Bummer, but WE know.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
      <p>Can you send me the tab for your slap break?</p>
      <Fragment slot="end">Read</Fragment>
    </Message>
  </MessageList>
</div>
```

## Nunjucks

`{% from "opui/index.njk" import Message, MessageList, Reactions %}`

- `Message` named slots: `slots.actions`, `slots.bottom`, `slots.end` and `slots.start`. Pass a string, or markup captured with `{% set %}`.

### Example: Basics

```njk
{% from "opui/index.njk" import Avatar, Message, MessageList %}

<div aria-label="Chat with Ellen" role="log">
  {% call MessageList({ "aria-label": "Messages with Ellen" }) %}
    {% set start %}{% call Avatar() %}EN{% endcall %}{% endset %}
    {% call Message({
      author: "Ellen",
      datetime: "2026-10-08T14:02",
      slots: { start: start },
      time: "14:02"
    }) %}
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    {% endcall %}
    {% set start %}{% call Avatar() %}EN{% endcall %}{% endset %}
    {% call Message({
      author: "Ellen",
      datetime: "2026-10-08T14:03",
      slots: { start: start },
      time: "14:03"
    }) %}
      <p>Flatwounds, right? So rad.</p>
    {% endcall %}
    {% call Message({
      author: "You",
      datetime: "2026-10-08T14:18",
      outgoing: true,
      time: "14:18"
    }) %}
      <p>Nope, not even the drummer. Bummer, but WE know.</p>
    {% endcall %}
    {% call Message({
      author: "You",
      datetime: "2026-10-08T14:19",
      outgoing: true,
      slots: { end: "Read" },
      time: "14:19"
    }) %}
      <p>Can you send me the tab for your slap break?</p>
    {% endcall %}
  {% endcall %}
</div>
```

## React

`import { Message, MessageList, Reactions } from "opui-css/react"`

- `Message` slot props (`ReactNode`): `actions`, `bottom`, `children`, `end` and `start`.
- Client components (`"use client"`): `Reactions`.

### Example: Basics

```tsx
import { Avatar, Message, MessageList } from "opui-css/react"

export default function Basics() {
  return (
    <div aria-label="Chat with Ellen" role="log">
      <MessageList aria-label="Messages with Ellen">
        <Message
          author="Ellen"
          datetime="2026-10-08T14:02"
          start={<Avatar>EN</Avatar>}
          time="14:02"
        >
          <p>Heyyy! Did your band notice you changed strings yet?</p>
        </Message>
        <Message
          author="Ellen"
          datetime="2026-10-08T14:03"
          start={<Avatar>EN</Avatar>}
          time="14:03"
        >
          <p>Flatwounds, right? So rad.</p>
        </Message>
        <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
          <p>Nope, not even the drummer. Bummer, but WE know.</p>
        </Message>
        <Message
          author="You"
          datetime="2026-10-08T14:19"
          end="Read"
          outgoing
          time="14:19"
        >
          <p>Can you send me the tab for your slap break?</p>
        </Message>
      </MessageList>
    </div>
  )
}
```

## Solid

`import { Message, MessageList, Reactions } from "opui-css/solid"`

- `Message` slot props (`JSX.Element`): `actions`, `bottom`, `children`, `end` and `start`.

### Example: Basics

```tsx
/** @jsxImportSource @solidjs/web */
import { Avatar, Message, MessageList } from "opui-css/solid"

export default function Basics() {
  return (
    <div aria-label="Chat with Ellen" role="log">
      <MessageList aria-label="Messages with Ellen">
        <Message
          author="Ellen"
          datetime="2026-10-08T14:02"
          start={<Avatar>EN</Avatar>}
          time="14:02"
        >
          <p>Heyyy! Did your band notice you changed strings yet?</p>
        </Message>
        <Message
          author="Ellen"
          datetime="2026-10-08T14:03"
          start={<Avatar>EN</Avatar>}
          time="14:03"
        >
          <p>Flatwounds, right? So rad.</p>
        </Message>
        <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
          <p>Nope, not even the drummer. Bummer, but WE know.</p>
        </Message>
        <Message
          author="You"
          datetime="2026-10-08T14:19"
          end="Read"
          outgoing
          time="14:19"
        >
          <p>Can you send me the tab for your slap break?</p>
        </Message>
      </MessageList>
    </div>
  )
}
```

## Svelte

`import { Message, MessageList, Reactions } from "opui-css/svelte"`

- `Message` slot snippets: `actions`, `bottom`, `children`, `end` and `start`.

### Example: Basics

```svelte
<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<div aria-label="Chat with Ellen" role="log">
  <MessageList aria-label="Messages with Ellen">
    <Message author="Ellen" datetime="2026-10-08T14:02" time="14:02">
      {#snippet start()}
        <Avatar>EN</Avatar>
      {/snippet}
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    </Message>
    <Message author="Ellen" datetime="2026-10-08T14:03" time="14:03">
      {#snippet start()}
        <Avatar>EN</Avatar>
      {/snippet}
      <p>Flatwounds, right? So rad.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
      <p>Nope, not even the drummer. Bummer, but WE know.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
      <p>Can you send me the tab for your slap break?</p>
      {#snippet end()}Read{/snippet}
    </Message>
  </MessageList>
</div>
```

## Vue

`import { Message, MessageList, Reactions } from "opui-css/vue"`

- `Message` named slots: `actions`, `bottom`, `end` and `start`. Fill one with `<template #actions>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <div aria-label="Chat with Ellen" role="log">
    <MessageList aria-label="Messages with Ellen">
      <Message author="Ellen" datetime="2026-10-08T14:02" time="14:02">
        <template #start>
          <Avatar>EN</Avatar>
        </template>
        <p>Heyyy! Did your band notice you changed strings yet?</p>
      </Message>
      <Message author="Ellen" datetime="2026-10-08T14:03" time="14:03">
        <template #start>
          <Avatar>EN</Avatar>
        </template>
        <p>Flatwounds, right? So rad.</p>
      </Message>
      <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
        <p>Nope, not even the drummer. Bummer, but WE know.</p>
      </Message>
      <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
        <p>Can you send me the tab for your slap break?</p>
        <template #end>Read</template>
      </Message>
    </MessageList>
  </div>
</template>
```

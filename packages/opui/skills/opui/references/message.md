# Message

Chat bubbles that group by sender, with attachments, reactions and a typing indicator.

- CSS: `opui-css/css/components/message.css` and `opui-css/css/components/avatar.css`.
- Full docs with every example: [HTML](https://opui.dev/html/components/message.md), [Astro](https://opui.dev/astro/components/message.md), [React](https://opui.dev/react/components/message.md), [Svelte](https://opui.dev/svelte/components/message.md), [Vue](https://opui.dev/vue/components/message.md).

## MessageList

### Parts

- `ol.ui-message-list` (root): The conversation, an ordered list.
- `li.ui-message` (`Message`): A message. Consecutive messages on the same side group into a run.

### Props and modifiers

- `role`: `string`, default `"list"`. The `role` of the `<ol>`, such as `log` for a live conversation. `list` keeps Safari announcing a list.

### Slots

- `default`: The messages, and any other `li` between them, such as a date in `li.ui-divider`, which starts a new run.

### Notes

- Name the list with `aria-label`, such as the other person or the channel, so a screen reader knows which conversation it is.

## Message

### Parts

- `li.ui-message` (root): A message.
- `.ui-avatar` (slot `start`): The sender's `Avatar`, from the `start` slot, shown on the last message of a run.
- `.ui-content` (slot `default`): The bubble.
- `.ui-header` (prop `author`): The sender's name.
- `.ui-footer` (prop `datetime`, prop `time`): The time, and content such as a read receipt.
- `.ui-end` (slot `end`): Content after the time, such as a read receipt.
- `.ui-bottom` (slot `bottom`): Reactions in a `ToggleGroup`, drawn as separate pills over the bottom edge of the bubble.

### Props and modifiers

- `author`: `string`. The sender, shown on the first message of a run and read by screen readers on every message.
- `datetime`: `string`, `time[datetime]`. The machine-readable date and time of `time`.
- `newAuthor`: `boolean`, `.ui-new-author`. Starts a new run when the author changes, for a group chat.
- `outgoing`: `boolean`, `.ui-outgoing`. A message you sent. It aligns to the end in the primary color, and its author is visually hidden.
- `time`: `string`. The time as shown, at the end of the bubble.
- `typing`: `boolean`, `.ui-typing`. Shows animated dots instead of the content. The default slot becomes the status text for screen readers.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### message.css

- `--_avatar-size`: Size of the avatar next to the bubble. Defaults to `--ui-control-size-small`.
- `--_bg-color`: Background of the bubble. Defaults to `--ui-surface-tonal`, and `--ui-primary` with `.ui-outgoing`.
- `--_max-inline-size`: Widest bubble. Defaults to `36rem`, or 85% of the list when that is narrower.
- `--_motion`: Multiplies the typing animation. Defaults to `--ui-motion`, `0` under reduced motion.
- `--_radius`: Radius of the bubble corners. Defaults to `--ui-radius`, larger with `corner-shape: squircle`.
- `--_text-color`: Text color in the bubble. Defaults to `--ui-text-strong`, and `--ui-on-primary` with `.ui-outgoing`.
- `--_tight-radius`: Radius of the corners inside a run. Defaults to `--ui-radius-small`.

Outputs: `--_block-end-radius`, `--_block-start-radius`, `--_border-color`, `--_divider-gap`, `--_dot-image`, `--_font-size`, `--_selected-bg-color` and `--_size`.

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

The stylesheets read `--ui-border-color`, `--ui-border-width`, `--ui-button-size-x-small`, `--ui-contrast`, `--ui-control-size-small`, `--ui-focus-border-color`, `--ui-font-size-caption`, `--ui-font-weight-semibold`, `--ui-motion`, `--ui-on-primary`, `--ui-on-selected`, `--ui-primary`, `--ui-radius`, `--ui-radius-round`, `--ui-radius-small`, `--ui-selected`, `--ui-selected-strong`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-7`, `--ui-state-selected-alpha-accent`, `--ui-surface`, `--ui-surface-tonal`, `--ui-text-strong` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

```html
<div aria-label="Chat with Stella" role="log">
  <ol class="ui-message-list" role="list" aria-label="Messages with Stella">
    <li class="ui-message">
      <div class="ui-avatar" aria-hidden="true">SN</div>
      <div class="ui-content">
        <p class="ui-header">Stella</p>
        <p>Heyyy! Did your band notice you changed strings yet?</p>
        <p class="ui-footer">
          <time datetime="2026-10-08T14:02">14:02</time>
        </p>
      </div>
    </li>
    <li class="ui-message">
      <div class="ui-avatar" aria-hidden="true">SN</div>
      <div class="ui-content">
        <p class="ui-header">Stella</p>
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

`import { Message, MessageList } from "opui-css/astro"`

- `Message` named slots: `bottom`, `end` and `start`. Fill one with `slot="bottom"` on a child.

### Example: Basics

```astro
---
import { Avatar, Message, MessageList } from "opui-css/astro"
---

<div aria-label="Chat with Stella" role="log">
  <MessageList aria-label="Messages with Stella">
    <Message author="Stella" datetime="2026-10-08T14:02" time="14:02">
      <Avatar aria-hidden="true" slot="start">SN</Avatar>
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    </Message>
    <Message author="Stella" datetime="2026-10-08T14:03" time="14:03">
      <Avatar aria-hidden="true" slot="start">SN</Avatar>
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

## React

`import { Message, MessageList } from "opui-css/react"`

- `Message` slot props (`ReactNode`): `bottom`, `children`, `end` and `start`.

### Example: Basics

```tsx
import { Avatar, Message, MessageList } from "opui-css/react"

export default function Basics() {
  return (
    <div aria-label="Chat with Stella" role="log">
      <MessageList aria-label="Messages with Stella">
        <Message
          author="Stella"
          datetime="2026-10-08T14:02"
          start={<Avatar aria-hidden="true">SN</Avatar>}
          time="14:02"
        >
          <p>Heyyy! Did your band notice you changed strings yet?</p>
        </Message>
        <Message
          author="Stella"
          datetime="2026-10-08T14:03"
          start={<Avatar aria-hidden="true">SN</Avatar>}
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

`import { Message, MessageList } from "opui-css/svelte"`

- `Message` slot snippets: `bottom`, `children`, `end` and `start`.

### Example: Basics

```svelte
<script lang="ts">
  import { Avatar, Message, MessageList } from "opui-css/svelte"
</script>

<div aria-label="Chat with Stella" role="log">
  <MessageList aria-label="Messages with Stella">
    <Message author="Stella" datetime="2026-10-08T14:02" time="14:02">
      {#snippet start()}
        <Avatar aria-hidden="true">SN</Avatar>
      {/snippet}
      <p>Heyyy! Did your band notice you changed strings yet?</p>
    </Message>
    <Message author="Stella" datetime="2026-10-08T14:03" time="14:03">
      {#snippet start()}
        <Avatar aria-hidden="true">SN</Avatar>
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

`import { Message, MessageList } from "opui-css/vue"`

- `Message` named slots: `bottom`, `end` and `start`. Fill one with `<template #bottom>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Avatar, Message, MessageList } from "opui-css/vue"
</script>

<template>
  <div aria-label="Chat with Stella" role="log">
    <MessageList aria-label="Messages with Stella">
      <Message author="Stella" datetime="2026-10-08T14:02" time="14:02">
        <template #start>
          <Avatar aria-hidden="true">SN</Avatar>
        </template>
        <p>Heyyy! Did your band notice you changed strings yet?</p>
      </Message>
      <Message author="Stella" datetime="2026-10-08T14:03" time="14:03">
        <template #start>
          <Avatar aria-hidden="true">SN</Avatar>
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

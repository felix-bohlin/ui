# Message

Chat bubbles for a conversation. Consecutive messages from the same side group into a run, with tighter corners on the avatar side, the author on the first message and the [Avatar](https://open-props-ui.netlify.app/vue/components/avatar.md) on the last.

## Anatomy

1. SN

   Saga

   Here's the current draft:

   Pricing-proposal.pdf

   PDF · 2.4 MB

   14:31

   👍 Thumbs up, 1 other

- `<Message>`

  A message.

- `v-slot:avatar`

  The author's avatar, shown on the last message of a run.

- `v-slot:default`

  The bubble.

- `author`

  The author, shown on the first message of a run and read by screen readers on every message.

- `.ui-attachment`

  A file card inside the bubble.

- `v-slot:footer`

  The time, and content such as a read receipt.

- `reactions`

  The reaction pills, overlapping the bubble's bottom edge.

- `label.ui-reaction`

  A reaction pill: a checkbox in a `<label>`, or a `<button>` with `aria-pressed`. The count comes from `data-count`.

- `.ui-reaction-add`

  Opens the reaction picker. Shows on hover and focus on devices that can hover.

- `picker`

  A popover form of emoji buttons, anchored to its trigger.

## Basics

Put each `Message` in `Messages`. Set `outgoing` on the messages you sent.

Bubbles are at most 85% as wide as the thread. The author of an outgoing message is visually hidden, and still read by screen readers.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T14:02" time="14:02">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>Did you get a chance to look at the pricing proposal?</p>
    </Message>
    <Message author="Saga" datetime="2026-10-08T14:03" time="14:03">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>No rush, Friday is fine.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:18" outgoing time="14:18">
      <p>Yes, looks good. I'd lead with the annual plan.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T14:19" outgoing time="14:19">
      <p>Can you add the Bergen Bikes case study too?</p>
      <template #footer>· Read</template>
    </Message>
  </Messages>
</template>
```

## Group chat

CSS can't compare authors, so mark the first message after the author changes with `newAuthor`. Any other `li` between messages, such as a date divider, also breaks the run.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages in #design">
    <Message author="Leila" datetime="2026-10-08T09:12" time="09:12">
      <template #avatar>
        <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
      </template>
      <p>The new icons are ready.</p>
    </Message>
    <Message author="Leila" datetime="2026-10-08T09:13" time="09:13">
      <template #avatar>
        <Avatar aria-label="Leila Haddad" role="img">LH</Avatar>
      </template>
      <p>Can we review them today?</p>
    </Message>
    <Message author="Omar" datetime="2026-10-08T09:15" new-author time="09:15">
      <template #avatar>
        <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
      </template>
      <p>I'm free after lunch.</p>
    </Message>
    <Message author="Omar" datetime="2026-10-08T09:16" time="09:16">
      <template #avatar>
        <Avatar aria-label="Omar Saleh" role="img">OS</Avatar>
      </template>
      <p>I'll book a room.</p>
    </Message>
    <Message author="You" datetime="2026-10-08T09:20" outgoing time="09:20">
      <p>See you at one.</p>
    </Message>
  </Messages>
</template>
```

## Attachments

Put a `.ui-attachment` in the bubble for a file card with an icon, a link and details.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T14:31" time="14:31">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>Here's the current draft:</p>
      <div class="ui-attachment">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
          ></path>
        </svg>
        <div>
          <a class="ui-link" href="#pricing-proposal">Pricing-proposal.pdf</a>
          <p>PDF · 2.4 MB</p>
        </div>
      </div>
    </Message>
    <Message author="You" datetime="2026-10-08T14:40" outgoing time="14:40">
      <p>Thanks! Here's the signed contract.</p>
      <div class="ui-attachment">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z"
          ></path>
        </svg>
        <div>
          <a class="ui-link" href="#signed-contract">Contract-signed.pdf</a>
          <p>PDF · 860 kB</p>
        </div>
      </div>
    </Message>
  </Messages>
</template>
```

## Reactions

`reactions` renders a pill per reaction, a checkbox that toggles right away. `count` is the total from your server, and `mine` marks your own reaction.

CSS adds or removes your reaction from the count, in browsers with typed `attr()`. Other browsers show the server count until the page reloads. Count only the others in the label, such as "Thumbs up, 2 others": the checkbox state already says whether you reacted, so the label never goes stale.

`picker` adds a button that opens a popover form of emoji buttons. It shows on hover and focus, and always on touch screens.

Saving a toggle, adding a new emoji and removing a pill at zero are up to you: listen for `change` on the checkboxes and `submit` on the picker, where `event.submitter.value` is the emoji. In these examples a small script stands in for the server.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"

const picker = [
  { emoji: "👍", label: "Thumbs up", value: "+1" },
  { emoji: "❤️", label: "Heart", value: "heart" },
  { emoji: "😂", label: "Laughing", value: "joy" },
  { emoji: "🎉", label: "Party", value: "tada" },
  { emoji: "👀", label: "Eyes", value: "eyes" },
]
</script>

<template>
  <Messages label="Messages in #pricing">
    <Message
      author="Saga"
      datetime="2026-10-08T14:03"
      :picker="picker"
      :reactions="[
        {
          count: 3,
          emoji: '👍',
          label: 'Thumbs up, 2 others',
          mine: true,
          value: '+1',
        },
        {
          count: 1,
          emoji: '🙏',
          label: 'Folded hands, 1 other',
          value: 'pray',
        },
      ]"
      time="14:03"
    >
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>No rush, Friday is fine.</p>
    </Message>
    <Message
      author="You"
      datetime="2026-10-08T14:18"
      outgoing
      :picker="picker"
      :reactions="[
        { count: 3, emoji: '🎉', label: 'Party, 3 others', value: 'tada' },
        { count: 1, emoji: '❤️', label: 'Heart, 1 other', value: 'heart' },
      ]"
      time="14:18"
    >
      <p>Yes, looks good. I'd lead with the annual plan.</p>
    </Message>
  </Messages>
</template>
```

## Reactions without JavaScript

To save reactions without JavaScript, make each pill a submit `button.ui-reaction` with `aria-pressed`, in the picker's form. Give the form an `action` and `method="post"`, and render the page again with the new counts.

`Message` renders checkbox pills. Write this markup yourself for button pills.

```html
<ol aria-label="Messages in #design" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Leila Haddad" class="ui-avatar" role="img">LH</div>
    <div class="ui-bubble">
      <p class="ui-header">Leila</p>
      <p>Can we review the new icons today?</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:13">09:13</time></p>
    </div>
    <div aria-label="Reactions" class="ui-reactions" role="group">
      <button
        aria-pressed="true"
        class="ui-reaction"
        data-count="2"
        form="reactions-icons"
        name="reaction"
        type="submit"
        value="+1"
      >
        <span aria-hidden="true">👍</span>
        <span class="ui-sr-only">Thumbs up, 1 other</span>
      </button>
      <button
        aria-pressed="false"
        class="ui-reaction"
        data-count="1"
        form="reactions-icons"
        name="reaction"
        type="submit"
        value="eyes"
      >
        <span aria-hidden="true">👀</span>
        <span class="ui-sr-only">Eyes, 1 other</span>
      </button>
    </div>
    <button
      aria-label="Add reaction"
      class="ui-button ui-x-small ui-rounded ui-reaction-add"
      command="toggle-popover"
      commandfor="reactions-icons"
      type="button"
    >
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
        />
      </svg>
    </button>
    <form
      action="/messages/42/reactions"
      class="ui-reaction-picker"
      id="reactions-icons"
      method="post"
      popover
    >
      <button aria-label="Thumbs up" name="add" type="submit" value="+1">
        👍
      </button>
      <button aria-label="Heart" name="add" type="submit" value="heart">
        ❤️
      </button>
      <button aria-label="Laughing" name="add" type="submit" value="joy">
        😂
      </button>
      <button aria-label="Party" name="add" type="submit" value="tada">
        🎉
      </button>
      <button aria-label="Eyes" name="add" type="submit" value="eyes">
        👀
      </button>
    </form>
  </li>
</ol>
```

## Typing indicator

`typing` shows animated dots in the bubble. The default slot is the status text for screen readers.

The dots hold still when motion is off.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"
</script>

<template>
  <Messages label="Messages with Saga">
    <Message author="Saga" datetime="2026-10-08T14:32" time="14:32">
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      <p>Let me check with the team.</p>
    </Message>
    <Message typing>
      <template #avatar>
        <Avatar aria-label="Saga Nyström" role="img">SN</Avatar>
      </template>
      Saga is typing…
    </Message>
  </Messages>
</template>
```

## Right to left

Sides, corners and reactions follow `dir`. Translate the labels with `label`, `pickerLabel` and `reactionsLabel`.

```vue
<script setup lang="ts">
import { Avatar, Message, Messages } from "opui-css/vue"

const picker = [
  { emoji: "👍", label: "إعجاب", value: "+1" },
  { emoji: "❤️", label: "قلب", value: "heart" },
  { emoji: "😂", label: "ضحك", value: "joy" },
  { emoji: "🎉", label: "احتفال", value: "tada" },
  { emoji: "👀", label: "عيون", value: "eyes" },
]
</script>

<template>
  <Messages dir="rtl" label="رسائل فريق التصميم" lang="ar">
    <Message author="ليلى" datetime="2026-10-08T09:12" time="09:12">
      <template #avatar>
        <Avatar aria-label="ليلى" role="img">لي</Avatar>
      </template>
      <p>الأيقونات الجديدة جاهزة.</p>
    </Message>
    <Message
      author="ليلى"
      datetime="2026-10-08T09:13"
      :picker="picker"
      picker-label="إضافة تفاعل"
      :reactions="[
        {
          count: 2,
          emoji: '👍',
          label: 'إعجاب، شخص آخر',
          mine: true,
          value: '+1',
        },
      ]"
      reactions-label="التفاعلات"
      time="09:13"
    >
      <template #avatar>
        <Avatar aria-label="ليلى" role="img">لي</Avatar>
      </template>
      <p>هل نراجعها اليوم؟</p>
    </Message>
    <Message author="أنت" datetime="2026-10-08T09:20" outgoing time="09:20">
      <p>نعم، بعد الظهر.</p>
    </Message>
  </Messages>
</template>
```

## Accessibility

The thread is an ordered list with an accessible name, so screen readers announce the number of messages and each position. Follow-up messages keep their author visually hidden, so every message says who wrote it. Only the avatar on the last message of a run is announced.

The typing bubble is a `role="status"` region inside its list item. Some screen readers skip a live region that is added with its text already in it: add the row first, then set the text.

Reaction pills are checkboxes or toggle buttons with a label, and the count drawn by CSS is hidden from screen readers. The picker is a popover: `Tab` moves into it from the add button, and `Esc` closes it.

In forced colors mode bubbles get a border, and your reactions are filled with `SelectedItem`.

### Browser support

Without `:has()`, messages don't group and your reaction isn't highlighted. Without anchor positioning, the picker opens in the middle of the screen.

## API

### Messages API

| Prop    | Type     | Default | Description                    |
| ------- | -------- | ------- | ------------------------------ |
| `label` | `string` | -       | Accessible name of the thread. |

#### Slots

| Slot      | Description   |
| --------- | ------------- |
| `default` | The messages. |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-width`         | `1px`                                                                                 | Default border width for components that draw a border.                                                                                                                                                      |
| `--control-size-small`   | `calc(32px * var(--density))`                                                         | Shared small height for fields and buttons.                                                                                                                                                                  |
| `--duration`             | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                 | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--ease-enter`           | `var(--ease-out-3)`                                                                   | Easing for elements entering the screen.                                                                                                                                                                     |
| `--focus-ring-color`     | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`    | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`     | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`     | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-semibold` | `var(--font-weight-6)`                                                                | Font weight for labels, table headers and titles.                                                                                                                                                            |
| `--icon-size`            | `var(--size-4)`                                                                       | Default icon size inside components.                                                                                                                                                                         |
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-elevated`     | `light-dark(var(--gray-1), var(--gray-12))`                                           | Background of elevated cards and accordions.                                                                                                                                                                 |
| `--surface-tonal`        | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Message API

| Prop             | Type         | Default          | Description                                                                                   |
| ---------------- | ------------ | ---------------- | --------------------------------------------------------------------------------------------- |
| `author`         | `string`     | -                | The author, shown on the first message of a run and read by screen readers on every message.  |
| `datetime`       | `string`     | -                | Machine-readable date and time of the message.                                                |
| `newAuthor`      | `boolean`    | `false`          | Starts a new run when the author changes, for group chats.                                    |
| `outgoing`       | `boolean`    | `false`          | A message you sent. Aligns to the end, in the primary color, with the author visually hidden. |
| `picker`         | `Emoji[]`    | -                | A popover form of emoji buttons, anchored to its trigger.                                     |
| `pickerLabel`    | `string`     | `"Add reaction"` | The accessible name of the add reaction button.                                               |
| `reactions`      | `Reaction[]` | -                | The reaction pills, overlapping the bubble's bottom edge.                                     |
| `reactionsLabel` | `string`     | `"Reactions"`    | The accessible name of the reactions group.                                                   |
| `time`           | `string`     | -                | The time, and content such as a read receipt.                                                 |
| `typing`         | `boolean`    | `false`          | Shows animated dots. The default slot becomes the status text for screen readers.             |

#### Slots

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| `avatar`  | The author's avatar, shown on the last message of a run. |
| `default` | The bubble.                                              |
| `footer`  | The time, and content such as a read receipt.            |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-width`         | `1px`                                                                                 | Default border width for components that draw a border.                                                                                                                                                      |
| `--control-size-small`   | `calc(32px * var(--density))`                                                         | Shared small height for fields and buttons.                                                                                                                                                                  |
| `--duration`             | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                 | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--ease-enter`           | `var(--ease-out-3)`                                                                   | Easing for elements entering the screen.                                                                                                                                                                     |
| `--focus-ring-color`     | Unset                                                                                 | Color of the keyboard focus ring. When unset, the ring uses the page background color inverted.                                                                                                              |
| `--focus-ring-offset`    | `2px`                                                                                 | Distance between a control and its focus ring.                                                                                                                                                               |
| `--focus-ring-style`     | `solid`                                                                               | Outline style of the focus ring.                                                                                                                                                                             |
| `--focus-ring-width`     | `2px`                                                                                 | Width of the focus ring.                                                                                                                                                                                     |
| `--font-weight-semibold` | `var(--font-weight-6)`                                                                | Font weight for labels, table headers and titles.                                                                                                                                                            |
| `--icon-size`            | `var(--size-4)`                                                                       | Default icon size inside components.                                                                                                                                                                         |
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/vue/guide/theming.md#motion).      |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-elevated`     | `light-dark(var(--gray-1), var(--gray-12))`                                           | Background of elevated cards and accordions.                                                                                                                                                                 |
| `--surface-tonal`        | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

`reactions` take `{ count, emoji, label, mine, value }` and `picker` takes `{ emoji, label, value }`. `value` defaults to the emoji. The picker form fires a `submit` event with the emoji button as `submitter`, and the reactions fire `change`. Both bubble to the `<li>`.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: corner-shape.
- Safari: Partial support Missing: corner-shape.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Message.md).

## Installation

Import the components from `opui-css/vue`:

### Dependencies

- [Avatar](https://open-props-ui.netlify.app/vue/components/avatar.md)
- [Button](https://open-props-ui.netlify.app/vue/components/button.md)

- `opui-css/css/components/message.css`
- `opui-css/css/components/avatar.css`
- `opui-css/css/components/button.css`

## See also

- [Avatar](https://open-props-ui.netlify.app/vue/components/avatar.md)
- [Menu](https://open-props-ui.netlify.app/vue/components/menu.md)

## Changelog

### What's new

- New component. [Chat bubbles](#basics) that group by sender, with [attachments](#attachments), [reactions](#reactions) and a [typing indicator](#typing).

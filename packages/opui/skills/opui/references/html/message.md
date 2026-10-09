# Message

Chat bubbles for a conversation. Consecutive messages from the same side group into a run, with tighter corners on the avatar side, the author on the first message and the [Avatar](https://open-props-ui.netlify.app/html/components/avatar.md) on the last.

## Anatomy

1. SN

   Saga

   Here's the current draft:

   Pricing-proposal.pdf

   PDF · 2.4 MB

   14:31

   👍 Thumbs up, 1 other

- `li.ui-message`

  A message.

- `.ui-avatar`

  The author's avatar, shown on the last message of a run.

- `.ui-bubble`

  The bubble.

- `.ui-header`

  The author, shown on the first message of a run and read by screen readers on every message.

- `.ui-attachment`

  A file card inside the bubble.

- `.ui-footer`

  The time, and content such as a read receipt.

- `.ui-reactions`

  The reaction pills, overlapping the bubble's bottom edge.

- `label.ui-reaction`

  A reaction pill: a checkbox in a `<label>`, or a `<button>` with `aria-pressed`. The count comes from `data-count`.

- `.ui-reaction-add`

  Opens the reaction picker. Shows on hover and focus on devices that can hover.

- `form.ui-reaction-picker[popover]`

  A popover form of emoji buttons, anchored to its trigger.

## Basics

Each message is an `li.ui-message` in an `ol.ui-messages`. Add `.ui-outgoing` to the messages you sent.

Bubbles are at most 85% as wide as the thread. The author of an outgoing message is visually hidden, and still read by screen readers.

```html
<ol aria-label="Messages with Saga" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble">
      <p class="ui-header">Saga</p>
      <p>Did you get a chance to look at the pricing proposal?</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:02">14:02</time></p>
    </div>
  </li>
  <li class="ui-message">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble">
      <p class="ui-header">Saga</p>
      <p>No rush, Friday is fine.</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:03">14:03</time></p>
    </div>
  </li>
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">You</p>
      <p>Yes, looks good. I'd lead with the annual plan.</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:18">14:18</time></p>
    </div>
  </li>
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">You</p>
      <p>Can you add the Bergen Bikes case study too?</p>
      <p class="ui-footer">
        <time datetime="2026-10-08T14:19">14:19</time> · Read
      </p>
    </div>
  </li>
</ol>
```

## Group chat

CSS can't compare authors, so mark the first message after the author changes with `.ui-new-author`. Any other `li` between messages, such as a date divider, also breaks the run.

```html
<ol aria-label="Messages in #design" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Leila Haddad" class="ui-avatar" role="img">LH</div>
    <div class="ui-bubble">
      <p class="ui-header">Leila</p>
      <p>The new icons are ready.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:12">09:12</time></p>
    </div>
  </li>
  <li class="ui-message">
    <div aria-label="Leila Haddad" class="ui-avatar" role="img">LH</div>
    <div class="ui-bubble">
      <p class="ui-header">Leila</p>
      <p>Can we review them today?</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:13">09:13</time></p>
    </div>
  </li>
  <li class="ui-message ui-new-author">
    <div aria-label="Omar Saleh" class="ui-avatar" role="img">OS</div>
    <div class="ui-bubble">
      <p class="ui-header">Omar</p>
      <p>I'm free after lunch.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:15">09:15</time></p>
    </div>
  </li>
  <li class="ui-message">
    <div aria-label="Omar Saleh" class="ui-avatar" role="img">OS</div>
    <div class="ui-bubble">
      <p class="ui-header">Omar</p>
      <p>I'll book a room.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:16">09:16</time></p>
    </div>
  </li>
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">You</p>
      <p>See you at one.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:20">09:20</time></p>
    </div>
  </li>
</ol>
```

## Attachments

Put a `.ui-attachment` in the bubble for a file card with an icon, a link and details.

```html
<ol aria-label="Messages with Saga" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble">
      <p class="ui-header">Saga</p>
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
      <p class="ui-footer"><time datetime="2026-10-08T14:31">14:31</time></p>
    </div>
  </li>
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">You</p>
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
      <p class="ui-footer"><time datetime="2026-10-08T14:40">14:40</time></p>
    </div>
  </li>
</ol>
```

## Reactions

Each pill is a checkbox in a `label.ui-reaction`, so it toggles right away. `data-count` is the total from your server, and `checked` marks your own reaction.

CSS adds or removes your reaction from the count, in browsers with typed `attr()`. Other browsers show the server count until the page reloads. Count only the others in the label, such as "Thumbs up, 2 others": the checkbox state already says whether you reacted, so the label never goes stale.

The add button opens a popover form of emoji buttons with `command="toggle-popover"`. It shows on hover and focus, and always on touch screens. Give the checkboxes the form's `id` in `form`, so one form holds every reaction of the message.

Saving a toggle, adding a new emoji and removing a pill at zero are up to you: listen for `change` on the checkboxes and `submit` on the picker, where `event.submitter.value` is the emoji. In these examples a small script stands in for the server.

```html
<ol aria-label="Messages in #pricing" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble">
      <p class="ui-header">Saga</p>
      <p>No rush, Friday is fine.</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:03">14:03</time></p>
    </div>
    <div aria-label="Reactions" class="ui-reactions" role="group">
      <label class="ui-reaction" data-count="3">
        <input
          checked
          class="ui-sr-only"
          form="reactions-friday"
          name="reaction"
          type="checkbox"
          value="+1"
        />
        <span aria-hidden="true">👍</span>
        <span class="ui-sr-only">Thumbs up, 2 others</span>
      </label>
      <label class="ui-reaction" data-count="1">
        <input
          class="ui-sr-only"
          form="reactions-friday"
          name="reaction"
          type="checkbox"
          value="pray"
        />
        <span aria-hidden="true">🙏</span>
        <span class="ui-sr-only">Folded hands, 1 other</span>
      </label>
    </div>
    <button
      aria-label="Add reaction"
      class="ui-button ui-x-small ui-rounded ui-reaction-add"
      command="toggle-popover"
      commandfor="reactions-friday"
      type="button"
    >
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
        />
      </svg>
    </button>
    <form class="ui-reaction-picker" id="reactions-friday" popover>
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
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">You</p>
      <p>Yes, looks good. I'd lead with the annual plan.</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:18">14:18</time></p>
    </div>
    <div aria-label="Reactions" class="ui-reactions" role="group">
      <label class="ui-reaction" data-count="3">
        <input
          class="ui-sr-only"
          form="reactions-annual"
          name="reaction"
          type="checkbox"
          value="tada"
        />
        <span aria-hidden="true">🎉</span>
        <span class="ui-sr-only">Party, 3 others</span>
      </label>
      <label class="ui-reaction" data-count="1">
        <input
          class="ui-sr-only"
          form="reactions-annual"
          name="reaction"
          type="checkbox"
          value="heart"
        />
        <span aria-hidden="true">❤️</span>
        <span class="ui-sr-only">Heart, 1 other</span>
      </label>
    </div>
    <button
      aria-label="Add reaction"
      class="ui-button ui-x-small ui-rounded ui-reaction-add"
      command="toggle-popover"
      commandfor="reactions-annual"
      type="button"
    >
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
        />
      </svg>
    </button>
    <form class="ui-reaction-picker" id="reactions-annual" popover>
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

## Reactions without JavaScript

To save reactions without JavaScript, make each pill a submit `button.ui-reaction` with `aria-pressed`, in the picker's form. Give the form an `action` and `method="post"`, and render the page again with the new counts.

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

`.ui-typing` shows animated dots in the bubble. Give the bubble `role="status"` and visually hidden text.

The dots hold still when motion is off.

```html
<ol aria-label="Messages with Saga" class="ui-messages">
  <li class="ui-message">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble">
      <p class="ui-header">Saga</p>
      <p>Let me check with the team.</p>
      <p class="ui-footer"><time datetime="2026-10-08T14:32">14:32</time></p>
    </div>
  </li>
  <li class="ui-message ui-typing">
    <div aria-label="Saga Nyström" class="ui-avatar" role="img">SN</div>
    <div class="ui-bubble" role="status">
      <span class="ui-sr-only">Saga is typing…</span>
    </div>
  </li>
</ol>
```

## Right to left

Sides, corners and reactions follow `dir`. Translate the labels with `aria-label`.

```html
<ol aria-label="رسائل فريق التصميم" class="ui-messages" dir="rtl" lang="ar">
  <li class="ui-message">
    <div aria-label="ليلى" class="ui-avatar" role="img">لي</div>
    <div class="ui-bubble">
      <p class="ui-header">ليلى</p>
      <p>الأيقونات الجديدة جاهزة.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:12">09:12</time></p>
    </div>
  </li>
  <li class="ui-message">
    <div aria-label="ليلى" class="ui-avatar" role="img">لي</div>
    <div class="ui-bubble">
      <p class="ui-header">ليلى</p>
      <p>هل نراجعها اليوم؟</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:13">09:13</time></p>
    </div>
    <div aria-label="التفاعلات" class="ui-reactions" role="group">
      <label class="ui-reaction" data-count="2">
        <input
          checked
          class="ui-sr-only"
          form="reactions-review"
          name="reaction"
          type="checkbox"
          value="+1"
        />
        <span aria-hidden="true">👍</span>
        <span class="ui-sr-only">إعجاب، شخص آخر</span>
      </label>
    </div>
    <button
      aria-label="إضافة تفاعل"
      class="ui-button ui-x-small ui-rounded ui-reaction-add"
      command="toggle-popover"
      commandfor="reactions-review"
      type="button"
    >
      <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8zm-3.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M7 14a5.5 5.5 0 0 0 10 0zM19 1v3h-3v2h3v3h2V6h3V4h-3V1z"
        />
      </svg>
    </button>
    <form class="ui-reaction-picker" id="reactions-review" popover>
      <button aria-label="إعجاب" name="add" type="submit" value="+1">👍</button>
      <button aria-label="قلب" name="add" type="submit" value="heart">
        ❤️
      </button>
      <button aria-label="ضحك" name="add" type="submit" value="joy">😂</button>
      <button aria-label="احتفال" name="add" type="submit" value="tada">
        🎉
      </button>
      <button aria-label="عيون" name="add" type="submit" value="eyes">
        👀
      </button>
    </form>
  </li>
  <li class="ui-message ui-outgoing">
    <div class="ui-bubble">
      <p class="ui-header">أنت</p>
      <p>نعم، بعد الظهر.</p>
      <p class="ui-footer"><time datetime="2026-10-08T09:20">09:20</time></p>
    </div>
  </li>
</ol>
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

| Type  | Modifiers      | Default | Description                    |
| ----- | -------------- | ------- | ------------------------------ |
| Label | `[aria-label]` | -       | Accessible name of the thread. |

#### Parts

| Part             | Description                                   |
| ---------------- | --------------------------------------------- |
| `ol.ui-messages` | The thread. Caps bubbles at 85% of its width. |
| `<li>`           | A message.                                    |

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
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-elevated`     | `light-dark(var(--gray-1), var(--gray-12))`                                           | Background of elevated cards and accordions.                                                                                                                                                                 |
| `--surface-tonal`        | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Message API

| Type               | Modifiers                      | Default | Description                                                                                   |
| ------------------ | ------------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| Add reaction label | `.ui-reaction-add[aria-label]` | -       | The accessible name of the add reaction button.                                               |
| New author         | `.ui-new-author`               | -       | Starts a new run when the author changes, for group chats.                                    |
| Outgoing           | `.ui-outgoing`                 | -       | A message you sent. Aligns to the end, in the primary color, with the author visually hidden. |
| Reactions label    | `.ui-reactions[aria-label]`    | -       | The accessible name of the reactions group.                                                   |
| Time               | `time[datetime]`               | -       | Machine-readable date and time of the message.                                                |
| Typing             | `.ui-typing`                   | -       | Shows animated dots in the bubble. Give the bubble `role="status"` and visually hidden text.  |

#### Parts

| Part                               | Description                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `li.ui-message`                    | A message.                                                                                                          |
| `.ui-avatar`                       | The author's avatar, shown on the last message of a run.                                                            |
| `.ui-bubble`                       | The bubble.                                                                                                         |
| `.ui-header`                       | The author, shown on the first message of a run and read by screen readers on every message.                        |
| `.ui-attachment`                   | A file card inside the bubble.                                                                                      |
| `.ui-footer`                       | The time, and content such as a read receipt.                                                                       |
| `.ui-reactions`                    | The reaction pills, overlapping the bubble's bottom edge.                                                           |
| `label.ui-reaction`                | A reaction pill: a checkbox in a `<label>`, or a `<button>` with `aria-pressed`. The count comes from `data-count`. |
| `.ui-reaction-add`                 | Opens the reaction picker. Shows on hover and focus on devices that can hover.                                      |
| `form.ui-reaction-picker[popover]` | A popover form of emoji buttons, anchored to its trigger.                                                           |

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
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`      | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--surface-elevated`     | `light-dark(var(--gray-1), var(--gray-12))`                                           | Background of elevated cards and accordions.                                                                                                                                                                 |
| `--surface-tonal`        | `light-dark(var(--gray-3), var(--gray-12))`                                           | Background of tonal variants.                                                                                                                                                                                |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

The root is an `<li>` inside `.ui-messages`. Consecutive messages on the same side group into a run, until `.ui-new-author` or a different side.

## Browser support

- Chromium: Full support Supported since v144.
- Firefox: Partial support Missing: corner-shape.
- Safari: Partial support Missing: corner-shape.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Message.md).

## Installation

### Dependencies

- [Avatar](https://open-props-ui.netlify.app/html/components/avatar.md)
- [Button](https://open-props-ui.netlify.app/html/components/button.md)

- `opui-css/css/components/message.css`
- `opui-css/css/components/avatar.css`
- `opui-css/css/components/button.css`

## See also

- [Avatar](https://open-props-ui.netlify.app/html/components/avatar.md)
- [Menu](https://open-props-ui.netlify.app/html/components/menu.md)

## Changelog

### What's new

- New component. [Chat bubbles](#basics) that group by sender, with [attachments](#attachments), [reactions](#reactions) and a [typing indicator](#typing).

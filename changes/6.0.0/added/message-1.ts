import type { Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Message` component (`li.ui-message` in `ol.ui-message-list`) in Astro, React, Svelte and Vue: chat bubbles that group consecutive messages on the same side into a run with `:has()`, with tighter corners inside the run, the author on its first message and the avatar on its last. `Message` takes `author`, `time` with `datetime`, `outgoing` (`.ui-outgoing`), `newAuthor` (`.ui-new-author`) and `typing` (`.ui-typing`, animated dots over status text), and `start`, `end` and `bottom` slots for the avatar, a read receipt and the reactions, a `ToggleGroup` drawn as separate pills over the bottom edge of the bubble, a checked one filled with `--ui-selected`, or a primary tint, inside a `--ui-selected-strong` border. `MessageList` is the list, with `role=\"list\"` so Safari keeps announcing it as one, or a passed `role` such as `log`, and spaces a date `li.ui-divider` between messages with `--ui-space-2`. `direct` (`.ui-direct`) on it is for a chat between two people: no message shows its author's name or avatar, and screen readers still hear the name. In print, `print-color-adjust: exact` keeps the bubble fills, so an outgoing message's text never prints pale on white paper.",
  notes: {
    message: `A chat between two people can leave out every name and avatar with <a href="#direct"><code>direct</code></a>.`,
  },
} satisfies Change

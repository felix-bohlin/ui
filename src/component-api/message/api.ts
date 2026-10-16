import type { ComponentApi } from "../types"

export default {
  component: "Message",
  notes: {
    astro:
      "`reactions` take `{ count, emoji, label, mine, value }` and `picker` takes `{ emoji, label, value }`. `value` defaults to the emoji. The picker form fires a `submit` event with the emoji button as `submitter`, and the reactions fire `change`.",
    html: "The root is an `<li>` inside `.ui-messages`. Consecutive messages on the same side group into a run, until `.ui-new-author` or a different side.",
    svelte:
      "`reactions` take `{ count, emoji, label, mine, value }` and `picker` takes `{ emoji, label, value }`. `value` defaults to the emoji. The picker form fires a `submit` event with the emoji button as `submitter`, and the reactions fire `change`. Both bubble to the `<li>`.",
    vue: "`reactions` take `{ count, emoji, label, mine, value }` and `picker` takes `{ emoji, label, value }`. `value` defaults to the emoji. The picker form fires a `submit` event with the emoji button as `submitter`, and the reactions fire `change`. Both bubble to the `<li>`.",
  },
  options: [
    {
      attribute: "[datetime]",
      description: "Machine-readable date and time of the message.",
      group: "Time",
      part: "time",
      prop: "datetime",
    },
    {
      class: ".ui-new-author",
      default: "false",
      description: "Starts a new run when the author changes, for group chats.",
      group: "New author",
      prop: "newAuthor",
    },
    {
      class: ".ui-outgoing",
      default: "false",
      description:
        "A message you sent. Aligns to the end, in the primary color, with the author visually hidden.",
      group: "Outgoing",
      prop: "outgoing",
    },
    {
      attribute: "[aria-label]",
      default: '"Add reaction"',
      description: "The accessible name of the add reaction button.",
      group: "Add reaction label",
      part: ".ui-reaction-add",
      prop: "pickerLabel",
    },
    {
      attribute: "[aria-label]",
      default: '"Reactions"',
      description: "The accessible name of the reactions group.",
      group: "Reactions label",
      part: ".ui-reactions",
      prop: "reactionsLabel",
    },
    {
      class: ".ui-typing",
      default: "false",
      description:
        "Shows animated dots. The default slot becomes the status text for screen readers.",
      group: "Typing",
      htmlDescription:
        'Shows animated dots in the bubble. Give the bubble `role="status"` and visually hidden text.',
      prop: "typing",
    },
  ],
  parts: [
    {
      description: "The author's avatar, shown on the last message of a run.",
      selector: ".ui-avatar",
      slots: ["avatar"],
    },
    {
      description: "The bubble.",
      selector: ".ui-bubble",
      slots: ["default"],
    },
    {
      description:
        "The author, shown on the first message of a run and read by screen readers on every message.",
      props: ["author"],
      selector: ".ui-header",
    },
    {
      description: "A file card inside the bubble.",
      selector: ".ui-attachment",
    },
    {
      description: "The time, and content such as a read receipt.",
      props: ["time"],
      selector: ".ui-footer",
      slots: ["footer"],
    },
    {
      description: "The reaction pills, overlapping the bubble's bottom edge.",
      props: ["reactions"],
      selector: ".ui-reactions",
    },
    {
      code: "label.ui-reaction",
      description:
        "A reaction pill: a checkbox in a `<label>`, or a `<button>` with `aria-pressed`. The count comes from `data-count`.",
      selector: ".ui-reaction",
    },
    {
      description:
        "Opens the reaction picker. Shows on hover and focus on devices that can hover.",
      selector: ".ui-reaction-add",
    },
    {
      code: "form.ui-reaction-picker[popover]",
      description: "A popover form of emoji buttons, anchored to its trigger.",
      props: ["picker"],
      selector: ".ui-reaction-picker",
    },
  ],
  root: {
    code: "li.ui-message",
    description: "A message.",
    selector: "li.ui-message",
  },
  source: "Message",
} satisfies ComponentApi

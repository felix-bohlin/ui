import type { ComponentApi } from "../types"

export default {
  component: "Message",
  keyboard: [
    {
      description:
        "Moves to the buttons in the actions, such as the add reaction button, and then to the reactions. On a device that can hover, the actions show while focus is in the message. An open picker comes right after its button, and from its last emoji focus moves on while it stays open.",
      keys: ["Tab"],
    },
    {
      description:
        "On the add reaction button, opens or closes the picker. On an emoji, picks it, closes the picker and returns focus to the button.",
      keys: ["Enter"],
    },
    {
      description:
        "Checks or unchecks the focused reaction. On a button, works like Enter.",
      keys: ["Space"],
    },
    {
      description:
        "Closes the picker and returns focus to the add reaction button.",
      keys: ["Esc"],
    },
  ],
  options: [
    {
      description:
        "The sender, shown on the first message of a run and read by screen readers on every message.",
      group: "Author",
      part: ".ui-header",
      prop: "author",
    },
    {
      attribute: "[datetime]",
      description: "The machine-readable date and time of `time`.",
      group: "Datetime",
      part: "time",
      prop: "datetime",
    },
    {
      class: ".ui-new-author",
      default: "false",
      description:
        "Starts a new run when the author changes, for a group chat.",
      group: "New author",
      prop: "newAuthor",
    },
    {
      class: ".ui-outgoing",
      default: "false",
      description:
        "A message you sent. It aligns to the end in the primary color, and its author is visually hidden.",
      group: "Outgoing",
      prop: "outgoing",
    },
    {
      description: "The time as shown, at the end of the bubble.",
      group: "Time",
      part: "time",
      prop: "time",
    },
    {
      class: ".ui-typing",
      default: "false",
      description:
        "Shows animated dots instead of the content. The default slot becomes the status text for screen readers.",
      group: "Typing",
      htmlDescription:
        'Shows animated dots in the bubble. Give the bubble `role="status"` and visually hidden text.',
      prop: "typing",
    },
  ],
  page: "message",
  parts: [
    {
      description:
        "The sender's `Avatar`, from the `start` slot, shown on the last message of a run.",
      selector: ".ui-avatar",
      slots: ["start"],
    },
    {
      description: "The bubble.",
      selector: ".ui-content",
      slots: ["default"],
    },
    {
      description: "The sender's name.",
      props: ["author"],
      selector: ".ui-header",
    },
    {
      description: "The time, and content such as a read receipt.",
      props: ["datetime", "time"],
      selector: ".ui-footer",
    },
    {
      description: "Content after the time, such as a read receipt.",
      selector: ".ui-end",
      slots: ["end"],
    },
    {
      description:
        "Buttons beside the bubble, such as a round `Button` that opens a horizontal `Menu` of emoji. On a device that can hover, they show while the message is hovered, holds focus or has a popover open.",
      selector: ".ui-actions",
      slots: ["actions"],
    },
    {
      description:
        "Reactions in a `ToggleGroup`, drawn as separate pills over the bottom edge of the bubble.",
      selector: ".ui-bottom",
      slots: ["bottom"],
    },
  ],
  root: {
    description: "A message.",
    selector: "li.ui-message",
  },
  source: "Message",
} satisfies ComponentApi

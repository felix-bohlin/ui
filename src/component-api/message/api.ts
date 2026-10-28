import type { ComponentApi } from "../types"

export default {
  component: "Message",
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
      description: "A row under the bubble, for reactions in a `ToggleGroup`.",
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

import type { ComponentApi } from "../types"

export default {
  component: "Messages",
  notes: {
    default:
      "Name the list with `aria-label`, such as the other person or the channel, so a screen reader knows which conversation it is.",
  },
  options: [],
  page: "message",
  parts: [
    {
      code: "li.ui-message",
      component: "Message",
      description:
        "A message. Consecutive messages on the same side group into a run.",
      selector: "li.ui-message",
    },
  ],
  root: {
    description: "The conversation, an ordered list.",
    selector: "ol.ui-messages",
  },
  slots: [
    {
      description:
        "The messages, and any other `li` between them, such as a date `Divider`, which starts a new run.",
      name: "default",
    },
  ],
  source: "Message",
} satisfies ComponentApi

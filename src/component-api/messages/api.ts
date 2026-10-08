import type { ComponentApi } from "../types"

export default {
  component: "Messages",
  options: [
    {
      attribute: "[aria-label]",
      description: "Accessible name of the thread.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "message",
  parts: [
    {
      code: "<li>",
      component: { astro: "Message", svelte: "Message", vue: "Message" },
      description: "A message.",
      selector: ".ui-messages > .ui-message",
    },
  ],
  root: {
    code: "ol.ui-messages",
    description: "The thread. Caps bubbles at 85% of its width.",
    selector: "ol.ui-messages",
  },
  slots: [
    {
      description: "The messages.",
      name: "default",
    },
  ],
  source: "Message",
} satisfies ComponentApi

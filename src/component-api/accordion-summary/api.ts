import type { ComponentApi } from "../types"

export default {
  component: "AccordionSummary",
  file: "AccordionSummary",
  options: [],
  page: "accordion",
  parts: [
    {
      code: '<svg class="ui-marker">',
      description:
        "The marker. Renders a chevron by default. Only `.ui-marker` animates.",
      selector: ".ui-marker",
      slots: ["marker"],
    },
  ],
  root: {
    code: "<summary>",
    component: {
      astro: "AccordionSummary",
      react: "AccordionSummary",
      svelte: "AccordionSummary",
      vue: "AccordionSummary",
    },
    description: "The always visible header.",
    selector: "summary",
  },
  slots: [
    {
      description: "The summary text.",
      name: "default",
    },
  ],
  source: "Accordion",
} satisfies ComponentApi

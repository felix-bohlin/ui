import type { ComponentApi } from "../types"

export default {
  component: "DialogActions",
  options: [
    {
      default: '"end"',
      description: "Alignment for the actions.",
      group: "Alignment",
      prop: "align",
      values: { end: null, start: ".ui-align-start" },
    },
  ],
  page: "dialog",
  parts: [],
  root: {
    component: {
      astro: "DialogActions",
      react: "DialogActions",
      svelte: "DialogActions",
      vue: "DialogActions",
    },
    description: "A group of actions, such as buttons.",
    selector: ".ui-actions",
  },
  slots: [
    {
      description: "The actions, such as buttons.",
      name: "default",
    },
  ],
  source: "Dialog",
} satisfies ComponentApi

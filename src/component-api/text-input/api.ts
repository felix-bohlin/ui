import type { ComponentApi } from "../types"

export default {
  component: "Text input",
  css: ["text-input"],
  notes: {
    astro:
      "CSS-only. Styles the `<input>` inside `.ui-text-field`; the Text field component sets these with its `autoFit`, `filled` and `size` props.",
    svelte:
      "CSS-only. Styles the `<input>` inside `.ui-text-field`; the Text field component sets these with its `autoFit`, `filled` and `size` props.",
    vue: "CSS-only. Styles the `<input>` inside `.ui-text-field`; the Text field component sets these with its `autoFit`, `filled` and `size` props.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      description:
        "When enabled, the element changes size depending on its content.",
      group: "Auto-fit",
      prop: "autoFit",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: { small: ".ui-small" },
    },
    {
      default: '"default"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { default: null, filled: ".ui-filled" },
    },
  ],
  parts: [
    {
      description:
        "Wraps the `<input>`. Border, background, and focus styling are inherited from `.ui-field`, not the input itself.",
      selector: ".ui-field",
    },
  ],
  root: {
    description: 'The input, wrapped in a `<span class="ui-field">`.',
    selector: ".ui-text-field input",
  },
} satisfies ComponentApi

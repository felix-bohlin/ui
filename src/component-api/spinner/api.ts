import type { ComponentApi } from "../types"

export default {
  component: "Spinner",
  css: ["spinner"],
  notes: {
    astro:
      "Set `aria-busy` on any element to show a spinner. There is no Astro component.",
    html: "These never show a spinner: `<html>`, `<input>`, `<progress>`, `<select>` and `<textarea>`. Neither do elements with `aria-describedby`, except buttons and links.",
    svelte:
      "Set `aria-busy` on any element to show a spinner. There is no Svelte component.",
    vue: "Set `aria-busy` on any element to show a spinner. There is no Vue component.",
  },
  options: [
    {
      cssVar: "font-size",
      default: "1em",
      description: "Spinner size follows the element's computed font size.",
      group: "Sizes",
      prop: "font-size",
    },
  ],
  parts: [],
  root: {
    description:
      "Renders a spinner pseudo-element on the element. Always indeterminate.",
    selector: '[aria-busy="true"]',
  },
} satisfies ComponentApi

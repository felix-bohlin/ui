import type { ComponentApi } from "../types"

export default {
  component: "Spinner",
  css: ["spinner"],
  notes: {
    astro:
      "Set `aria-busy` on any element to show a spinner. CSS-only; no Astro component.",
    html: "Elements that never receive a spinner: `<input>`, `<select>`, `<textarea>`, `<html>`, `<progress>`, elements with `aria-describedby`.",
    solid:
      "Set `aria-busy` on any element to show a spinner. CSS-only; no Solid component.",
    vue: "Set `aria-busy` on any element to show a spinner. CSS-only; no Vue component.",
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

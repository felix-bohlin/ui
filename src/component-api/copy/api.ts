import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Copy",
  css: ["copy"],
  keyboard: [
    {
      description:
        'On a button with `command="--copy"`, copies the text and announces it.',
      keys: ["Enter", "Space"],
    },
  ],
  notes: {
    ...components(
      "Attributes that aren't props go to the root `<opui-copy>`. The button works once the component hydrates, or once the page imports `opui-css/elements/copy.js`; the Astro component loads it.",
    ),
    html: 'Wrap the text or the field in `<opui-copy class="ui-copy">` with an id, and end it with `<span class="ui-sr-only" role="status">` for the announcement. Point a button at it with `commandfor` and `command="--copy"`, inside the element or right after it, and import `opui-css/elements/copy.js`. Until it loads, the button is hidden.',
  },
  options: [
    {
      attribute: "[copied-label]",
      default: '"Copied"',
      description: "The text announced after a copy.",
      group: "Label",
      prop: "copiedLabel",
    },
    {
      description:
        "The id the copy button points at with `commandfor`. Required.",
      prop: "id",
    },
  ],
  parts: [
    {
      code: '<span role="status">',
      description:
        "The live region that announces the copy, visually hidden with `.ui-sr-only`.",
      selector: '[role="status"]',
    },
  ],
  root: {
    description:
      'The `<opui-copy>` custom element, with `display: contents`. A button with `command="--copy"` copies the value of its first `input` or `textarea`, or else its text without buttons, and gets `data-copied` for two seconds.',
    selector: "opui-copy.ui-copy",
  },
  slots: [
    {
      description:
        "The text or the field to copy, and the button if it sits inside.",
      name: "default",
    },
  ],
  source: "Copy",
} satisfies ComponentApi

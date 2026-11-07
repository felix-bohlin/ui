import { elementNotes } from "../frameworks.ts"
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
    ...elementNotes(
      "copy.js",
      "Attributes that aren't props go to the root `<opui-copy>`, and the button works once the element runs.",
    ),
    html: 'Wrap the text or the field in `<opui-copy class="ui-copy">` with an id, and end it with `<span class="ui-sr-only" role="status">` for the announcement and `<span class="ui-floating" popover aria-hidden="true">` for the label. Point a button at it with `commandfor` and `command="--copy"`, inside the element or right after it, and import `opui-css/elements/copy.js`. Until it loads, the button is hidden.',
  },
  options: [
    {
      attribute: "[copied-label]",
      default: '"Copied"',
      description: "The text shown and announced after a copy.",
      group: "Label",
      prop: "copiedLabel",
    },
    {
      attribute: "[failed-label]",
      default: '"Copy failed"',
      description:
        "The text shown and announced when the clipboard is blocked.",
      group: "Failed label",
      prop: "failedLabel",
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
    {
      code: "<span popover>",
      description:
        "The label next to the button that shows `copiedLabel` or `failedLabel`.",
      props: ["copiedLabel", "failedLabel"],
      selector: ".ui-floating",
    },
  ],
  root: {
    description:
      "The `<opui-copy>` custom element around the text or field to copy, with `display: contents`.",
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

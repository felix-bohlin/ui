import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Toaster",
  css: ["button", "callout", "toaster"],
  keyboard: [
    {
      description:
        "Moves focus to the close buttons of the toasts, where the toaster sits in the page. While focus is in a toast, the toasts stay.",
      keys: ["Tab"],
    },
    {
      description:
        'On a button with `command="--toast"`, shows its toast. On a close button, dismisses the toast.',
      keys: ["Enter", "Space"],
    },
    {
      description: "Dismisses the toast that has focus.",
      keys: ["Esc"],
    },
  ],
  notes: {
    ...components(
      "Attributes that aren't props go to the root `<opui-toaster>`. Toasts show once the component hydrates, or once the page imports `opui-css/elements/toaster.js`; the Astro component loads it.",
    ),
    html: 'Put an `<ol popover="manual">` and a `<div class="ui-sr-only" role="status">` in `<opui-toaster class="ui-toaster">` with an id, and import `opui-css/elements/toaster.js`.',
  },
  options: [
    {
      attribute: "[close-label]",
      default: '"Close"',
      description: "The accessible name of the close button of each toast.",
      group: "Label",
      prop: "closeLabel",
    },
    {
      attribute: "[duration]",
      default: "5000",
      description:
        "How long a toast stays, in milliseconds, while the pointer and focus are elsewhere.",
      group: "Duration",
      prop: "duration",
    },
    {
      description: "The id the buttons point at with `commandfor`. Required.",
      prop: "id",
    },
  ],
  parts: [
    {
      code: '<ol popover="manual">',
      description:
        "The stack of toasts, a manual popover at the block end and the inline end of the viewport. It opens with the first toast and closes after the last.",
      selector: "ol",
    },
    {
      code: "<li>",
      description:
        "A toast, a `Callout` with the severity class, the message in `.ui-content` and a close `Button`. The element adds and removes it.",
      selector: "ol > .ui-callout",
    },
    {
      code: '<div role="status">',
      description:
        "The live region that announces each toast, visually hidden with `.ui-sr-only` and outside the popover, so it's always in the page.",
      selector: '[role="status"]',
    },
  ],
  root: {
    description:
      'The `<opui-toaster>` custom element, with `display: contents`. A button with `commandfor` and `command="--toast"` shows a toast with its `data-toast` text and `data-toast-severity`, and `show(message, { duration, severity })` does it from a script.',
    selector: "opui-toaster.ui-toaster",
  },
  source: "Toaster",
} satisfies ComponentApi

import type { ComponentApi } from "../types"

export default {
  component: "Toaster",
  css: ["button", "callout", "toaster"],
  keyboard: [
    {
      description:
        "Moves focus to the action and close buttons of the toasts, where the toaster sits in the page. While focus is in a toast, the toasts stay.",
      keys: ["Tab"],
    },
    {
      description:
        'On a button with `command="--toast"`, shows its toast. On an action button, runs the action and dismisses the toast. On a close button, dismisses the toast and moves focus like Esc.',
      keys: ["Enter", "Space"],
    },
    {
      description:
        "Dismisses the toast that has focus. Focus moves to the next toast, or back to where it was before the toasts once the last one is gone.",
      keys: ["Esc"],
    },
  ],
  notes: {
    astro:
      "Attributes that aren't props go to the root `<opui-toaster>`. The component loads `opui-css/elements/toaster.js`, which exports `toast()` for a client script.",
    react:
      "Attributes that aren't props go to the root `<opui-toaster>`. Toasts show once `opui-css/elements/toaster.js` runs, which the component loads once it mounts and `toast()` brings with your code. `opui-css/react` exports `toast()` next to `Toaster`.",
    svelte:
      "Attributes that aren't props go to the root `<opui-toaster>`. Toasts show as soon as the component's code loads, which imports `opui-css/elements/toaster.js`. `opui-css/svelte` exports `toast()` next to `Toaster`.",
    vue: "Attributes that aren't props go to the root `<opui-toaster>`. Toasts show as soon as the component's code loads, which imports `opui-css/elements/toaster.js`. `opui-css/vue` exports `toast()` next to `Toaster`.",
    html: 'Put an `<ol popover="manual">`, a `<div class="ui-sr-only" role="status">` and a `<div class="ui-sr-only" role="alert">` in `<opui-toaster class="ui-toaster">` with an id, and import `opui-css/elements/toaster.js`.',
  },
  options: [
    {
      default: '"end"',
      description: "Where the toasts sit along their side of the viewport.",
      group: "Alignment",
      prop: "align",
      values: {
        center: ".ui-align-center",
        end: null,
        start: ".ui-align-start",
      },
    },
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
        "How long a toast stays, in milliseconds, while the pointer and focus are elsewhere. A toast with an action stays twice as long.",
      group: "Duration",
      prop: "duration",
    },
    {
      description: "The id the buttons point at with `commandfor`. Required.",
      prop: "id",
    },
    {
      attribute: "[limit]",
      default: "3",
      description:
        "The most toasts shown at once. Past it, the oldest is dismissed, unless it holds focus.",
      group: "Limit",
      prop: "limit",
    },
    {
      default: '"block-end"',
      description: "The side of the viewport the toasts sit on.",
      group: "Position",
      prop: "side",
      values: { "block-end": null, "block-start": ".ui-block-start" },
    },
  ],
  parts: [
    {
      code: '<ol popover="manual">',
      description:
        "The stack of toasts, a manual popover at the block end and the inline end of the viewport unless `side` and `align` move it. It opens with the first toast and closes after the last.",
      selector: "ol",
    },
    {
      code: "<li>",
      description:
        "A toast, a `Callout` with the severity class, its icon (an empty `svg` that `--_icon-image` masks), the message in `.ui-content`, an action `Button` when it has an `action`, and a close `Button`. The element adds it, and on dismiss makes it `inert`, fades it out and closes its gap before it removes it.",
      selector: "ol > .ui-callout",
    },
    {
      code: '<div role="status">',
      description:
        "The polite live region that announces each toast but a critical one, visually hidden with `.ui-sr-only` and outside the popover, so it's always in the page.",
      selector: '[role="status"]',
    },
    {
      code: '<div role="alert">',
      description:
        "The assertive live region that announces a critical toast at once, visually hidden like the status region. Without it, critical toasts go to the status region.",
      selector: '[role="alert"]',
    },
  ],
  root: {
    description:
      'The `<opui-toaster>` custom element, with `display: contents`. A button with `commandfor` and `command="--toast"` shows a toast with its `data-toast` text and `data-toast-severity`, and `toast(message, { action, duration, severity })` or `toast.success(message)` does it from a script, where `action` takes a `label` and an `onClick`. `dismiss(toast)` returns a promise that resolves once the toast is gone.',
    selector: "opui-toaster.ui-toaster",
  },
  source: "Toaster",
} satisfies ComponentApi

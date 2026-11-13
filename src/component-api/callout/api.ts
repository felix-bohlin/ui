import { elementNotes } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const icon =
  'For a custom icon, put your own `<svg aria-hidden="true">` in the Callout instead of `CalloutIcon`, before `CalloutContent`.'

const dismissEvent =
  "Called before the callout hides, with its cancelable `dismiss` event. `preventDefault()` keeps the callout, for example to ask first."

const closeButton = elementNotes(
  "callout.js",
  "With `closeButton`, the root is `<opui-callout>`, and the close button shows and works once the element runs.",
)

export default {
  component: "Callout",
  elements: [
    {
      members: [
        {
          description:
            "Fires on the callout before it hides. It bubbles, and `preventDefault()` keeps the callout.",
          kind: "event",
          name: "dismiss",
        },
        {
          description:
            "Fires `dismiss` and, unless a listener cancels it, sets `hidden` on the callout and moves focus that was inside it to the next focusable element after it, or else the one before. Returns whether the callout hid.",
          kind: "method",
          name: "dismiss()",
        },
      ],
      tag: "opui-callout",
    },
  ],
  keyboard: [
    {
      description:
        "On the close button, hides the callout and moves focus to the next focusable element after it, or else the one before.",
      keys: ["Enter", "Space"],
    },
  ],
  notes: {
    astro: `${icon} ${closeButton.astro} Listen for \`dismiss\` in a client script.`,
    html: 'For a close button that hides the callout, use `<opui-callout class="ui-callout" role="article">` with an id, end it with a `.ui-button` with `commandfor` naming it and `command="--dismiss"`, and import `opui-css/elements/callout.js`. Until it loads, the button is hidden.',
    react: `${icon} ${closeButton.react}`,
    svelte: `${icon} ${closeButton.svelte}`,
    vue: `${icon} ${closeButton.vue}`,
  },
  options: [
    {
      description: dismissEvent,
      frameworks: ["vue"],
      prop: "@dismiss",
    },
    {
      default: "false",
      description:
        'Adds a close button at the end of the first row that hides the callout. The root becomes `<opui-callout>` with `role="article"`, and the component loads `opui-css/elements/callout.js`, which runs the button.',
      group: "Close button",
      prop: "closeButton",
    },
    {
      default: '"Close"',
      description: "The accessible name of the close button.",
      prop: "closeLabel",
    },
    {
      description:
        "The id of the callout. With `closeButton`, the close button points at it with `commandfor`, so the component generates one when it's left out.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      description: dismissEvent,
      frameworks: ["svelte"],
      prop: "ondismiss",
    },
    {
      description: dismissEvent,
      frameworks: ["react"],
      prop: "onDismiss",
    },
    {
      description:
        "The severity. Sets the color, and in Astro, React, Svelte and Vue the icon `CalloutIcon` renders.",
      group: "Severities",
      prop: "severity",
      values: {
        critical: ".ui-critical",
        info: ".ui-info",
        neutral: ".ui-neutral",
        success: ".ui-success",
        warning: ".ui-warning",
      },
    },
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: { outlined: ".ui-outlined", tonal: null },
    },
  ],
  parts: [
    {
      code: "<svg>",
      component: "CalloutIcon",
      description:
        "An optional icon before the content. In Astro, React, Svelte and Vue, `CalloutIcon` renders the default one for critical, info, success and warning.",
      selector: ".ui-callout > svg",
    },
    {
      component: "CalloutContent",
      description: "The content, with an optional heading first.",
      selector: ".ui-content",
    },
    {
      code: "<button>",
      description:
        'A close button, a `.ui-button` that is a direct child of the callout. It sits at the end of the first row. With `closeButton`, the component renders it with `command="--dismiss"` and `commandfor` naming the callout, hidden until `<opui-callout>` is defined. Renders a close icon by default, or the `svg` in `close-icon`.',
      props: ["closeButton", "closeLabel"],
      selector: ".ui-callout > .ui-button",
      slots: ["close-icon"],
    },
    {
      component: "CalloutActions",
      description: "A row of buttons under the content.",
      selector: ".ui-actions",
    },
  ],
  root: {
    description:
      'Container element, an `<article>`. With `closeButton`, the `<opui-callout>` custom element with `role="article"`, which a button with `commandfor` and `command="--dismiss"` dismisses.',
    selector: ".ui-callout",
  },
  slots: [
    {
      description: "The callout parts, and any other content.",
      name: "default",
    },
  ],
  source: "Callout",
} satisfies ComponentApi

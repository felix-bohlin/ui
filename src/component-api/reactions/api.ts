import { components } from "../frameworks.ts"
import type { ComponentApi } from "../types"

export default {
  component: "Reactions",
  css: ["message"],
  notes: {
    ...components(
      "The component loads `opui-css/elements/reactions.js`. In React, Svelte and Vue it runs once the component hydrates, or once the page imports the module. Render the pills from your data and change the data when the reply comes, since a click never checks or unchecks a pill on its own. `announce(message)` on `event.target` reads a message to screen readers. In Vue, listen with `@reaction`.",
    ),
    html: 'Wrap the `ToggleGroup` in `<opui-reactions class="ui-reactions">` with an empty `<span class="ui-sr-only" role="status">` after it, and import `opui-css/elements/reactions.js`. `set(value, { checked, label, text })` adds or updates a pill, `delete(value)` removes one, and `announce(message)` reads a message to screen readers.',
  },
  options: [
    {
      description:
        "Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change the data.",
      frameworks: ["react"],
      prop: "onReaction",
    },
    {
      description:
        "Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change the data.",
      frameworks: ["svelte"],
      prop: "onreaction",
    },
  ],
  page: "message",
  parts: [
    {
      code: '<span role="status">',
      description:
        "The live region that `announce()` writes to, visually hidden with `.ui-sr-only`.",
      selector: '[role="status"]',
    },
  ],
  root: {
    description:
      'The `<opui-reactions>` custom element, with `display: contents`, around the `ToggleGroup` of reactions. A click on a pill, or on a button with `command="--react"` and the emoji as its `value`, fires a `reaction` event that bubbles, and changes nothing. A pick of an emoji you already reacted with asks to uncheck it, and the menu the button is in closes.',
    selector: "opui-reactions.ui-reactions",
  },
  slots: [
    {
      description: "The `ToggleGroup` of reactions.",
      name: "default",
    },
  ],
  source: "Reactions",
} satisfies ComponentApi

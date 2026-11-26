import { elementNotes } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const reactionNote =
  "A click never checks or unchecks a pill on its own: change `items` when your server answers. `announce(message)` on `event.target` reads a message to screen readers."

const reactionEvent =
  "Called when a pill is clicked or an emoji is picked, with the emoji's `value` and the `checked` state asked for in `event.detail`. Nothing changes until you change `items`."

export default {
  component: "Reactions",
  css: ["reactions"],
  elements: [
    {
      members: [
        {
          description:
            'Reads `message` to screen readers, through the `role="status"` child.',
          kind: "method",
          name: "announce(message)",
        },
        {
          description:
            "Removes the pill of `value`, and moves focus to the next pill, the previous one or the first button after the pills when the removed pill had it. The pill of the `quick-value` reaction stays, unchecked and `.ui-suggested`, with the `quick-label` and `quick-text` attributes as its name and text, and keeps focus.",
          kind: "method",
          name: "delete(value)",
        },
        {
          description: "The `.ui-toggle-group` of pills, or `null`. Read-only.",
          kind: "property",
          name: "group",
        },
        {
          description:
            'Fires when a pill is clicked, or a button with `command="--react"` and this element in `commandfor`, with the `value` and the `checked` state asked for in `event.detail`. It bubbles, and changes nothing.',
          kind: "event",
          name: "reaction",
        },
        {
          description:
            "Updates the pill of `value` with `{ checked, label, text }`, the accessible name in `label` and the emoji and count in `text`, or adds one at the end, and the `quick-value` reaction first. It removes `.ui-suggested` from the pill.",
          kind: "method",
          name: "set(value, reaction)",
        },
      ],
      tag: "opui-reactions",
    },
  ],
  notes: {
    ...elementNotes("reactions.js", reactionNote),
    html: 'Put a `.ui-toggle-group` of checkbox `.ui-toggle-button` pills in `<opui-reactions class="ui-reactions">`, with an empty `<span class="ui-sr-only" role="status">` last, and import `opui-css/elements/reactions.js`. Each input takes the emoji\'s `value` and an `aria-label` with the name and the count, and a `<span aria-hidden="true">` after it shows the emoji and the count. Apply your server\'s answer with `set()` and `delete()`.',
  },
  options: [
    {
      description: reactionEvent,
      frameworks: ["vue"],
      prop: "@reaction",
    },
    {
      description:
        "The accessible name of the group of pills. The Astro, React, Solid and Svelte types require it, or `aria-labelledby`. In Vue it passes through as an attribute.",
      group: "Label",
      inherited: true,
      part: ".ui-toggle-group",
      prop: "aria-label",
      type: "string",
    },
    {
      description:
        "The id of the element that names the group of pills, instead of `aria-label`.",
      inherited: true,
      part: ".ui-toggle-group",
      prop: "aria-labelledby",
      type: "string",
    },
    {
      description:
        "The reactions in use, as `{ aria-label, checked, label, value }` objects: the name with the count in `aria-label`, such as `Thumbs up, 2`, the emoji with the count in `label`, and `checked` on the ones you reacted with.",
      prop: "items",
    },
    {
      description: "The `name` of the checkboxes.",
      prop: "name",
    },
    {
      description: reactionEvent,
      frameworks: ["svelte"],
      prop: "onreaction",
    },
    {
      description: reactionEvent,
      frameworks: ["react", "solid"],
      prop: "onReaction",
    },
    {
      description:
        "The one-tap reaction, as an item without a count: `{ aria-label, label, value }`. Its pill always comes first. While `items` has no entry with its `value`, the pill is unchecked, has a dashed border and shows `label` alone.",
      prop: "quick",
    },
    {
      attribute: "[quick-label]",
      description:
        "The name of the quick reaction without a count, such as `Thumbs up`, which `delete()` gives its pill.",
      frameworks: ["html"],
      group: "Quick label",
      prop: "quickLabel",
    },
    {
      attribute: "[quick-text]",
      description:
        "The emoji of the quick reaction without a count, which `delete()` gives its pill.",
      frameworks: ["html"],
      group: "Quick text",
      prop: "quickText",
    },
    {
      attribute: "[quick-value]",
      description:
        "The `value` of the quick reaction, the one-tap reaction whose pill comes first and stays when `delete()` is called with it.",
      frameworks: ["html"],
      group: "Quick value",
      prop: "quickValue",
    },
    {
      class: ".ui-suggested",
      description:
        "The pill of the quick reaction while nobody has picked it, which suggests it: a dashed border.",
      frameworks: ["html"],
      group: "Suggested",
      part: ".ui-toggle-button",
      prop: "suggested",
    },
  ],
  page: "message",
  parts: [
    {
      description:
        "The `ToggleGroup` of pills, named by the `aria-label` or `aria-labelledby` of the component.",
      selector: ".ui-toggle-group",
    },
    {
      description:
        "A reaction: a checkbox `ToggleButton` drawn as a pill, checked when you reacted with it.",
      props: ["items", "quick"],
      selector: ".ui-toggle-button",
    },
    {
      code: '<span role="status">',
      description:
        "The live region that `announce()` writes to, visually hidden with `.ui-sr-only`.",
      selector: '[role="status"]',
    },
  ],
  root: {
    description:
      'The `<opui-reactions>` custom element, a row that wraps, and `display: contents` in the `bottom` slot of a `Message`. A click on a pill, or on a button with `command="--react"`, this element in `commandfor` and the emoji as its `value`, fires a `reaction` event that bubbles, and changes nothing. A pick of an emoji you already reacted with asks to uncheck it, and the menu the button is in closes. While it has `data-hydrating`, which the React, Solid, Svelte and Vue components render until they hydrate, clicks ask for nothing.',
    selector: "opui-reactions.ui-reactions",
  },
  slots: [
    {
      description:
        "Content after the pills, such as the add reaction button and its `Menu` when they aren't in the `actions` slot of a `Message`.",
      name: "default",
    },
  ],
  source: "Reactions",
} satisfies ComponentApi

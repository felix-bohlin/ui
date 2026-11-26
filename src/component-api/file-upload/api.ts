import { elementNotes } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const controlledNote =
  "The component uploads nothing and keeps no files: start the upload from the `select` event, and pass each file's state back in `items`. Attributes that aren't props go to the `<opui-file-upload>`, and `id` names the file input."

const removeEvent =
  "Called when a remove button is pressed, with the item's `value` in `event.detail.value`. Take the item out of `items`, and cancel its upload."

const selectEvent =
  "Called with the new files of one pick or drop in `event.detail.files`, after the `accept` check, and with only the first one without `multiple`."

const element = elementNotes("file-upload.js", controlledNote)

export default {
  component: "FileUpload",
  css: ["button", "file-upload", "list", "progress"],
  elements: [
    {
      members: [
        {
          description:
            'The `<input type="file">` inside, or `null`. Read-only.',
          kind: "property",
          name: "input",
        },
        {
          description:
            "Fires when a remove button is pressed, with its `value` in `event.detail.value`. It bubbles. Once the row is gone, focus moves to the next row's remove button, or else the previous one, or else the input.",
          kind: "event",
          name: "remove",
        },
        {
          description:
            "Fires after a pick or a drop, with the new files in `event.detail.files`: the ones the input's `accept` allows, and only the first without `multiple`. It bubbles. The input is already empty by then, so the same file can be picked again: read the files from `event.detail.files`.",
          kind: "event",
          name: "select",
        },
      ],
      tag: "opui-file-upload",
    },
  ],
  keyboard: [
    {
      description:
        "Moves focus from the file input to each file in turn: a failed file's message button in the compact row, then its remove button.",
      keys: ["Tab"],
    },
    {
      description:
        "On the file input, opens the file picker. On a remove button, removes the file. On a failed file in the compact row, opens its message.",
      keys: ["Enter", "Space"],
    },
    {
      description: "Closes an open message in the compact row.",
      keys: ["Esc"],
    },
  ],
  notes: {
    ...element,
    html: 'Import `opui-css/elements/file-upload.js`, and render the rows yourself from the `select` and `remove` events: one `<li>` per file in a `<ul class="ui-list">` after the `.ui-field-container`, with the preview in `.ui-start`, the name, a `.ui-progress` and the message in `.ui-text`, and the remove button in `.ui-end` with `command="--remove"`, `commandfor` set to the input\'s id and the file\'s id as its `value`. A failed file\'s message has `popover` and an `id`, and a `<button type="button" popovertarget>` in `.ui-start` opens it in the compact row.',
  },
  options: [
    {
      description: removeEvent,
      frameworks: ["vue"],
      prop: "@remove",
    },
    {
      description: selectEvent,
      frameworks: ["vue"],
      prop: "@select",
    },
    {
      attribute: "[accept]",
      description:
        "The file types the input takes, as on a file input: extensions, MIME types and `type/*`. The element applies it to picks as well as drops.",
      group: "Accept",
      part: "input",
      prop: "accept",
    },
    {
      description:
        "The hint in the drop zone. It describes the input, and is visually hidden in the compact row.",
      group: "Description",
      prop: "description",
    },
    {
      attribute: ":disabled",
      default: "false",
      description:
        "Disables the input and dims the trigger. A drop does nothing.",
      group: "State",
      part: "input",
      prop: "disabled",
    },
    {
      description:
        "The id of the file input. The remove buttons point at it, so the component generates one when it's left out. The ids the component generates start with it: `x-description` for the hint, and `x-label-0` and `x-description-0` for the first file's name and message, for `id=\"x\"`.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      class: ".ui-state-error",
      description:
        'The files, as `{ description, label, preview, progress, state, value }` objects. `label` is the file name, `value` the id the `remove` event names, `preview` the URL of an image, `state` one of `"complete"`, `"error"`, `"queued"` and `"uploading"`, `progress` a fraction from 0 to 1 while uploading, and `description` a message, which a failed file shows in the critical color.',
      group: "Items",
      htmlDescription:
        "Marks the `<li>` of a file that failed: its message in the critical color, and in the compact row a critical border.",
      part: ".ui-list > li",
      prop: "items",
    },
    {
      description: "The text of the trigger, which names the file input.",
      group: "Label",
      prop: "label",
    },
    {
      attribute: "[multiple]",
      default: "false",
      description:
        "Takes several files in one pick or drop. Without it, `select` gets the first accepted file.",
      group: "Multiple",
      part: "input",
      prop: "multiple",
    },
    {
      description: removeEvent,
      frameworks: ["svelte"],
      prop: "onremove",
    },
    {
      description: removeEvent,
      frameworks: ["react", "solid"],
      prop: "onRemove",
    },
    {
      description: selectEvent,
      frameworks: ["svelte"],
      prop: "onselect",
    },
    {
      description: selectEvent,
      frameworks: ["react", "solid"],
      prop: "onSelect",
    },
    {
      default: '"Uploading {label}"',
      description:
        "The name of each file's progress bar, with `{label}` where the file's `label` goes.",
      group: "Progress label",
      prop: "progressLabel",
    },
    {
      default: '"Remove {label}"',
      description:
        "The name of each file's remove button, with `{label}` where the file's `label` goes.",
      group: "Remove label",
      prop: "removeLabel",
    },
    {
      description:
        'The text of the `role="status"` region, which a screen reader announces when it changes, like "2 photos didn\'t upload."',
      group: "Status",
      prop: "status",
    },
  ],
  parts: [
    {
      code: '<div class="ui-content">',
      description:
        "Lays out the drop zone and the files: stacked, or in one row when the root is narrower than `28rem`.",
      selector: ".ui-content",
    },
    {
      code: '<div class="ui-field-container">',
      description:
        "The drop zone, dashed, and solid while files are dragged over the root. In the compact row it is a square add tile.",
      selector: ".ui-content > .ui-field-container",
    },
    {
      code: '<label class="ui-label">',
      description:
        "Names the file input and covers the drop zone, so a click anywhere in it opens the picker. Its plus `<svg>` shows in the compact row.",
      selector: ".ui-field-container > .ui-label",
    },
    {
      code: '<input class="ui-sr-only" type="file">',
      description:
        "The file input, visually hidden. Its focus ring is drawn on the drop zone.",
      props: ["accept", "disabled", "multiple"],
      selector: ".ui-label > input",
    },
    {
      code: '<span class="ui-button ui-outlined">',
      description:
        "The visible trigger, a `<span>` since a label can't hold a button. Visually hidden in the compact row.",
      props: ["label"],
      selector: ".ui-label > .ui-button",
    },
    {
      code: '<span class="ui-description">',
      description: "The hint, linked to the input with `aria-describedby`.",
      props: ["description"],
      selector: ".ui-field-container > .ui-description",
    },
    {
      code: '<ul class="ui-list">',
      description:
        "The files, one `<li>` each: List rows, or square previews that scroll sideways in the compact row.",
      props: ["items"],
      selector: ".ui-content > .ui-list",
    },
    {
      code: '<div class="ui-start">',
      description:
        "The preview: the `<img>` of the file, or a tonal placeholder until there is one. On a failed file it also holds the `<button popovertarget>` that opens the message in the compact row.",
      selector: ".ui-list > li > .ui-start",
    },
    {
      code: '<div class="ui-text">',
      description:
        "The file name, a `Progress` while the file is queued or uploading, and the message in a `.ui-description`. In the compact row the name is visually hidden and the progress lies along the bottom edge.",
      props: ["progressLabel"],
      selector: ".ui-list > li > .ui-text",
    },
    {
      code: '<div class="ui-end">',
      description:
        'The remove button, a round `.ui-button` with `command="--remove"`, in every state.',
      props: ["removeLabel"],
      selector: ".ui-list > li > .ui-end",
    },
    {
      code: '<span class="ui-sr-only" role="status">',
      description:
        "The live region. It is always in the page, so a change of its text is announced.",
      props: ["status"],
      selector: '[role="status"]',
    },
  ],
  root: {
    description:
      "The `<opui-file-upload>` custom element, a size container. It fires `select` for picks and drops and `remove` for the remove buttons, and has the `drag-over` custom state while files are dragged over it. While it has `data-hydrating`, which the React, Solid, Svelte and Vue components render until they hydrate, it holds picked files back and remove buttons do nothing.",
    selector: "opui-file-upload.ui-file-upload",
  },
  source: "FileUpload",
} satisfies ComponentApi

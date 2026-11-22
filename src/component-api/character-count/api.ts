import type { ComponentApi } from "../types"

export default {
  component: "CharacterCount",
  css: ["text-field", "textarea"],
  elements: [
    {
      members: [
        {
          description:
            "The `<input>` or `<textarea>` of the field it's in, or `null` outside one. Read-only.",
          kind: "property",
          name: "control",
        },
      ],
      tag: "opui-character-count",
    },
  ],
  notes: {
    default:
      "Put it in the field's `end-text` slot. It loads `opui-css/elements/character-count.js`, which keeps the count.",
    react:
      "Put it in the field's `endText`. It loads `opui-css/elements/character-count.js`, which keeps the count.",
    solid:
      "Put it in the field's `endText`. It loads `opui-css/elements/character-count.js`, which keeps the count.",
    svelte:
      "Put it in the field's `endText` snippet. It loads `opui-css/elements/character-count.js`, which keeps the count.",
    html: 'Add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, set the announcement as its `label` attribute, with `{count}` for the characters left, and import `opui-css/elements/character-count.js`.',
  },
  options: [
    {
      attribute: "label",
      default: '"Characters left: {count}"',
      description:
        "The announcement near the limit, with `{count}` for the characters left. Pass it translated.",
      group: "Label",
      prop: "label",
    },
  ],
  page: "textarea",
  parts: [],
  root: {
    code: "<opui-character-count>",
    description:
      "Shows the characters typed out of the control's `maxlength`, `aria-hidden` so it stays out of the field's description. Once 10% or 10 are left, whichever is more, a live region outside the label announces the characters left.",
    selector: ".ui-end-text > .ui-value",
  },
  source: "CharacterCount",
} satisfies ComponentApi

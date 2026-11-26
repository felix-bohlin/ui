import type { ComponentApi } from "../types"

export default {
  component: "CharacterCount",
  css: ["field", "textarea"],
  elements: [
    {
      members: [
        {
          description:
            "The field's `<input>` or `<textarea>`, or `null` outside a field. Read-only.",
          kind: "property",
          name: "control",
        },
      ],
      tag: "opui-character-count",
    },
  ],
  notes: {
    default:
      "Put it in the `end-text` slot. It loads `opui-css/elements/character-count.js`.",
    nunjucks:
      "Put it in `slots.endText`, and load `opui-css/elements/character-count.js` on the page.",
    react:
      "Put it in `endText`. It loads `opui-css/elements/character-count.js`.",
    solid:
      "Put it in `endText`. It loads `opui-css/elements/character-count.js`.",
    svelte:
      "Put it in the `endText` snippet. It loads `opui-css/elements/character-count.js`.",
    html: 'Add `<opui-character-count class="ui-value" aria-hidden="true">` at the end of `.ui-end-text`, with the announcement in `label`, and import `opui-css/elements/character-count.js`.',
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
  page: "field",
  parts: [],
  root: {
    code: "<opui-character-count>",
    description:
      "Shows the characters typed out of `maxlength`, `aria-hidden` so it stays out of the description. Screen readers hear the characters left once 10% or 10 remain, whichever is more.",
    selector: ".ui-end-text > .ui-value",
  },
  source: "CharacterCount",
} satisfies ComponentApi

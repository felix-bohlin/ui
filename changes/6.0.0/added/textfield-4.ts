import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` and `Textarea` take `characterCount`: with `maxlength`, the `<opui-character-count>` custom element (`opui-css/elements/character-count.js`) at the end of the end text shows the characters typed out of the limit. It is `aria-hidden`, so it stays out of the field's name, and once 10% or 10 characters are left, whichever is more, a polite live region outside the label, in the field's `dialog` when there is one, so a modal dialog or drawer doesn't make it inert, announces how many, in the field's `lang`. `characterCountLabel` sets the words, with `{count}` for the number (\"Characters left: {count}\" by default). The element's `control` is the input or textarea it counts.",
  notes: {
    "text-field": {
      ...components(
        `<a href="#character-count"><code>characterCount</code></a> shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit.`,
      ),
      html: `<a href="#character-count">Character count</a>: <code>&lt;opui-character-count&gt;</code> in the end text shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit. Import <code>opui-css/elements/character-count.js</code>.`,
    },
    textarea: {
      ...components(
        `<a href="#character-count"><code>characterCount</code></a> shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit.`,
      ),
      html: `<a href="#character-count">Character count</a>: <code>&lt;opui-character-count&gt;</code> in the end text shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit. Import <code>opui-css/elements/character-count.js</code>.`,
    },
  },
} satisfies Change

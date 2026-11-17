import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` styles in `text-input.css` moved into `text-field.css`, and `text-input.css` is removed. Remove its import.",
  migrating: ["text-field"],
  notes: {
    "text-field": `the <a href="#autosuggest">autosuggest</a> and other input styles are in <code>text-field.css</code>, and <code>text-input.css</code> is gone. Remove its import.`,
  },
} satisfies Change

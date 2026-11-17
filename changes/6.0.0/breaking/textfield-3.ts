import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField` and `Textarea` in Astro pass extra attributes to the `<input>`/`<textarea>` instead of the root. `class` and `style` stay on the root. In Vue, `style` now goes to the root instead of the input.",
  migrating: ["text-field", "textarea"],
  notes: {
    "text-field": {
      astro: `extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the input. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `<code>style</code> goes to the label instead of the input (<a href="#api">API</a>).`,
    },
    textarea: {
      astro: `extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the textarea. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `<code>style</code> goes to the label instead of the textarea (<a href="#api">API</a>).`,
    },
  },
} satisfies Change

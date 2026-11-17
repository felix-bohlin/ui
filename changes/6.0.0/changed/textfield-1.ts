import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`TextField`, `Select` and `Textarea` with `.ui-small` set their text in `--ui-font-size-small`, like small buttons, instead of the default size. On iPhone and iPad, fields of every size set their text in `--ui-font-size-control` or 16px, whichever is larger (`css/compat/text-field.css`), since iOS Safari zooms in on a focused field with text under 16px, also when a theme sets smaller control text.",
  notes: {
    select: `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    "text-field": `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    textarea: `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
  },
} satisfies Change

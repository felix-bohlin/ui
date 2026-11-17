import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox` and `Radio` root selectors are wrapped in `:where()`, like other components.",
  notes: {
    checkbox: `The root selector is wrapped in <code>:where()</code>, like other components, so your own selectors win (<a href="#under-the-hood">Under the hood</a>).`,
    radio: `The root selector is wrapped in <code>:where()</code>, like other components, so your own selectors win (<a href="#under-the-hood">Under the hood</a>).`,
  },
} satisfies Change

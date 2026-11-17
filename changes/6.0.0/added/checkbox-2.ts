import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio` and `Switch` take a `label` string, a shorthand for the default slot.",
  notes: {
    checkbox: components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
    radio: components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
    switch: components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
  },
} satisfies Change

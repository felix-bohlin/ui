import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio` and `Switch` take an `endText` string in Astro and Vue, like `TextField`.",
  notes: {
    checkbox: slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
    radio: slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
    switch: slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
  },
} satisfies Change

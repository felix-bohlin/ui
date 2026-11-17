import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`CheckboxInput`, `RadioInput` and `SwitchInput` take `class` in Vue, and the Vue entry exports `DescriptionListDescriptionProps`, `DescriptionListItemProps` and `DescriptionListTermProps`.",
  notes: {
    checkbox: {
      vue: `<a href="#checkbox-input"><code>CheckboxInput</code></a> takes <code>class</code>.`,
    },
    radio: {
      vue: `<a href="#radio-input"><code>RadioInput</code></a> takes <code>class</code>.`,
    },
    switch: {
      vue: `<a href="#switch-input"><code>SwitchInput</code></a> takes <code>class</code>.`,
    },
  },
} satisfies Change

import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ToggleGroup` warns in development when it has no `aria-label` or `aria-labelledby`, since a single-select group renders `role="radiogroup"`, which needs a name.',
  notes: {
    toggle: components(
      `<code>ToggleGroup</code> warns in development when it has no <a href="#accessibility"><code>aria-label</code></a> or <code>aria-labelledby</code>.`,
    ),
  },
} satisfies Change

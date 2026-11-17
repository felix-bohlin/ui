import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`ControlGroup` and `ToggleGroup` `orientation` takes `"horizontal"`, the default, like `Carousel`.',
  notes: {
    "control-group": components(
      `<a href="#vertical-orientation"><code>orientation</code></a> takes <code>"horizontal"</code>, the default, like <code>Carousel</code>.`,
    ),
    toggle: components(
      `<a href="#vertical-orientation"><code>orientation</code></a> on <code>ToggleGroup</code> takes <code>"horizontal"</code>, the default.`,
    ),
  },
} satisfies Change

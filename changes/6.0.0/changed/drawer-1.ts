import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Drawer` backdrop dims and blurs like `Dialog`, through `--ui-backdrop-bg-color` and `--ui-backdrop-blur`. `.ui-backdrop-transparent` still removes it.",
  notes: {
    drawer: `The <a href="#basics">backdrop</a> dims and blurs like <code>Dialog</code>, through <code>--ui-backdrop-bg-color</code> and <code>--ui-backdrop-blur</code>.`,
  },
} satisfies Change

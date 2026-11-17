import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`dist` source maps no longer embed the sources (`sourcesContent`) or `node_modules/.pnpm` paths. Open Props sources point to `../../open-props/`, and `opui.components.css.map` accounts for the `@layer` order line.",
} satisfies Change

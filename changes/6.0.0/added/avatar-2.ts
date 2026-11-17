import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Avatar` takes a `size` prop (`.ui-x-small`, `.ui-small`, `.ui-large`) that matches the control sizes. Letters and icons scale with it, and large initials are `--ui-font-size-large`.",
  notes: {
    avatar: [
      `<a href="#letter">Initials</a> read the type roles: <code>--ui-font-size-caption</code>, <code>--ui-font-size-small</code> and <code>--ui-font-size-large</code> by <a href="#sizes">size</a>.`,
      {
        default: `<a href="#sizes">Sizes</a> with <code>size="x-small"</code>, <code>size="small"</code> and <code>size="large"</code>.`,
        html: `<a href="#sizes">Sizes</a> with <code>.ui-x-small</code>, <code>.ui-small</code> and <code>.ui-large</code>.`,
      },
    ],
  },
} satisfies Change

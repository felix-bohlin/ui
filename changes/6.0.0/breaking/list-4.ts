import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`List`, `Range` and `Progress` no longer take `variant="default"` (`.ui-default`, the page surface), because it wasn\'t the default look. Use `outlined` (the default), `filled` or `tonal` on a `Range`, `tonal` (the default) or `filled` on a `Progress`, and `filled` (the default), `tonal` or `transparent` on a `List`.',
  migrating: ["list", "progress", "range"],
  notes: {
    list: {
      ...slots(
        `<a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>filled</code>.`,
      ),
      html: `<a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    progress: {
      ...slots(
        `<a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>tonal</code>.`,
      ),
      html: `<a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    range: {
      ...slots(
        `<a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>outlined</code>.`,
      ),
      html: `<a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
  },
} satisfies Change

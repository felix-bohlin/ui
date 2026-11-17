import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Carousel` takes `orientation="vertical"` (`.ui-vertical`) to scroll on the block axis. Set its height with `--_block-size`. Markers sit in a column beside the items.',
  notes: {
    carousel: {
      default: `<a href="#vertical">Vertical</a> carousels with <code>orientation="vertical"</code>.`,
      html: `<a href="#vertical">Vertical</a> carousels with <code>.ui-vertical</code>.`,
    },
  },
} satisfies Change

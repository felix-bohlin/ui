import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`List` takes `--_check-image`, `--_selected-indicator-bg-color`, `--_selected-indicator-size`, `--_start-image-size` and `--_start-video-size`, `Tooltip` takes `--_max-inline-size`, and `Carousel` takes `--_marker-selected-padding` and `--_marker-border-color`.",
  notes: {
    list: `<a href="#selected"><code>--_selected-indicator-bg-color</code></a> and <code>--_selected-indicator-size</code> style the bar on a selected row, and <code>--_start-image-size</code> and <code>--_start-video-size</code> size the <a href="#image">start media</a>.`,
  },
} satisfies Change

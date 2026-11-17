import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Timeline` component (`ol.ui-timeline`) in Astro, React, Svelte and Vue: dated events with markers and a connecting line, where the dates line up in their own column through subgrid and move above the titles under `24rem`. Items take `color`, `current` (`aria-current`, a `--ui-selected-strong` marker with a halo, like the current `Stepper` step, which a passed `aria-current` replaces), `label` with `headingLevel`, `time` with `datetime` and a `marker` slot for an icon (`.ui-marker`), and the list takes `items`, `tracked` (`.ui-tracked`, the line in `--ui-selected-strong` up to the current item) and `size="small"` (`.ui-small`). In print, `print-color-adjust: exact` keeps the filled markers.',
} satisfies Change

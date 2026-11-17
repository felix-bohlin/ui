import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Switch` and `Range` read the optional `--ui-choice-accent` and `--ui-choice-on-accent` for their checked fill, thumb and mark. When unset, they keep `--ui-primary` with the dark mode lightness cap. brutalist sets them to its primary; m3 and shadcn set `--ui-control-accent`, which they read first. A checked invalid `Checkbox` or `Radio` draws its check, dash or dot in `--ui-on-fill`, so it keeps its contrast on the red fill when a theme sets `--ui-choice-on-accent`.",
  notes: {
    checkbox: `The checked fill and mark read <a href="#api"><code>--ui-choice-accent</code></a> and <code>--ui-choice-on-accent</code>, or <code>--ui-control-accent</code> and <code>--ui-control-on-accent</code>, when a theme sets them.`,
    radio: `The checked fill and dot read <a href="#api"><code>--ui-choice-accent</code></a> and <code>--ui-choice-on-accent</code>, or <code>--ui-control-accent</code> and <code>--ui-control-on-accent</code>, when a theme sets them.`,
    range: `The thumb and fill read <a href="#api"><code>--ui-choice-accent</code></a>, or <code>--ui-control-accent</code>, and the empty track <code>--ui-track-bg-color</code> when a theme sets them.`,
    switch: `The checked track reads <a href="#api"><code>--ui-choice-accent</code></a>, or <code>--ui-control-accent</code>, and the unchecked track <code>--ui-track-bg-color</code> when a theme sets them.`,
  },
} satisfies Change

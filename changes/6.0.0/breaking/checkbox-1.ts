import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox` and `Radio` internal variables are private (`--_` prefix): `--highlight-size` is `--_ripple-size`, `--thumb-scale` is `--_ripple-scale` and `--_input-size` is `--_size`, the name every sized control uses. `--isLTR` and `--isRTL` are removed, the halo centers itself in both directions. `--_ripple-size` and `--_size` are inputs to override; `--_ripple-scale` is set by the hover and active states.",
  migrating: ["checkbox", "radio"],
  notes: {
    checkbox: `<code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_ripple-scale</code> and <code>--_input-size</code> is <code>--_size</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
    radio: `<code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_ripple-scale</code> and <code>--_input-size</code> is <code>--_size</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
  },
} satisfies Change

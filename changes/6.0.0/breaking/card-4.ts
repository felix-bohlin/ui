import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Card` no longer has `--_shadow-light` and `--_shadow-dark`. Set `--ui-shadow-elevated` in your theme, one shadow for both schemes whose default color follows `--ui-shadow-color`, or `--_elevated-shadow` on the card.",
  migrating: ["card"],
  notes: {
    card: [
      `<code>--_bg-surface</code>, <code>--_bg-tonal</code> and <code>--_bg-elevated</code> are <code>--_surface-bg-color</code>, <code>--_tonal-bg-color</code> and <code>--_elevated-bg-color</code>, which also replace <code>--_card-bg-color</code> in each variant. <code>--_card-border-color</code> and the outlined <code>--_border-color</code> are <code>--_outlined-border-color</code>, <code>--_card-shadow</code> and <code>--_shadow-elevated</code> are <code>--_elevated-shadow</code>, and <code>--_card-border-width</code> is no longer an override, the variants set the border width (<a href="#under-the-hood">Under the hood</a>).`,
      `<code>--_shadow-light</code> and <code>--_shadow-dark</code> are gone. Set <a href="#api"><code>--ui-shadow-elevated</code></a> in your theme, one shadow whose color follows <code>--ui-shadow-color</code> in each scheme, or <a href="#component-properties"><code>--_elevated-shadow</code></a> on the card.`,
    ],
  },
} satisfies Change

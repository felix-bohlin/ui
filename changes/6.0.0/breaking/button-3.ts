import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Button` icon styles only apply to a direct child `svg` (`> svg`), sized with `--_icon-size`. An `svg` nested in another element is no longer sized, so move it out of its wrapper. Padding scales with `--_padding-inline` (`1ex` x-small, `1.25ex` small, `1.5ex` default, `2.5ex` large; was `0.5ex`, `0.75ex`, `1.5ex` and `4ex`), and the icon side gets tighter padding when a direct child `svg` sits next to a wrapped label (`<span class="ui-text">`). Wrap the label when the button has an icon: text next to an `svg` without a wrapper renders as icon-only.',
  migrating: ["button"],
  notes: {
    button: `icon styles only apply to a direct child <code>svg</code>. Wrap the label in a <code>&lt;span class="ui-text"&gt;</code> next to an icon to <a href="#buttons-with-icon-and-label">tighten the padding</a>, or the button renders as icon-only.`,
  },
} satisfies Change

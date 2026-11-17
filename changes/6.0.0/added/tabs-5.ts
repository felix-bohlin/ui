import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Tabs` take `orientation="vertical"` (`.ui-vertical`): the tabs stack in a column at the inline start and the panel sits beside them, `--_panel-gap` away, in every variant, in right-to-left and in forced colors. Long labels wrap in a column up to half the width, long words in the labels and the panel break, hyphenated for the page\'s `lang`, the selected pill or line slides up and down, and `overflow` has no effect.',
  notes: {
    tabs: {
      default: `<a href="#vertical">Vertical</a> tabs with <code>orientation="vertical"</code>: the tabs in a column at the side and the panel beside them, like the sections of a settings page.`,
      html: `<a href="#vertical">Vertical</a> tabs with <code>.ui-vertical</code>: the tabs in a column at the side and the panel beside them, like the sections of a settings page.`,
    },
  },
} satisfies Change

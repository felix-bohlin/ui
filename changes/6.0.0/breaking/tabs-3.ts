import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` parts are `.ui-input`, `.ui-label` and `.ui-panel` instead of `.ui-tab-input`, `.ui-tab-label` and `.ui-tab-panel`, and `TabsTab` is `TabsLabel` (`components/Tabs/TabsLabel.*`).",
  migrating: ["tabs"],
  notes: {
    tabs: {
      ...slots(
        `<code>TabsTab</code> is <a href="#api"><code>TabsLabel</code></a>, and the parts render <code>.ui-input</code>, <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>.ui-tab-input</code>, <code>.ui-tab-label</code> and <code>.ui-tab-panel</code>.`,
      ),
      html: `the parts are <a href="#api"><code>.ui-input</code></a>, <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>.ui-tab-input</code>, <code>.ui-tab-label</code> and <code>.ui-tab-panel</code>.`,
    },
  },
} satisfies Change

import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Tabs` render no `tablist`, `tab` or `tabpanel` roles and no `aria-controls`/`aria-labelledby`, so screen readers announce the radios they are, each as one of the set. Tabs with panels take no role, since the root holds the panels and a radio group holds only radios. Tabs without panels are a radio group: pass `role="radiogroup"` and an `aria-label` to `Tabs`, which warns in development when that group has no name, or put both on `.ui-tabs` in HTML. `TabsItem` and `TabsPanel` no longer take `panelId`, and `TabsPanel` no longer takes `tabId`. `tabs.css` no longer matches `[role="tab"]` or `[role="tabpanel"]`, use `.ui-label` and `.ui-panel`.',
  migrating: ["tabs"],
  notes: {
    tabs: {
      ...slots(
        `no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radios</a> they are. <code>TabsItem</code> and <code>TabsPanel</code> no longer take <code>panelId</code>, and <code>TabsPanel</code> no longer takes <code>tabId</code>.`,
      ),
      html: `no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radios</a> they are. Tabs with panels take no role, and tabs without panels get <code>role="radiogroup"</code> and an <code>aria-label</code> on <code>.ui-tabs</code>. Style <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>[role="tab"]</code> and <code>[role="tabpanel"]</code>.`,
    },
  },
} satisfies Change

import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Tabs` take `overflow`: `"scroll"`, the default, or `"wrap"` (`.ui-overflow-wrap`), which wraps tabs that don\'t fit onto more rows instead of scrolling them.',
  notes: {
    tabs: [
      {
        default: `Tabs that <a href="#overflow">wrap</a> onto more rows with <code>overflow="wrap"</code>.`,
        html: `Tabs that <a href="#overflow">wrap</a> onto more rows with <code>.ui-overflow-wrap</code>.`,
      },
      `Tabs draw the focus ring at <a href="#api"><code>--ui-focus-ring-inset</code></a>, like every other inset ring, except <a href="#vertical">vertical</a> tabs and tabs that wrap (<code>overflow="wrap"</code>, <code>.ui-overflow-wrap</code>) outside an Accordion, Card or Dialog.`,
    ],
  },
} satisfies Change

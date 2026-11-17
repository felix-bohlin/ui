import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Table` and `DescriptionList` part files are `components/Table/TableBody.*`, `TableCell.*`, `TableColumn.*`, `TableColumnGroup.*`, `TableHead.*`, `TableHeaderCell.*`, `TableRow.*` and `components/DescriptionList/DescriptionListDescription.*`, `DescriptionListItem.*`, `DescriptionListTerm.*`. The Vue `Table` exports are unchanged, the Vue `Description` export is `DescriptionListDescription`, and the Astro entry adds the flat part names; update deep `./components/*` imports.",
  migrating: ["description-list", "table"],
  notes: {
    "description-list": slots(
      `the part files are <code>DescriptionListDescription.*</code>, <code>DescriptionListItem.*</code> and <code>DescriptionListTerm.*</code>. Update deep <code>opui-css/components/*</code> imports (<a href="#api">API</a>).`,
    ),
    table: slots(
      `the part files are <code>TableBody.*</code>, <code>TableCell.*</code>, <code>TableColumn.*</code>, <code>TableColumnGroup.*</code>, <code>TableHead.*</code>, <code>TableHeaderCell.*</code> and <code>TableRow.*</code>. Update deep <code>opui-css/components/*</code> imports (<a href="#api">API</a>).`,
    ),
  },
} satisfies Change

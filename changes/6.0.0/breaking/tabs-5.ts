import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs`, `Table` and `DescriptionList` in Astro no longer have dot aliases such as `Tabs.Item`, `Table.Head` and `DescriptionList.Item`. Import the flat names, such as `TabsItem`, `TableHead` and `DescriptionListItem`, like React, Svelte and Vue. The `components/{Tabs,Table,DescriptionList}/index.ts` files that held the aliases are gone.",
  migrating: ["description-list", "table", "tabs"],
  notes: {
    "description-list": {
      astro: `import the parts by their flat names, such as <a href="#api"><code>DescriptionListItem</code></a>. The <code>DescriptionList.Item</code> aliases are gone.`,
    },
    table: {
      astro: `import the parts by their flat names, such as <a href="#api"><code>TableHead</code></a>. The <code>Table.Head</code> aliases are gone.`,
    },
    tabs: {
      astro: `import the parts by their flat names, such as <a href="#api"><code>TabsItem</code></a>. The <code>Tabs.Item</code> aliases are gone.`,
    },
  },
} satisfies Change

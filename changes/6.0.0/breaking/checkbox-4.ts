import { slots, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Checkbox`, `Radio`, `Switch`, `Range`, `DescriptionList` and `Table` type files are named like the other components: `components/Checkbox/types*` export `Props` and `Slots` instead of `CheckboxProps` and `CheckboxSlots` (likewise `Radio`, `Switch` and `Range`), `DescriptionList` exports `DescriptionListTermProps`, `DescriptionListDescriptionProps` and `DescriptionListItemProps` instead of `TermProps`, `DescriptionProps` and `ItemProps`, and `Table` exports one type per part (`TableBodyProps`, `TableCellProps` and the rest) instead of `SectionProps`, and `TableColumnProps` instead of `ColumnProps`. Import the types from `opui-css/<framework>` instead.",
  migrating: [
    "checkbox",
    "description-list",
    "radio",
    "range",
    "switch",
    "table",
  ],
  notes: {
    checkbox: slots(
      `deep type imports from <code>components/Checkbox/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>CheckboxProps</code> and <code>CheckboxSlots</code>). Import <a href="#api"><code>CheckboxProps</code></a> from the framework entry instead.`,
    ),
    "description-list": {
      astro: `deep type imports from <code>components/DescriptionList/types.astro</code> are named <a href="#api"><code>DescriptionListTermProps</code></a>, <code>DescriptionListDescriptionProps</code> and <code>DescriptionListItemProps</code> (was <code>TermProps</code>, <code>DescriptionProps</code> and <code>ItemProps</code>), like the framework entry.`,
    },
    radio: slots(
      `deep type imports from <code>components/Radio/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>RadioProps</code> and <code>RadioSlots</code>). Import <a href="#api"><code>RadioProps</code></a> from the framework entry instead.`,
    ),
    range: slots(
      `deep type imports from <code>components/Range/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>RangeProps</code> and <code>RangeSlots</code>). Import <a href="#api"><code>RangeProps</code></a> from the framework entry instead.`,
    ),
    switch: slots(
      `deep type imports from <code>components/Switch/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>SwitchProps</code> and <code>SwitchSlots</code>). Import <a href="#api"><code>SwitchProps</code></a> from the framework entry instead.`,
    ),
    table: slots(
      `deep type imports from <code>components/Table/types</code> have one type per part, such as <a href="#api"><code>TableCellProps</code></a>, instead of <code>SectionProps</code>, and <code>TableColumnProps</code> instead of <code>ColumnProps</code>.`,
    ),
  },
} satisfies Change

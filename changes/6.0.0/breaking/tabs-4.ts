import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Tabs` that don't fit stay on one row and scroll sideways instead of wrapping onto more rows, and the open panel stays in view, padded by the focus ring's reach so a ring at its edge isn't clipped. Tabs with panels are a scroll container that sizes to its container, so give them a width inside flex and grid layouts that size to their content, or add `overflow=\"wrap\"` (`.ui-overflow-wrap`) to wrap them as in 5.x. Tabs without panels size to their labels. Horizontal tabs that don't wrap draw the focus ring inside the tab, at `--ui-focus-ring-inset`.",
  migrating: ["tabs"],
  notes: {
    tabs: {
      default: `tabs that don't fit <a href="#overflow">scroll</a> sideways on one row instead of wrapping. Give them a width inside flex and grid layouts that size to their content, or wrap them with <code>overflow="wrap"</code>.`,
      html: `tabs that don't fit <a href="#overflow">scroll</a> sideways on one row instead of wrapping. Give them a width inside flex and grid layouts that size to their content, or wrap them with <code>.ui-overflow-wrap</code>.`,
    },
  },
} satisfies Change

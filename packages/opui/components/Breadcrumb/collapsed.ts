import type { BreadcrumbItemData } from "./types"

export const collapsedLevels = (items: BreadcrumbItemData[]) =>
  items.slice(1, -2).map(({ href, label }) => ({ href, label }))

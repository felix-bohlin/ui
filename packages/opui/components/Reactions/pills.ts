import type { ReactionsItem } from "./types"

export const usedItem = (items: ReactionsItem[], quick?: ReactionsItem) =>
  items.find((item) => item.value === quick?.value)

export const pillsOf = (
  items: ReactionsItem[],
  quick?: ReactionsItem,
  used?: ReactionsItem,
) =>
  quick
    ? [used ?? quick, ...items.filter((item) => item.value !== quick.value)]
    : items

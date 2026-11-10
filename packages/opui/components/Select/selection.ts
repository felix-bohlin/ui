import type { SelectItem } from "./types"

export const initialValue = (
  items: SelectItem[],
  multiple?: boolean | null,
) => {
  const selected = items
    .filter((item) => item.selected)
    .map((item) => item.value)
  return multiple ? selected : selected[0]
}

export const sameValue = (a: unknown, b: unknown) => String(a) === String(b)

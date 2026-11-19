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

export const keepSelected = (select: HTMLSelectElement, value: unknown) => {
  const values = [value].flat()
  for (const option of select.options) {
    if (
      !option.defaultSelected &&
      values.some((selected) => sameValue(selected, option.value))
    ) {
      option.defaultSelected = true
    }
  }
}

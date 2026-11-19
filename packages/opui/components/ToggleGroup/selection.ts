export const isSelected = (
  selected: string | string[] | undefined,
  value: unknown,
) =>
  selected === undefined ? undefined : [selected].flat().includes(String(value))

export const checkedValues = (input: HTMLInputElement) =>
  [...(input.closest(".ui-toggle-group")?.querySelectorAll("input") ?? [])]
    .filter((item) => item.checked && item.name === input.name)
    .map((item) => item.value)

export const selectionOf = (input: HTMLInputElement, multiple?: boolean) =>
  multiple ? checkedValues(input) : input.value

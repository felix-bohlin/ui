export const isSelected = (
  selected: string | string[] | undefined,
  value: unknown,
) =>
  selected === undefined ? undefined : [selected].flat().includes(String(value))

export const selectionOf = (input: HTMLInputElement, multiple?: boolean) =>
  multiple
    ? [...(input.closest(".ui-toggle-group")?.querySelectorAll("input") ?? [])]
        .filter((item) => item.checked && item.name === input.name)
        .map((item) => item.value)
    : input.value

export const isSelected = (
  selected: string | string[] | undefined,
  value: unknown,
) =>
  selected === undefined ? undefined : [selected].flat().includes(String(value))

export const checkedValues = (
  input: HTMLInputElement,
  selected?: string | string[],
) => {
  if (selected === undefined) {
    return [
      ...(input.closest(".ui-toggle-group")?.querySelectorAll("input") ?? []),
    ]
      .filter((item) => item.checked && item.name === input.name)
      .map((item) => item.value)
  }
  const values = [selected].flat()
  if (!input.checked) return values.filter((value) => value !== input.value)
  return values.includes(input.value) ? values : [...values, input.value]
}

export const selectionOf = (
  input: HTMLInputElement,
  multiple?: boolean,
  selected?: string | string[],
) => (multiple ? checkedValues(input, selected) : input.value)

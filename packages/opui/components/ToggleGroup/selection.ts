import { toggleInGroup } from "../group"

export const isSelected = (
  selected: string | string[] | undefined,
  value: unknown,
) =>
  selected === undefined ? undefined : [selected].flat().includes(String(value))

export const checkedValues = (
  input: HTMLInputElement,
  selected?: string | string[],
) =>
  selected === undefined
    ? [...(input.closest(".ui-toggle-group")?.querySelectorAll("input") ?? [])]
        .filter((item) => item.checked && item.name === input.name)
        .map((item) => item.value)
    : toggleInGroup([selected].flat(), input.value, input.checked)

export const selectionOf = (
  input: HTMLInputElement,
  multiple?: boolean,
  selected?: string | string[],
) => (multiple ? checkedValues(input, selected) : input.value)

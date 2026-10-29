export type Props = {
  emptyLabel?: string
  filter?: "auto" | "none"
  variant?: "outlined" | "transparent"
}

export type CommandGroupProps = {
  label?: string
}

export type CommandInputProps = {}

export type CommandInputName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string }

export type CommandListProps = {}

export type CommandGroupSlots<S> = {
  label?: string | S
}

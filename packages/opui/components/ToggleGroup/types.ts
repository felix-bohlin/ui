export type Props = {
  name?: string
  orientation?: "vertical"
  selection?: "single" | "multiple"
  size?: "default" | "small" | "x-small"
}

export type Slots<S> = {
  children: S
}

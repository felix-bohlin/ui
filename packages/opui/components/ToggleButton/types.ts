export type Props = {
  label?: string
  pressed?: boolean
  size?: "small" | "x-small"
  type?: "checkbox" | "radio"
}

export type Slots<S> = {
  children?: S
}

export type Props = {
  label?: string
  pressed?: boolean
  size?: "x-small" | "small" | "medium" | "large"
  type?: "checkbox" | "radio"
}

export type Slots<S> = {
  children?: S
}

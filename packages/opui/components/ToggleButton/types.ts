export type Props = {
  checked?: boolean
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  type?: "checkbox" | "radio"
}

export type Slots<S> = {
  children?: S
}

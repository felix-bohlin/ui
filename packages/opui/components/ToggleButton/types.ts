export type Props = {
  label?: string
  pressed?: boolean
  size?: "x-small" | "small" | "large"
  type?: "checkbox" | "radio"
}

export type Slots<S> = {
  children?: S
}

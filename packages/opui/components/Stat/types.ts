export type Props = {
  description?: string
  label: string
  size?: "small" | "medium" | "large"
}

export type Slots<S> = {
  description?: string | S
  label?: string | S
}

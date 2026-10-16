export type Props = {
  name?: string
  orientation?: "vertical"
  scrollable?: boolean
  selection?: "single" | "multiple"
  shrink?: boolean
  size?: "x-small" | "small" | "large"
}

export type Slots<S> = {
  children?: S
}

export type Props = {
  [key: string]: any
  alignment?: string
  trigger?: "always" | "hover"
}

export type Slots<S> = {
  anchored?: S
}

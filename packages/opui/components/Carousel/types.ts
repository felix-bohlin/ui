export type Props = {
  align?: "start" | "center"
  buttons?: boolean | "outside"
  label?: string
  markers?: boolean
  orientation?: "horizontal" | "vertical"
  peek?: boolean
  perView?: number
}

export type Slots<S> = {
  children?: S
}

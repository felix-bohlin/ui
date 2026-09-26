export type Props = {
  align?: "start" | "center"
  buttons?: boolean
  label?: string
  markers?: boolean
  peek?: boolean
  perView?: number
}

export type Slots<S> = {
  children?: S
}

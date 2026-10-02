export type Props = {
  align?: "start" | "center"
  buttons?: boolean | "outside"
  label?: string
  markers?: boolean
  peek?: boolean
  persistentButtons?: boolean
  perView?: number
}

export type Slots<S> = {
  children?: S
}

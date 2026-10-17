export type Props = {
  align?: "start" | "center"
  aspectRatio?: number | string
  buttons?: boolean | "outside"
  markers?: boolean
  orientation?: "horizontal" | "vertical"
  peek?: boolean
  persistentButtons?: boolean
  perView?: number
  stretch?: boolean
}

export type Slots<S> = {
  children?: S
}

export type Props = {
  align?: "start" | "center"
  aspectRatio?: number | string
  buttons?: "inside" | "none" | "outside"
  itemsPerView?: number
  markers?: boolean
  orientation?: "horizontal" | "vertical"
  peek?: boolean
  persistentButtons?: boolean
  stretch?: boolean
}

export type Slots<S> = {
  children?: S
}

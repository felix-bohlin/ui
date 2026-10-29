export type Props = {
  name?: string
  orientation?: "auto" | "horizontal" | "vertical"
}

export type Context = Pick<Props, "name">

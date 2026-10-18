export type Props = {
  direction?: "row" | "column"
  name?: string
}

export type Context = Pick<Props, "name">

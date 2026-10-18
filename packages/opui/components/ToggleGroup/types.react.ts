import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Model<T> = {
  defaultValue?: T
  onValueChange?: (value: T) => void
  value?: T
}

export type Props = Base.Props &
  Base.Selection<Model<string>, Model<string[]>> &
  Base.Slots<ReactNode> &
  Omit<ComponentProps<"div">, "defaultValue" | "size">

import type * as Base from "./types"
import type { ComponentProps } from "react"

type Model<T> = {
  defaultValue?: T
  onValueChange?: (value: T) => void
  value?: T
}

export type Props = Base.Props &
  Base.Selection<Model<string>, Model<string[]>> &
  Omit<ComponentProps<"div">, "defaultValue" | "size">

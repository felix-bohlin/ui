import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props &
  Base.Selection<
    {
      defaultValue?: string
      onValueChange?: (value: string) => void
      value?: string
    },
    {
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
      value?: string[]
    }
  > &
  Omit<ComponentProps<"div">, "defaultValue" | "size">

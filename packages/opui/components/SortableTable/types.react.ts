import type * as Base from "./types"
import type { HTMLAttributes } from "react"

export type Props = Base.Props &
  HTMLAttributes<HTMLElement> & {
    onSort?: (event: Base.Events["sort"]) => void
  }

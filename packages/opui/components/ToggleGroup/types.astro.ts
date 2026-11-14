import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  Base.Selection<{ value?: string }, { value?: string[] }> &
  Omit<HTMLAttributes<"div">, "size">

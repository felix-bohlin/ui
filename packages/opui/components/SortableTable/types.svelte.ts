import type * as Base from "./types"
import type { HTMLAttributes } from "svelte/elements"

export type Props = Base.Props &
  HTMLAttributes<HTMLElement> & {
    onsort?: (event: CustomEvent<Base.SortDetail>) => void
  }

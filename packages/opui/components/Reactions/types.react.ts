import type * as Base from "./types"
import type { HTMLAttributes } from "react"

export type Props = Base.Props &
  HTMLAttributes<HTMLElement> & {
    onReaction?: (event: CustomEvent<Base.ReactionDetail>) => void
  }

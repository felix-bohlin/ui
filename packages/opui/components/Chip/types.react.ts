import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

// prettier-ignore
export type Props = Base.Props &
  Slots &
  (
    | ({ as?: "a" } & ComponentProps<"a">)
    | ({ as?: "button" } & ComponentProps<"button">)
    | ({ as?: "div" } & ComponentProps<"div">)
  )

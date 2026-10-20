import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  (
    | ({ as?: "legend" } & JSX.HTMLAttributes<HTMLLegendElement>)
    | ({ as: "p" } & JSX.HTMLAttributes<HTMLParagraphElement>)
  )

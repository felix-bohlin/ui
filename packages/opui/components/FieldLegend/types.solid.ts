import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  (
    | ({ as?: "legend" } & JSX.HTMLAttributes<HTMLLegendElement>)
    | ({ as: "p" } & JSX.HTMLAttributes<HTMLParagraphElement>)
  )

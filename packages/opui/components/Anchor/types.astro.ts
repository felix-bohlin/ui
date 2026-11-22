import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"span">

export type AnchorContentProps = Base.AnchorContentProps &
  HTMLAttributes<"span">

import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"span">

export type AnchorContentProps = Base.AnchorContentProps &
  ComponentProps<"span">

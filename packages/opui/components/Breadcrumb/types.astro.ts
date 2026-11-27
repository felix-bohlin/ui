import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"nav">

export type BreadcrumbItemProps = Base.BreadcrumbItemProps &
  HTMLAttributes<"li">

import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & Base.Slots<ReactNode> & ComponentProps<"nav">

export type BreadcrumbItemProps = Base.BreadcrumbItemProps &
  Base.BreadcrumbItemSlots<ReactNode> &
  ComponentProps<"li">

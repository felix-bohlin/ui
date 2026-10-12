import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Base.Props &
  Slots &
  Omit<ComponentProps<"dialog">, "closedby" | "id" | keyof Slots>

export type DrawerFooterProps = Base.DrawerFooterProps & ComponentProps<"div">

export type DrawerHeaderProps = Base.DrawerHeaderProps & ComponentProps<"div">

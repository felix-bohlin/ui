import type * as Base from "./types"
import type { ComponentProps, ComponentType, ReactNode } from "react"

export type MenuItem = Base.MenuItem<ComponentType<any>> &
  Omit<
    ComponentProps<"a"> & ComponentProps<"button">,
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<ReactNode> & {
    items?: MenuItem[]
  } & Omit<ComponentProps<"menu">, "id" | "popover">

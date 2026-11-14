import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type MenuItem = Base.MenuItem &
  Omit<
    ComponentProps<"a"> & ComponentProps<"button">,
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<ReactNode> & {
    items?: MenuItem[]
  } & Omit<ComponentProps<"menu">, "id" | "popover">

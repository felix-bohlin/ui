import type * as Base from "./types"
import type { ComponentProps, ComponentType, ReactNode } from "react"

export type MenuItem =
  | (Base.MenuItem<ComponentType<any>> & { href?: undefined } & Omit<
        ComponentProps<"button">,
        "children" | keyof Base.MenuItem
      >)
  | (Base.MenuItem<ComponentType<any>> & { href: string } & Omit<
        ComponentProps<"a">,
        "children" | keyof Base.MenuItem
      >)

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<ReactNode> & {
    items?: MenuItem[]
  } & Omit<ComponentProps<"menu">, "id" | "popover">

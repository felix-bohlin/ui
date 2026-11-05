import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type MenuItem = Base.MenuItem &
  Omit<
    Omit<ComponentProps<"a">, "href"> &
      Omit<ComponentProps<"button">, "disabled">,
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> & {
  items?: MenuItem[]
} & Omit<ComponentProps<"menu">, "id" | "popover">

import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type MenuItem = Base.MenuItem &
  Omit<
    HTMLAttributes<"a"> & HTMLAttributes<"button">,
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> & {
  items?: MenuItem[]
} & Omit<HTMLAttributes<"menu">, "id" | "popover">

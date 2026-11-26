import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type MenuItem =
  | (Base.MenuItem & { href?: undefined } & Omit<
        HTMLAttributes<"button">,
        keyof Base.MenuItem | "children"
      >)
  | (Base.MenuItem & { href: string } & Omit<
        HTMLAttributes<"a">,
        keyof Base.MenuItem | "children"
      >)

export type Props = Omit<Base.Props, "items"> & {
  items?: MenuItem[]
} & Omit<HTMLAttributes<"menu">, "id" | "popover">

import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "label"> &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: "a" } & Omit<ComponentProps<"a">, "children" | "href">)
    | ({ as: "button" } & Omit<
        ComponentProps<"button">,
        "children" | "disabled"
      >)
    | ({ as?: "div" } & Omit<ComponentProps<"div">, "children">)
  )

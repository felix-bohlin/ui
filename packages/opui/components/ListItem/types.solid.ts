import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "description" | "label"> &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: never; href?: never } & Omit<ComponentProps<"li">, "type">)
    | ({ as?: "a"; href: string } & Omit<ComponentProps<"a">, "href" | "type">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "disabled" | "type">)
  )

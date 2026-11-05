import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  (
    | ({ as?: "div" } & ComponentProps<"div">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "disabled">)
    | ({ as?: "a" } & Omit<ComponentProps<"a">, "href" | "shape">)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

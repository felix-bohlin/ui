import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  (
    | ({ as?: "div"; href?: never } & ComponentProps<"div">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "disabled"> &
        Base.Named)
    | ({ as?: "a" } & Omit<ComponentProps<"a">, "href" | "shape"> & Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

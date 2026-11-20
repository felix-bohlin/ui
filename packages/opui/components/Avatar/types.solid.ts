import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"
import type { Component } from "solid-js"

export type Props = Base.Props<Component<any>> &
  (
    | ({ as?: "div"; href?: never } & ComponentProps<"div">)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "disabled"> &
        Base.Named)
    | ({ as?: "a" | Component<any> } & Omit<
        ComponentProps<"a">,
        "href" | "shape"
      > &
        Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & ComponentProps<"div">

import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"
import type { Component } from "solid-js"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<
  Base.Props<Component<any>>,
  "description" | "label"
> &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: never; href?: never } & ComponentProps<"li">)
    | ({ as?: "a" | Component<any>; href: string } & Omit<
        ComponentProps<"a">,
        "href" | "type"
      >)
    | ({ as: "button" } & Omit<ComponentProps<"button">, "disabled">)
  )

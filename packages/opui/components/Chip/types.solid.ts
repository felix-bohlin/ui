import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"
import type { Component } from "solid-js"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props<Component<any>>, "label"> &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: "a" | Component<any> } & Omit<
        ComponentProps<"a">,
        "children" | "href"
      >)
    | ({ as: "button" } & Omit<
        ComponentProps<"button">,
        "children" | "disabled"
      >)
    | ({ as?: "div" } & Omit<ComponentProps<"div">, "children">)
    | ({ as: "span" } & Omit<ComponentProps<"span">, "children">)
  )

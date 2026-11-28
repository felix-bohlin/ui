import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"
import type { Component } from "solid-js"

export type MenuItem =
  | (Base.MenuItem<Component<any>> & { href?: undefined } & Omit<
        ComponentProps<"button">,
        "children" | keyof Base.MenuItem
      >)
  | (Base.MenuItem<Component<any>> & { href: string } & Omit<
        ComponentProps<"a">,
        "children" | keyof Base.MenuItem
      >)

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<JSX.Element> & {
    items?: MenuItem[]
  } & Omit<ComponentProps<"menu">, "id" | "popover">

import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"
import type { Component } from "solid-js"

export type MenuItem = Base.MenuItem<Component<any>> &
  Omit<
    Omit<ComponentProps<"a">, "href"> &
      Omit<ComponentProps<"button">, "disabled">,
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<JSX.Element> & {
    items?: MenuItem[]
  } & Omit<ComponentProps<"menu">, "id" | "popover">

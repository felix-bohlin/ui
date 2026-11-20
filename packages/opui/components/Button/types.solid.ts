import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"
import type { Component } from "solid-js"

export type Props =
  | (Base.Props<Component<any>> &
      Base.Slots<JSX.Element> & { as?: "button"; href?: never } & Omit<
        ComponentProps<"button">,
        "disabled"
      >)
  | (Base.Props<Component<any>> &
      Base.Slots<JSX.Element> & {
        as?: "a" | Component<any>
        href: string
      } & Omit<ComponentProps<"a">, "href">)

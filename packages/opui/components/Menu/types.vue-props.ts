import type { Component, IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type { MenuItem as BaseMenuItem, Props as BaseProps } from "./types"

export type MenuItem =
  | (BaseMenuItem<Component> & { href?: undefined } & Omit<
        IntrinsicElementAttributes["button"],
        keyof BaseMenuItem<Component> | "children"
      >)
  | (BaseMenuItem<Component> & { href: string } & Omit<
        IntrinsicElementAttributes["a"],
        keyof BaseMenuItem<Component> | "children"
      >)

export type Props = Omit<BaseProps, "items"> & {
  items?: MenuItem[]
}

export type Slots = { "icon-checked"?: Slot } & DefaultSlots

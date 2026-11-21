import type { Component, IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { MenuItem as BaseMenuItem, Props as BaseProps } from "./types"

export type MenuItem = BaseMenuItem<Component> &
  Omit<
    IntrinsicElementAttributes["a"] & IntrinsicElementAttributes["button"],
    keyof BaseMenuItem<Component> | "children"
  >

export type Props = Omit<BaseProps, "items"> & {
  items?: MenuItem[]
} & Class

export type Slots = { "icon-checked"?: Slot } & DefaultSlots

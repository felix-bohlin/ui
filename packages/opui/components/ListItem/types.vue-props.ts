import type { Component, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps<Component>

export type Slots = {
  description?: Slot
  end?: Slot
  "icon-checked"?: Slot
  label?: Slot
  start?: Slot
  submenu?: Slot
} & DefaultSlots

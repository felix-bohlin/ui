import type { HTMLAttributes, Slot } from "vue"

export type Class = {
  class?: HTMLAttributes["class"]
}

export type DefaultSlots = {
  default?: Slot
}

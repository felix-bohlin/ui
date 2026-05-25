import type { HTMLAttributes, InjectionKey, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  default?: Slot
}

export const ToggleGroupKey = Symbol() as InjectionKey<{
  name: string
  type: "radio" | "checkbox"
}>

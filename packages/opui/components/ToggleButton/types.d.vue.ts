import type { HTMLAttributes, InputHTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
  disabled?: InputHTMLAttributes["disabled"]
  id?: HTMLAttributes["id"]
  name?: InputHTMLAttributes["name"]
  value?: InputHTMLAttributes["value"]
}

export type Slots = {
  default?: Slot
}

import type { InputHTMLAttributes } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    name?: InputHTMLAttributes["name"]
    value?: InputHTMLAttributes["value"]
  }

export type Slots = DefaultSlots

import type { HTMLAttributes, InputHTMLAttributes, Slot } from "vue"
import type * as Base from "./types"

type InputProps = {
  type?: InputHTMLAttributes["type"] | "numeric"
} & Pick<InputHTMLAttributes, Exclude<Base.InputProps, "type" | "value">>

export type Props = Base.Props &
  InputProps & {
    class?: HTMLAttributes["class"]
    id?: HTMLAttributes["id"]
  }

export type Slots = {
  default?: Slot
  description?: Slot
  "end-text"?: Slot
  footer?: Slot
  header?: Slot
  label?: Slot
  prefix?: Slot
  "supporting-text"?: Slot
  suffix?: Slot
}

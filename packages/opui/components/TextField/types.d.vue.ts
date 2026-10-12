import type { HTMLAttributes, InputHTMLAttributes, Slot } from "vue"
import type {
  Props as BaseProps,
  TextFieldInputProps as BaseTextFieldInputProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type Props = BaseProps & Class

export type TextFieldInputProps = BaseTextFieldInputProps &
  Class & {
    type?: InputHTMLAttributes["type"] | "numeric"
  }

export type Slots = {
  default?: Slot
}

import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  Props as BaseProps,
  RadioInputProps as BaseRadioInputProps,
} from "./types"

export type Props = BaseProps & Class

export type RadioInputProps = BaseRadioInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

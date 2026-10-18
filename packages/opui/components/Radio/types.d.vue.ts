import type { Slot } from "vue"
import type { Class } from "../vue"
import type {
  RadioInputProps as BaseRadioInputProps,
  RadioProps as BaseRadioProps,
} from "./types"

export type RadioProps = BaseRadioProps & Class

export type RadioInputProps = BaseRadioInputProps & Class

export type Slots = {
  default?: Slot
  "end-text"?: Slot
}

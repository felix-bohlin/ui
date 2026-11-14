import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  RadioInputProps as BaseRadioInputProps,
} from "./types"

export type Props = BaseProps & Class

export type RadioInputProps = BaseRadioInputProps &
  Class & { name?: IntrinsicElementAttributes["input"]["name"] }

export type Slots = { "end-text"?: Slot } & DefaultSlots

import type { IntrinsicElementAttributes, Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  RadioInputProps as BaseRadioInputProps,
} from "./types"

export type Props = BaseProps

export type RadioInputProps = BaseRadioInputProps & {
  name?: IntrinsicElementAttributes["input"]["name"]
}

export type Slots = { "end-text"?: Slot } & DefaultSlots

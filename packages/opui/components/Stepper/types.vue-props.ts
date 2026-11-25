import type { Slot } from "vue"
import type { DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  StepperItemProps as BaseStepperItemProps,
} from "./types"

export type Props = BaseProps

export type StepperItemProps = BaseStepperItemProps

export type Slots = DefaultSlots

export type StepperItemSlots = {
  description?: Slot
  "icon-complete"?: Slot
  label?: Slot
}

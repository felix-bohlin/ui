import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  Props as BaseProps,
  StepperItemProps as BaseStepperItemProps,
} from "./types"

export type Props = BaseProps & Class

export type StepperItemProps = BaseStepperItemProps & Class

export type Slots = DefaultSlots

export type StepperItemSlots = {
  description?: Slot
  "icon-checked"?: Slot
  label?: Slot
}

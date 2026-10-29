import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type {
  CommandGroupProps as BaseCommandGroupProps,
  CommandInputProps as BaseCommandInputProps,
  CommandListProps as BaseCommandListProps,
  Props as BaseProps,
} from "./types"

export type Props = BaseProps & Class

export type CommandGroupProps = BaseCommandGroupProps & Class

export type CommandInputProps = BaseCommandInputProps & Class

export type CommandListProps = BaseCommandListProps & Class

export type Slots = DefaultSlots

export type CommandGroupSlots = {
  default?: Slot
  label?: Slot
}

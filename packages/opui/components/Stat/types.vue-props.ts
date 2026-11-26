import type { Slot } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class

export type Slots = { description?: Slot; label?: Slot } & DefaultSlots

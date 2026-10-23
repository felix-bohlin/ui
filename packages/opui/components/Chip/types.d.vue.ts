import type { Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps, Slots as BaseSlots } from "./types"

export type Props = BaseProps & Class

export type Slots = BaseSlots<Slot>

import type { Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class

export type Slots = { "icon-checked"?: Slot; "icon-unchecked"?: Slot }

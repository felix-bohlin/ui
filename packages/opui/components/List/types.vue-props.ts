import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & Class & { as?: "ol" | "ul" }

export type Slots = DefaultSlots

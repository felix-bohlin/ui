import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & { as?: "div" | "fieldset" }

export type Slots = DefaultSlots

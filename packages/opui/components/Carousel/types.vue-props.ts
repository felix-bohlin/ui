import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby"> & Class

export type Slots = DefaultSlots

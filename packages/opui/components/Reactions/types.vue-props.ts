import type { DefaultSlots } from "../vue"
import type { Events as BaseEvents, Props as BaseProps } from "./types"

export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby">

export type Emits = { reaction: [event: BaseEvents["reaction"]] }

export type Slots = DefaultSlots

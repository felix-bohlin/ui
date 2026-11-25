import type { DefaultSlots } from "../vue"
import type { Events as BaseEvents, Props as BaseProps } from "./types"

export type Props = BaseProps

export type Emits = { sort: [event: BaseEvents["sort"]] }

export type Slots = DefaultSlots

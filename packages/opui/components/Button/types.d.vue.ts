import type { Class, DefaultSlots } from "../vue"
import type { IconOnlyProps, SharedProps } from "./types"

export type Props = SharedProps &
  Class & {
    iconOnly?: boolean
  } & /* @vue-ignore */ IconOnlyProps

export type Slots = DefaultSlots

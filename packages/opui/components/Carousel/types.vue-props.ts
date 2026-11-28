import type { IntrinsicElementAttributes } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby"> &
  (
    | {
        markerLabel?: string
        markers: boolean
      }
    | {
        markerLabel?: never
        markers?: never
      }
  ) & { role?: IntrinsicElementAttributes["ul"]["role"] }

export type Slots = DefaultSlots

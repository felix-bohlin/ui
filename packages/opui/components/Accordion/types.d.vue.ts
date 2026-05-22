import type { DetailsHTMLAttributes, HTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Pick<DetailsHTMLAttributes, "name" | "open"> & {
    class?: HTMLAttributes["class"]
  }

export type Slots = {
  actions?: Slot
  default?: Slot
  marker?: Slot
  summary?: Slot
}

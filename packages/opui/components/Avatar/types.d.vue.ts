import type { HTMLAttributes, ImgHTMLAttributes, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Pick<ImgHTMLAttributes, "alt" | "src"> & {
    class?: HTMLAttributes["class"]
  }

export type Slots = {
  default?: Slot
}

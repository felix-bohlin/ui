import type { HTMLAttributes, ImgHTMLAttributes, Slot } from "vue"
import type { ImageProps, Props as BaseProps } from "./types"

export type Props = BaseProps &
  Pick<ImgHTMLAttributes, ImageProps> & {
    class?: HTMLAttributes["class"]
  }

export type Slots = {
  default?: Slot
}

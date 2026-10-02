import type { HTMLAttributes } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

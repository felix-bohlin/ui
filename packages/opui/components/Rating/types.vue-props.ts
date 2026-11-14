import type { IntrinsicElementAttributes } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    lang?:
      | IntrinsicElementAttributes["fieldset"]["lang"]
      | IntrinsicElementAttributes["meter"]["lang"]
  }

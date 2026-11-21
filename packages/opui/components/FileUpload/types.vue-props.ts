import type { IntrinsicElementAttributes } from "vue"
import type { Class } from "../vue"
import type { Events as BaseEvents, Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & { id?: IntrinsicElementAttributes["div"]["id"] }

export type Emits = {
  remove: [event: BaseEvents["remove"]]
  select: [event: BaseEvents["select"]]
}

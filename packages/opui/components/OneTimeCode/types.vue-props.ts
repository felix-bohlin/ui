import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & { name?: IntrinsicElementAttributes["input"]["name"]; value?: string }

export type Slots = { "end-text"?: Slot; label?: Slot }

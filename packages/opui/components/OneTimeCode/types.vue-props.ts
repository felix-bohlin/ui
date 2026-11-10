import type { IntrinsicElementAttributes, Slot } from "vue"
import type { Class } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps &
  Class & {
    autocapitalize?: IntrinsicElementAttributes["input"]["autocapitalize"]
    inputmode?: IntrinsicElementAttributes["input"]["inputmode"]
    name?: IntrinsicElementAttributes["input"]["name"]
    pattern?: IntrinsicElementAttributes["input"]["pattern"]
    spellcheck?: IntrinsicElementAttributes["input"]["spellcheck"]
    value?: string
  }

export type Slots = { "end-text"?: Slot; label?: Slot }

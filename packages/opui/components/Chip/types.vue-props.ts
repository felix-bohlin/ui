import type { Component, Slot } from "vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps<Component>

export type Slots = { end?: Slot; label?: Slot; start?: Slot }

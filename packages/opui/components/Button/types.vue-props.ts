import type { Component } from "vue"
import type { DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps<Component>

export type Slots = DefaultSlots

import type { Component } from "vue"
import type { Class, DefaultSlots } from "../vue"
import type { Props as BaseProps } from "./types"

export type Props = BaseProps<Component> & Class

export type Slots = DefaultSlots

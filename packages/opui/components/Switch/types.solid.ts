import type * as Base from "./types"
import type { JSX } from "solid-js"

type Slots = Base.SwitchSlots<JSX.Element>

export type SwitchProps = Omit<Base.SwitchProps, keyof Slots> &
  Slots &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

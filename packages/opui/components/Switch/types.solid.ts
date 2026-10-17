import type * as Base from "./types"
import type { JSX } from "solid-js"

export type SwitchProps = Base.SwitchProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size"> &
  Base.SwitchSlots<JSX.Element>

export type SwitchInputProps = Base.SwitchInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

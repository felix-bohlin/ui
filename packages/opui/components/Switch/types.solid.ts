import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type SwitchInputProps = Base.SwitchInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

export type SwitchProps = Base.SwitchProps &
  Base.SwitchSlots<JSX.Element> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">

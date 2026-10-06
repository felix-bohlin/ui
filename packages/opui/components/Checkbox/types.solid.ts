import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type CheckboxInputProps = Base.CheckboxInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

export type CheckboxProps = Base.CheckboxProps &
  Base.CheckboxSlots<JSX.Element> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">

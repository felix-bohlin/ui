import type * as Base from "./types"
import type { JSX } from "solid-js"

export type CheckboxInputProps = Base.CheckboxInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

export type CheckboxProps = Base.CheckboxProps &
  JSX.LabelHTMLAttributes<HTMLLabelElement>

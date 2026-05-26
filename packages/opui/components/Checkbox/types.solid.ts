import type * as Base from "./types"
import type { JSX } from "solid-js"

export type CheckboxProps = Base.CheckboxProps & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  endText?: JSX.Element
}

export type CheckboxInputProps = Base.CheckboxInputProps & JSX.InputHTMLAttributes<HTMLInputElement>

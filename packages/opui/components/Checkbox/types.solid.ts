import type * as Base from "./types"
import type { JSX } from "solid-js"

type Slots = Base.CheckboxSlots<JSX.Element>

export type CheckboxProps = Omit<Base.CheckboxProps, keyof Slots> &
  Slots &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type">

export type CheckboxInputProps = Base.CheckboxInputProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

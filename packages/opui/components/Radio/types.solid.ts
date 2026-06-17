import type * as Base from "./types"
import type { JSX } from "solid-js"

export type RadioInputProps = Base.RadioInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

export type RadioProps = Base.RadioProps &
  Partial<Base.RadioSlots<JSX.Element>> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">

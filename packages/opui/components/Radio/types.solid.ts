import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type RadioInputProps = Base.RadioInputProps &
  JSX.InputHTMLAttributes<HTMLInputElement>

export type RadioProps = Base.RadioProps &
  Base.RadioSlots<JSX.Element> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size">

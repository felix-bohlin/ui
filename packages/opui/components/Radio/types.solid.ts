import type * as Base from "./types"
import type { JSX } from "solid-js"

type Slots = Base.RadioSlots<JSX.Element>

export type RadioProps = Omit<Base.RadioProps, keyof Slots> &
  Slots &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type">

export type RadioInputProps = Base.RadioInputProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

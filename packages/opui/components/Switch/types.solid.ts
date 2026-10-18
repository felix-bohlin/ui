import type * as Base from "./types"
import type { JSX } from "solid-js"

type Slots = Base.Slots<JSX.Element>

export type Props = Omit<Base.Props, keyof Slots> &
  Slots &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

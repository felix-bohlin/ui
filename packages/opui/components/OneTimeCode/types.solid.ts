import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "maxLength" | "size" | "type"
  > &
  Partial<Base.Slots<JSX.Element>>

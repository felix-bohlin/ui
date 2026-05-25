import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  type?: "checkbox" | "radio"
}

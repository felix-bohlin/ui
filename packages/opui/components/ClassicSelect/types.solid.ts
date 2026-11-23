import type * as Base from "./types"
import type { JSX } from "solid-js"

export type ClassicSelectProps = Base.ClassicSelectProps &
  Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "size">

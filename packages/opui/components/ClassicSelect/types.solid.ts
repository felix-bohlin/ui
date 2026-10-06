import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type ClassicSelectProps = Base.ClassicSelectProps &
  Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "size">

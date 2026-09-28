import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "size" | "type">

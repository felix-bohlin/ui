import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

type Slots = Base.Slots<JSX.Element>

export type Props = Omit<Base.Props, keyof Slots> &
  Slots &
  Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "prefix" | "size">

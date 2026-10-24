import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & Omit<HTMLAttributes<"input">, "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<HTMLAttributes<"input">, "type">

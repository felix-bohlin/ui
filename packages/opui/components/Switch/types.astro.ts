import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  Omit<HTMLAttributes<"input">, "role" | "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<HTMLAttributes<"input">, "role" | "type">

import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type SwitchProps = Base.SwitchProps &
  Omit<HTMLAttributes<"input">, "size">
export type SwitchInputProps = Base.SwitchInputProps & HTMLAttributes<"input">

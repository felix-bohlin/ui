import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type RadioProps = Base.RadioProps & HTMLAttributes<"input">
export type RadioInputProps = Base.RadioInputProps &
  Omit<HTMLAttributes<"input">, "type">

import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type RadioProps = Base.RadioProps &
  Omit<HTMLAttributes<"input">, "size" | "type">

export type RadioInputProps = Base.RadioInputProps &
  Omit<HTMLAttributes<"input">, "type">

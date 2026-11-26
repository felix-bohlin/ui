import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props &
  Omit<HTMLAttributes<"input">, keyof Base.Props | "type">

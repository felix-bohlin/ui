import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type { Item } from "./types"

export type ClassicSelectProps = Base.ClassicSelectProps &
  HTMLAttributes<"label"> &
  HTMLAttributes<"select">

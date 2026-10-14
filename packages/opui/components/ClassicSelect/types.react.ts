import type * as Base from "./types"
import type { ComponentProps } from "react"

export type ClassicSelectProps = Base.ClassicSelectProps &
  Omit<ComponentProps<"select">, "size">

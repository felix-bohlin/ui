import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type CheckboxProps = Base.CheckboxProps &
  Omit<HTMLAttributes<"input">, "size">

export type CheckboxInputProps = Base.CheckboxInputProps &
  HTMLAttributes<"input">

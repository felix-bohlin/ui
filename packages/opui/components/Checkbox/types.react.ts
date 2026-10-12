import type * as Base from "./types"
import type { ComponentProps } from "react"

export type CheckboxProps = Base.CheckboxProps & ComponentProps<"label">

export type CheckboxInputProps = Base.CheckboxInputProps &
  ComponentProps<"input">

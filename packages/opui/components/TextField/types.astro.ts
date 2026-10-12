import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"label">

export type TextFieldInputProps = Base.TextFieldInputProps & {
  // Add 'numeric' as valid input type
  type?: HTMLAttributes<"input">["type"] | "numeric"
} & Omit<HTMLAttributes<"input">, "type">

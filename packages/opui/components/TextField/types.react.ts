import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"label">

export type TextFieldInputProps = Base.TextFieldInputProps & {
  type?: ComponentProps<"input">["type"] | "numeric"
} & Omit<ComponentProps<"input">, "type">

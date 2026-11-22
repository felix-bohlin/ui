import type * as Base from "./types"
import type { ComponentProps } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "for"> & {
  htmlFor: Base.Props["for"]
} & ComponentProps<"opui-step-button">

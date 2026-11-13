import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & {
  defaultValue?: number | string
  onValueChange?: (value: number | string) => void
} & Omit<
    Omit<ComponentProps<"fieldset">, "children" | "defaultValue"> &
      Omit<ComponentProps<"meter">, "children" | "defaultValue">,
    keyof Base.Props
  >

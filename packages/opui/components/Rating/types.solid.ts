import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props & {
  defaultValue?: number | string
  onValueChange?: (value: number | string) => void
} & Omit<
    Omit<
      ComponentProps<"fieldset">,
      "children" | "defaultValue" | "disabled" | "name"
    > &
      Omit<
        ComponentProps<"meter">,
        "children" | "defaultValue" | "max" | "value"
      >,
    keyof Base.Props
  >

import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props =
  | (Base.Props & {
      defaultValue?: number | string
      onValueChange?: (value: number | string) => void
    } & { name: string } & Omit<
        ComponentProps<"fieldset">,
        "children" | "defaultValue" | keyof Base.Props
      >)
  | (Base.Props & {
      defaultValue?: number | string
      onValueChange?: (value: number | string) => void
    } & { name?: undefined } & Omit<
        ComponentProps<"meter">,
        "children" | "defaultValue" | keyof Base.Props
      >)

import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  Omit<
    Omit<ComponentProps<"fieldset">, "children" | "disabled" | "name"> &
      Omit<ComponentProps<"meter">, "children" | "max" | "value">,
    keyof Base.Props
  >

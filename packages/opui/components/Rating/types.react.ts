import type * as Base from "./types"
import type { ChangeEventHandler, ComponentProps } from "react"

export type Props = Base.Props & {
  onChange?: ChangeEventHandler<HTMLInputElement>
} & Omit<
    Omit<ComponentProps<"fieldset">, "children" | "onChange"> &
      Omit<ComponentProps<"meter">, "children" | "onChange">,
    keyof Base.Props
  >

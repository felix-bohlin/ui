import type * as Base from "./types"
import type { ChangeEventHandler, ComponentProps } from "react"

export type Props = Base.Props & {
  onChange?: ChangeEventHandler<HTMLInputElement>
} & Omit<
    ComponentProps<"fieldset"> & ComponentProps<"meter">,
    keyof Base.Props | "onChange"
  >

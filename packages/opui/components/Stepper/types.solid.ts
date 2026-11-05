import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Base.Props & ComponentProps<"ol">

export type StepperItemProps = Without<
  Base.StepperItemProps,
  "description" | "label"
> &
  Base.StepperItemSlots<JSX.Element> &
  Omit<ComponentProps<"li">, "children">

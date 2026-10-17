import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Partial<Base.Slots<ReactNode>>

export type Props = Omit<Base.Props, keyof Slots> &
  Omit<ComponentProps<"textarea">, keyof Slots> &
  Slots

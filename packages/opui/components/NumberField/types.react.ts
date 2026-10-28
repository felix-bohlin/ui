import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Omit<Base.Props, keyof Slots> &
  Omit<ComponentProps<"input">, "size" | "type" | keyof Slots> &
  Slots

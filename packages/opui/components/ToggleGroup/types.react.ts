import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props &
  Partial<Base.Slots<ReactNode>> &
  Omit<ComponentProps<"div">, "size">

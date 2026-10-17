import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Omit<Base.Props, keyof Base.Slots<ReactNode>> &
  Base.Slots<ReactNode> &
  Omit<ComponentProps<"select">, "prefix" | "size">

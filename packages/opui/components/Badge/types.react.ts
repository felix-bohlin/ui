import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Base.Props & Slots & ComponentProps<"span">

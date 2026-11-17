import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  ComponentProps<"span">

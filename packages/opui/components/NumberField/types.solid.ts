import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText" | "label" | "startText"> &
  Base.Slots<JSX.Element> &
  Omit<ComponentProps<"input">, "children" | "size" | "type">

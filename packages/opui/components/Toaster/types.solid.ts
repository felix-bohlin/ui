import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  Omit<ComponentProps<"opui-toaster">, "children" | "duration" | "id">

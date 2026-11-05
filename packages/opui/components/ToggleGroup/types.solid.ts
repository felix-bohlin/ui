import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props &
  Base.Selection<
    { onValueChange?: (value: string) => void; value?: string },
    { onValueChange?: (value: string[]) => void; value?: string[] }
  > &
  Omit<ComponentProps<"div">, "size">

import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never

export type Props = DistributiveOmit<
  Base.Props,
  keyof Base.Slots<JSX.Element>
> &
  Base.Slots<JSX.Element> &
  Omit<
    JSX.AnchorHTMLAttributes<HTMLElement> &
      JSX.ButtonHTMLAttributes<HTMLElement>,
    keyof Base.Props | "ref" | "type"
  >

import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Omit<Base.Props, keyof Base.Slots<JSX.Element>> &
  Partial<Base.Slots<JSX.Element>> &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "prefix" | "type"> & {
    type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"] | "numeric"
  }

import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Omit<Base.Props, keyof Base.Slots<JSX.Element>> &
  Base.Slots<JSX.Element> &
  Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">

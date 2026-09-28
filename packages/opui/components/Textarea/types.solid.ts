import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Omit<Base.Props, keyof Base.Slots<JSX.Element>> &
  Omit<Base.Slots<JSX.Element>, "startText"> &
  Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix">

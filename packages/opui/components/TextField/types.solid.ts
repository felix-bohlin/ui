import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: "text" | "password" | "email" | "number" | "numeric" | "search" | "tel" | "url" | "date" | "time" | "datetime-local" | "month" | "week" | "color" | string
} & Partial<Base.Slots<JSX.Element>>

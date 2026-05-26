import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & Partial<Base.Slots<JSX.Element>>

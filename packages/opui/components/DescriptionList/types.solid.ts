import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLDListElement>

export type DescriptionProps = JSX.HTMLAttributes<HTMLElement>

export type ItemProps = JSX.HTMLAttributes<HTMLDivElement>

export type TermProps = JSX.HTMLAttributes<HTMLElement>

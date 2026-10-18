import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLElement>

export type CalloutContentProps = Base.CalloutContentProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type CalloutIconProps = Base.CalloutIconProps &
  JSX.SvgSVGAttributes<SVGSVGElement>

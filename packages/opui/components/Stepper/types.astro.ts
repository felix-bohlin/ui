import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"ol">

export type StepperItemProps = Base.StepperItemProps & HTMLAttributes<"li">

import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & Omit<HTMLAttributes<"div">, "id" | "popover">

export type PopoverContentProps = Base.PopoverContentProps &
  HTMLAttributes<"div">

export type PopoverFooterProps = Base.PopoverFooterProps & HTMLAttributes<"div">

export type PopoverHeaderProps = Base.PopoverHeaderProps & HTMLAttributes<"div">

export type PopoverTitleProps = Base.PopoverTitleProps & HTMLAttributes<"h2">

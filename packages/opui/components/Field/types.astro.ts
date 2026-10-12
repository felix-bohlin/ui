import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type FieldControlProps = Base.FieldControlProps & HTMLAttributes<"span">

export type FieldEndTextProps = Base.FieldEndTextProps & HTMLAttributes<"span">

export type FieldFooterProps = Base.FieldFooterProps & HTMLAttributes<"span">

export type FieldHeaderProps = Base.FieldHeaderProps & HTMLAttributes<"span">

export type FieldLabelProps = Base.FieldLabelProps & HTMLAttributes<"span">

export type FieldPrefixProps = Base.FieldPrefixProps & HTMLAttributes<"span">

export type FieldStartTextProps = Base.FieldStartTextProps &
  HTMLAttributes<"span">

export type FieldSuffixProps = Base.FieldSuffixProps & HTMLAttributes<"span">

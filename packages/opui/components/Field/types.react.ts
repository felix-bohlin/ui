import type * as Base from "./types"
import type { ComponentProps } from "react"

export type FieldControlProps = Base.FieldControlProps & ComponentProps<"span">

export type FieldEndTextProps = Base.FieldEndTextProps & ComponentProps<"span">

export type FieldFooterProps = Base.FieldFooterProps & ComponentProps<"span">

export type FieldHeaderProps = Base.FieldHeaderProps & ComponentProps<"span">

export type FieldLabelProps = Base.FieldLabelProps & ComponentProps<"span">

export type FieldPrefixProps = Base.FieldPrefixProps & ComponentProps<"span">

export type FieldStartTextProps = Base.FieldStartTextProps &
  ComponentProps<"span">

export type FieldSuffixProps = Base.FieldSuffixProps & ComponentProps<"span">

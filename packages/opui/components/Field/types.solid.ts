import type * as Base from "./types"
import type { JSX } from "solid-js"

export type FieldControlProps = Base.FieldControlProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldEndTextProps = Base.FieldEndTextProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldFooterProps = Base.FieldFooterProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldHeaderProps = Base.FieldHeaderProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldLabelProps = Base.FieldLabelProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldPrefixProps = Base.FieldPrefixProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldStartTextProps = Base.FieldStartTextProps &
  JSX.HTMLAttributes<HTMLSpanElement>

export type FieldSuffixProps = Base.FieldSuffixProps &
  JSX.HTMLAttributes<HTMLSpanElement>

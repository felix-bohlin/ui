import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type FieldControlProps = Base.FieldControlProps &
  SvelteHTMLElements["span"]

export type FieldEndTextProps = Base.FieldEndTextProps &
  SvelteHTMLElements["span"]

export type FieldFooterProps = Base.FieldFooterProps &
  SvelteHTMLElements["span"]

export type FieldHeaderProps = Base.FieldHeaderProps &
  SvelteHTMLElements["span"]

export type FieldLabelProps = Base.FieldLabelProps & SvelteHTMLElements["span"]

export type FieldPrefixProps = Base.FieldPrefixProps &
  SvelteHTMLElements["span"]

export type FieldStartTextProps = Base.FieldStartTextProps &
  SvelteHTMLElements["span"]

export type FieldSuffixProps = Base.FieldSuffixProps &
  SvelteHTMLElements["span"]

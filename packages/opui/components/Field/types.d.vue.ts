import type { HTMLAttributes, InjectionKey, Slot } from "vue"
import type {
  FieldControlProps as BaseFieldControlProps,
  FieldEndTextProps as BaseFieldEndTextProps,
  FieldFooterProps as BaseFieldFooterProps,
  FieldHeaderProps as BaseFieldHeaderProps,
  FieldLabelProps as BaseFieldLabelProps,
  FieldPrefixProps as BaseFieldPrefixProps,
  FieldStartTextProps as BaseFieldStartTextProps,
  FieldSuffixProps as BaseFieldSuffixProps,
} from "./types"

type Class = {
  class?: HTMLAttributes["class"]
}

export type FieldControlProps = BaseFieldControlProps & Class

export type FieldEndTextProps = BaseFieldEndTextProps & Class

export type FieldFooterProps = BaseFieldFooterProps & Class

export type FieldHeaderProps = BaseFieldHeaderProps & Class

export type FieldLabelProps = BaseFieldLabelProps & Class

export type FieldPrefixProps = BaseFieldPrefixProps & Class

export type FieldStartTextProps = BaseFieldStartTextProps & Class

export type FieldSuffixProps = BaseFieldSuffixProps & Class

export type Slots = {
  default?: Slot
}

export type FieldRoot = {
  describedBy?: string
  endTextId: string
  readonly invalid?: boolean
}

export const FieldRootKey = Symbol() as InjectionKey<FieldRoot>

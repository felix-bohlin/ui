"use client"

import {
  Children,
  Fragment,
  isValidElement,
  useId,
  type ReactNode,
} from "react"
import FieldEndText from "./FieldEndText.react"
import type { FieldRootValue } from "./context.react"

const hasPart = (children: ReactNode, part: unknown): boolean =>
  Children.toArray(children).some(
    (child) =>
      isValidElement<{ children?: ReactNode }>(child) &&
      (child.type === part ||
        (child.type === Fragment && hasPart(child.props.children, part))),
  )

export const useFieldRootValue = (
  children: ReactNode,
  invalid?: boolean,
): FieldRootValue => {
  const endTextId = `end-text-${useId()}`
  return {
    describedBy: hasPart(children, FieldEndText) ? endTextId : undefined,
    endTextId,
    invalid,
  }
}

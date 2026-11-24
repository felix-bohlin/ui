"use client"

import "../../elements/select-all.js"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function SelectAll({ className, children, ...rest }: Props) {
  return (
    <opui-select-all className={cx(["ui-select-all", className])} {...rest}>
      {children}
    </opui-select-all>
  )
}

"use client"

import { useEffect } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function SelectAll({ className, ...rest }: Props) {
  useEffect(() => {
    void import("../../elements/select-all.js")
  }, [])

  return (
    <opui-select-all className={cx(["ui-select-all", className])} {...rest} />
  )
}

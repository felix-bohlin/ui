"use client"

import "../../css/js/checkbox.js"
import { defined } from "../attrs"
import type { CheckboxInputProps as Props } from "./types.react"

export default function CheckboxInput({ indeterminate, ...rest }: Props) {
  return (
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      {...defined(rest)}
    />
  )
}

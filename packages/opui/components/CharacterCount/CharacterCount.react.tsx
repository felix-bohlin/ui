"use client"

import { useEffect } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function CharacterCount({ className, label, ...rest }: Props) {
  useEffect(() => {
    void import("../../elements/character-count.js")
  }, [])

  return (
    <opui-character-count
      aria-hidden="true"
      className={cx(["ui-value", className])}
      label={label}
      {...defined(rest)}
      dangerouslySetInnerHTML={{ __html: "" }}
      suppressHydrationWarning
    />
  )
}

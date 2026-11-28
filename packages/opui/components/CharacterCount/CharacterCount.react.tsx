"use client"

import "../../elements/character-count.js"
import { defined } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function CharacterCount({ className, label, ...rest }: Props) {
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

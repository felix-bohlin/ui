"use client"

import { useId } from "react"
import { cx } from "../cx"
import { AnchorContext } from "./context.react"
import type { Props } from "./types.react"

export default function Anchor({
  alignment,
  className,
  id: idProp,
  style,
  trigger = "always",
  ...rest
}: Props) {
  const uid = useId()

  const isHover = trigger === "hover"
  const id = isHover ? (idProp ?? `anchor-${uid}`) : undefined
  const positionArea = alignment
    ? { "--anchor-position-area": alignment }
    : undefined

  return (
    <AnchorContext
      value={{ floatingId: id, popover: isHover ? "hint" : undefined }}
    >
      <span
        className={cx(["ui-anchor", className])}
        id={isHover ? undefined : idProp}
        style={positionArea ? { ...positionArea, ...style } : style}
        {...rest}
      />
    </AnchorContext>
  )
}

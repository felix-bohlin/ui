"use client"

import { cx } from "../cx"
import { AnchorContext } from "./context.react"
import { extendsAnchor } from "./root"
import type { Props } from "./types.react"

export default function Anchor({
  className,
  id: idProp,
  positionArea,
  style,
  trigger,
  ...rest
}: Props) {
  const isHover = trigger === "hover"
  const id = isHover ? idProp : undefined
  const positionStyle = positionArea
    ? { "--ui-anchor-position-area": positionArea }
    : undefined

  return (
    <AnchorContext
      value={{ floatingId: id, popover: isHover ? "hint" : undefined }}
    >
      <span
        className={cx([!extendsAnchor(className) && "ui-anchor", className])}
        id={isHover ? undefined : idProp}
        style={positionStyle ? { ...positionStyle, ...style } : style}
        {...rest}
      />
    </AnchorContext>
  )
}

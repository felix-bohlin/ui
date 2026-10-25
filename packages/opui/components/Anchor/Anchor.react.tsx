"use client"

import { cx } from "../cx"
import { warnMissingId } from "../dev"
import { mergeStyle } from "../style"
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
  if (isHover && !extendsAnchor(className)) {
    warnMissingId("Anchor", id, "interestfor")
  }
  return (
    <AnchorContext
      value={{ floatingId: id, popover: isHover ? "hint" : undefined }}
    >
      <span
        className={cx([!extendsAnchor(className) && "ui-anchor", className])}
        id={isHover ? undefined : idProp}
        style={mergeStyle(
          { "--ui-anchor-position-area": positionArea },
          style ?? {},
        )}
        {...rest}
      />
    </AnchorContext>
  )
}

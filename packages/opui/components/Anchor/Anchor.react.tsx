"use client"

import { cx } from "../cx"
import { AnchorContext } from "./context.react"
import { warnMissingId } from "../dev"
import { mergeStyle } from "../style"
import { extendsAnchor } from "./root"
import type { Props } from "./types.react"

export default function Anchor({
  className,
  id: idProp,
  positionArea,
  style,
  trigger,
  children,
  ...rest
}: Props) {
  const isHover = trigger === "hover"
  const id = isHover ? (idProp ?? undefined) : undefined
  if (isHover && !extendsAnchor(className)) {
    warnMissingId("Anchor", id, "interestfor")
  }

  return (
    <AnchorContext
      value={{
        floatingId: id,
        popover: isHover ? ("hint" as const) : undefined,
      }}
    >
      <span
        className={cx([!extendsAnchor(className) && "ui-anchor", className])}
        id={isHover ? undefined : idProp}
        style={mergeStyle(
          { "--ui-anchor-position-area": positionArea },
          style ?? {},
        )}
        {...rest}
      >
        {children}
      </span>
    </AnchorContext>
  )
}

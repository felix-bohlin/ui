import { useId } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Anchor({
  alignment,
  className,
  id: idProp,
  style,
  trigger = "always",
  anchored,
  children,
  ...rest
}: Props) {
  const uid = useId()

  const isHover = trigger === "hover"
  const id = isHover ? (idProp ?? uid) : undefined
  const positionArea = alignment
    ? { "--anchor-position-area": alignment }
    : undefined

  return (
    <span
      className={cx(["ui-anchor", className])}
      id={isHover ? undefined : idProp}
      style={positionArea ? { ...positionArea, ...style } : style}
      {...rest}
    >
      {children}
      <span
        className="ui-anchor-floating"
        id={id}
        popover={isHover ? "hint" : undefined}
      >
        {anchored}
      </span>
    </span>
  )
}

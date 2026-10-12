import Anchor from "../Anchor/Anchor.react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Badge({
  alignment,
  className,
  color,
  dot,
  invisible,
  label,
  srLabel,
  children,
  indicator,
  ...rest
}: Props) {
  return (
    <Anchor
      className={cx([
        "ui-badge",
        {
          "ui-dot": dot,
          "ui-invisible": invisible,
        },
        alignment && alignment !== "start-end" && `ui-${alignment}`,
        color && `ui-${color}`,
        className,
      ])}
      {...rest}
      anchored={
        <span className="ui-badge-indicator">
          {dot ? "" : label}
          {!dot && indicator}
          {srLabel && <span className="ui-sr-only">{srLabel}</span>}
        </span>
      }
    >
      {children}
    </Anchor>
  )
}

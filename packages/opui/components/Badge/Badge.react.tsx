import Anchor from "../Anchor/Anchor.react"
import AnchorContent from "../Anchor/AnchorContent.react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Badge({
  className,
  color,
  corner,
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
        corner && corner !== "start-end" && `ui-${corner}`,
        color && `ui-${color}`,
        className,
      ])}
      {...rest}
    >
      {children}
      <AnchorContent>
        <span className="ui-badge-indicator">
          {dot ? "" : label}
          {!dot && indicator}
          {srLabel && (
            <>
              {" "}
              <span className="ui-sr-only">{srLabel}</span>
            </>
          )}
        </span>
      </AnchorContent>
    </Anchor>
  )
}

import { cx } from "../cx"
import Anchor from "../Anchor/Anchor.react"
import AnchorContent from "../Anchor/AnchorContent.react"
import type { Props } from "./types.react"

export default function Badge({
  className,
  color,
  corner,
  dot,
  hideLabel,
  invisible,
  label,
  children,
  indicator,
  ...rest
}: Props) {
  const hidden = dot || hideLabel

  return (
    <Anchor
      className={cx([
        "ui-badge",
        { "ui-dot": dot, "ui-invisible": invisible },
        color && `ui-${color}`,
        corner && corner !== "start-end" && `ui-${corner}`,
        className,
      ])}
      {...rest}
    >
      {children}{" "}
      <AnchorContent>
        <span className="ui-indicator">
          {hidden && (
            <>
              {!dot && indicator && <span aria-hidden="true">{indicator}</span>}
              {label && <span className="ui-sr-only">{label}</span>}
            </>
          )}
          {hidden ? undefined : label}
          {!hidden && indicator}
        </span>
      </AnchorContent>
    </Anchor>
  )
}

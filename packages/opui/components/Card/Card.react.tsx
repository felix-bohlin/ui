import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({
  actionsAlign,
  className,
  variant,
  actions,
  children,
  content,
  header,
  ...rest
}: Props) {
  return (
    <div
      className={cx(["ui-card", variant && `ui-${variant}`, className])}
      {...rest}
    >
      {header && <hgroup>{header}</hgroup>}
      {content && <div className="ui-content">{content}</div>}
      {children}
      {actions && (
        <div
          className={cx([
            "ui-actions",
            actionsAlign && `ui-align-${actionsAlign}`,
          ])}
        >
          {actions}
        </div>
      )}
    </div>
  )
}

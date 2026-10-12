import { useId } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Dialog({
  actionsAlign,
  className,
  closedby,
  actions,
  children,
  content,
  header,
  ...rest
}: Props) {
  const uid = useId()
  const headerId =
    header && !rest["aria-labelledby"] ? `dialog-header-${uid}` : undefined

  return (
    <dialog
      aria-labelledby={headerId}
      className={cx(["ui-dialog ui-card ui-elevated", className])}
      closedby={closedby}
      {...rest}
    >
      {header && <hgroup id={headerId}>{header}</hgroup>}
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
    </dialog>
  )
}

import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Accordion({
  className,
  markerAnimation = "rotate",
  name,
  open,
  variant,
  actions,
  children,
  marker,
  summary,
  ...rest
}: Props) {
  return (
    <details
      name={name}
      className={cx([
        "ui-accordion",
        "ui-card",
        markerAnimation && `ui-marker-${markerAnimation}`,
        variant && `ui-${variant}`,
        className,
      ])}
      open={open}
      {...rest}
    >
      <summary>
        {summary}
        {marker ?? (
          <svg
            className="ui-marker"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
            ></path>
          </svg>
        )}
      </summary>
      <div className="ui-content">{children}</div>
      {actions && <div className="ui-actions">{actions}</div>}
    </details>
  )
}

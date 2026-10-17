import { cx } from "../cx"
import { markerPath } from "./icons"
import type { AccordionSummaryProps as Props } from "./types.react"

export default function AccordionSummary({
  children,
  className,
  marker,
  ...rest
}: Props) {
  return (
    <summary className={cx([className])} {...rest}>
      {children}
      {marker === undefined ? (
        <svg
          aria-hidden="true"
          className="ui-marker"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={markerPath}></path>
        </svg>
      ) : (
        marker
      )}
    </summary>
  )
}

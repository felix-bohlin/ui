import { cx } from "../cx"
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
      {marker ?? (
        <svg
          aria-hidden="true"
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
  )
}

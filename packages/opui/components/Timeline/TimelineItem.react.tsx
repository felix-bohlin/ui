import { cx } from "../cx"
import type { TimelineItemProps as Props } from "./types.react"

export default function TimelineItem({
  "aria-current": ariaCurrent,
  className,
  color,
  current,
  datetime,
  headingLevel = 3,
  time,
  children,
  label,
  marker,
  ...rest
}: Props) {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6"

  return (
    <li
      aria-current={
        ariaCurrent ?? (current === true ? "true" : current || undefined)
      }
      className={cx([color && `ui-${color}`, className])}
      {...rest}
    >
      {marker && <span className="ui-marker">{marker}</span>}{" "}
      {time && <time dateTime={datetime}>{time}</time>}
      {label && <Heading className="ui-h6">{label}</Heading>}
      {children}
    </li>
  )
}

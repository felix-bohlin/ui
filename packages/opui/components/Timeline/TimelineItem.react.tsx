import { cx } from "../cx"
import type { TimelineItemProps as Props } from "./types.react"

export default function TimelineItem({
  className,
  color,
  current,
  datetime,
  headingLevel = 3,
  label,
  time,
  children,
  marker,
  ...rest
}: Props) {
  const Heading = `h${headingLevel}` as const

  return (
    <li
      aria-current={current === true ? "true" : current || undefined}
      className={cx([color && `ui-${color}`, className])}
      {...rest}
    >
      {marker && <span className="ui-marker">{marker}</span>}
      {time && <time dateTime={datetime}>{time}</time>}
      {label && <Heading className="ui-h6">{label}</Heading>}
      {children}
    </li>
  )
}

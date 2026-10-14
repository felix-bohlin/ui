import { cx } from "../cx"
import TimelineItem from "./TimelineItem.react"
import type { Props } from "./types.react"

export default function Timeline({
  className,
  items,
  progress,
  size,
  children,
  ...rest
}: Props) {
  return (
    <ol
      className={cx([
        "ui-timeline",
        { "ui-with-progress": progress },
        size && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      {items?.map(({ description, ...item }, index) => (
        <TimelineItem key={index} {...item}>
          {description && <p>{description}</p>}
        </TimelineItem>
      ))}
      {children}
    </ol>
  )
}

import { cx } from "../cx"
import TimelineItem from "./TimelineItem.react"
import type { Props } from "./types.react"

export default function Timeline({
  className,
  items,
  size,
  tracked,
  children,
  ...rest
}: Props) {
  return (
    <ol
      className={cx([
        "ui-timeline",
        { "ui-tracked": tracked },
        size && size !== "medium" && `ui-${size}`,
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

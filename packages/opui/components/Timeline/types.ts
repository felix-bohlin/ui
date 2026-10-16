export type TimelineItemProps = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  current?: boolean | "date" | "step" | "time"
  datetime?: string
  heading?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  time?: string
}

export type TimelineItemData = TimelineItemProps & {
  description?: string
}

export type Props = {
  items?: TimelineItemData[]
  progress?: boolean
  size?: "small"
}

export type Slots<S> = {
  marker?: S
}

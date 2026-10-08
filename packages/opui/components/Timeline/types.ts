export type TimelineItemProps = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  current?: boolean | "date" | "step" | "time"
  datetime?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  time?: string
  title?: string
}

export type Entry = TimelineItemProps & {
  description?: string
}

export type Props = {
  items?: Entry[]
  progress?: boolean
  size?: "small"
}

export type Slots<S> = {
  marker?: S
}

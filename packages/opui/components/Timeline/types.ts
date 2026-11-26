export type TimelineItemProps = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  current?: boolean | "date" | "step" | "time"
  datetime?: string
  headingLevel?: 2 | 3 | 4 | 5 | 6
  label?: string
  time?: string
}

export type TimelineItemData = TimelineItemProps & {
  description?: string
}

export type Props = {
  items?: TimelineItemData[]
  size?: "small" | "medium"
  tracked?: boolean
}

export type TimelineItemSlots<S> = {
  label?: string | S
  marker?: S
}

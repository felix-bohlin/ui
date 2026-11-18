export type Props = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  corner?: "start-start" | "start-end" | "end-start" | "end-end"
  invisible?: boolean
} & (
  | {
      dot?: false
      hideLabel?: false
      label?: string
    }
  | {
      dot: true
      hideLabel?: boolean
      label: string
    }
  | {
      dot?: false
      hideLabel: true
      label: string
    }
)

export type Slots<S> = {
  indicator?: S
}

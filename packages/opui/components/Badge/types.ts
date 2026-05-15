export type Props = {
  [key: string]: any
  alignment?: "start-start" | "end-start" | "end-end"
  class?: string
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  invisible?: boolean
  label?: string | number
}

export type Props = {
  [key: string]: any
  alignment?: "start-start" | "end-start" | "end-end"
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  invisible?: boolean
  label?: string | number
}

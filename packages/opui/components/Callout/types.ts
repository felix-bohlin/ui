export type Props = {
  [key: string]: any
  class?: string
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}

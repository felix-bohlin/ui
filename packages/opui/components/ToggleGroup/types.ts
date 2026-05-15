import type { HTMLAttributes } from 'vue'

export type Props = {
  [key: string]: any
  class?: HTMLAttributes['class']
  name?: string
  orientation?: "vertical"
  selection?: "single" | "multiple"
  size?: "default" | "small" | "x-small"
}

import type { HTMLAttributes } from 'vue'

export type Props = {
  [key: string]: any
  backdrop?: "transparent" | "blurred"
  class?: HTMLAttributes['class']
  closedby?: "any" | "closerequest" | "none"
  id?: string
  scrollLock?: boolean
  side?: "inline-start" | "inline-end" | "block-start" | "block-end"
}

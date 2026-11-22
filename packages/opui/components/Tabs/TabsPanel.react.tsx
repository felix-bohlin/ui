import { cx } from "../cx"
import type { TabsPanelProps as Props } from "./types.react"

export default function TabsPanel({ className, children, ...rest }: Props) {
  return (
    <div className={cx(["ui-panel", className])} {...rest}>
      {children}
    </div>
  )
}

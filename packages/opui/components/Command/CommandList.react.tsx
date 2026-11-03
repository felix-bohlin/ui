import { cx } from "../cx"
import type { CommandListProps as Props } from "./types.react"

export default function CommandList({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}

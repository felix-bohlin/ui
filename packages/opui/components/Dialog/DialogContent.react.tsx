import { cx } from "../cx"
import type { DialogContentProps as Props } from "./types.react"

export default function DialogContent({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}

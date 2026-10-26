import { cx } from "../cx"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({ className, ...rest }: Props) {
  return <div className={cx(["ui-header", className])} {...rest} />
}

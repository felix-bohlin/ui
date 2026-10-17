import { cx } from "../cx"
import type { DrawerFooterProps as Props } from "./types.react"

export default function DrawerFooter({ className, ...rest }: Props) {
  return <div className={cx(["ui-footer", className])} {...rest} />
}

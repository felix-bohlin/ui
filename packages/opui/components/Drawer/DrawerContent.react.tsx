import { cx } from "../cx"
import type { DrawerContentProps as Props } from "./types.react"

export default function DrawerContent({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}

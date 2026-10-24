import { cx } from "../cx"
import type { CardContentProps as Props } from "./types.react"

export default function CardContent({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}

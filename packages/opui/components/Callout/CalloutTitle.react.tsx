import { cx } from "../cx"
import type { CalloutTitleProps as Props } from "./types.react"

export default function CalloutTitle({ className, level = 3, ...rest }: Props) {
  const Heading = `h${level}` as const

  return <Heading className={cx(["ui-title", className])} {...rest} />
}

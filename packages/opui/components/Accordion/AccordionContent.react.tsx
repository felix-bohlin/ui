import { cx } from "../cx"
import type { AccordionContentProps as Props } from "./types.react"

export default function AccordionContent({ className, ...rest }: Props) {
  return <div className={cx(["ui-content", className])} {...rest} />
}

import { cx } from "../cx"
import type { AccordionActionsProps as Props } from "./types.react"

export default function AccordionActions({ className, ...rest }: Props) {
  return <div className={cx(["ui-actions", className])} {...rest} />
}

import { cx } from "../cx"
import type { TermProps as Props } from "./types.react"

export default function DescriptionListTerm({ className, ...rest }: Props) {
  return <dt className={cx(["ui-term", className])} {...rest} />
}

import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Form({ as, className, children, ...rest }: Props) {
  const Tag = as || "form"

  return (
    <Tag className={cx(["ui-form", className])} {...(rest as object)}>
      {children}
    </Tag>
  )
}

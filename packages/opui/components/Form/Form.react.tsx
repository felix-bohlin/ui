import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Form({ as, className, ...rest }: Props) {
  const Tag: ElementType = as || "form"

  return <Tag className={cx(["ui-form", className])} {...(rest as object)} />
}

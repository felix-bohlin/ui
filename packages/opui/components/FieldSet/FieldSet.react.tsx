import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function FieldSet({ as, className, ...rest }: Props) {
  const Tag: ElementType = as || "fieldset"

  return (
    <Tag
      className={cx(["ui-fieldset", className])}
      role={Tag === "fieldset" ? undefined : "group"}
      {...(rest as object)}
    />
  )
}

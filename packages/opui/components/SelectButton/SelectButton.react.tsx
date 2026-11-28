import { createElement } from "react"
import type { Props } from "./types.react"

export default function SelectButton(props: Props) {
  return (
    <button {...props}>
      {createElement("selectedcontent", {
        dangerouslySetInnerHTML: { __html: "" },
        suppressHydrationWarning: true,
      })}
    </button>
  )
}

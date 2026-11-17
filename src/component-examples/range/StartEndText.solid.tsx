/** @jsxImportSource @solidjs/web */
import { Range } from "opui-css/solid"

export default function StartEndText() {
  return (
    <Range
      endText="You can also zoom with your browser."
      label="Text size"
      startText="Applies to articles and comments."
    />
  )
}

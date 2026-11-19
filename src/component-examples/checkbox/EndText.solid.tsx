/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Checkbox endText="Wrapped in recycled paper." name="checkbox-end-text">
        Gift wrap
      </Checkbox>
      <Checkbox
        endText="Printed on the packing slip."
        name="checkbox-end-text"
        orientation="vertical"
      >
        Gift message
      </Checkbox>
    </>
  )
}

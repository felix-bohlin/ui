import { Checkbox } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Checkbox endText="Supporting text" name="checkbox-end-text">
        Default
      </Checkbox>
      <Checkbox
        endText="Supporting text"
        name="checkbox-end-text"
        orientation="vertical"
      >
        Stack
      </Checkbox>
    </>
  )
}

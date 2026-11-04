import { Textarea } from "opui-css/react"

export default function EndText() {
  return (
    <>
      <Textarea endText="Supporting text" label="Label" placeholder="Default" />
      <Textarea
        endText="Supporting text"
        label="Label"
        placeholder="Filled"
        variant="filled"
      />
    </>
  )
}

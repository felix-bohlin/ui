import { Textarea } from "opui-css/react"

export default function SupportingText() {
  return (
    <>
      <Textarea label="Label" placeholder="Default" endText="Supporting text" />
      <Textarea
        label="Label"
        placeholder="Filled"
        endText="Supporting text"
        variant="filled"
      />
    </>
  )
}

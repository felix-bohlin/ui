import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Label" placeholder="Default" endText="Supporting text" />
      <Textarea
        label="Label"
        placeholder="Filled"
        endText="Supporting text"
        filled
      />
    </>
  )
}

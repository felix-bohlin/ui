import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Textarea label="Invalid" invalid validationMessage="This field is required" />
      <Textarea label="Valid" valid />
    </>
  )
}

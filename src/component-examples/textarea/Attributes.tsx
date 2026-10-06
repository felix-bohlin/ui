import { Textarea } from "opui-css/solid"

export default function Example() {
  return (
    <Textarea
      label="Message"
      required
      data-testid="message"
      placeholder="Write something"
    />
  )
}

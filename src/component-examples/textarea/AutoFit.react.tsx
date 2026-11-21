import { Textarea } from "opui-css/react"

export default function AutoFit() {
  return (
    <Textarea autoFit htmlFor="textarea-auto-fit-1" label="Message">
      <textarea
        id="textarea-auto-fit-1"
        placeholder="Write a message"
      ></textarea>
    </Textarea>
  )
}

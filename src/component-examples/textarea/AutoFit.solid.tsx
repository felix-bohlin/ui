/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function AutoFit() {
  return (
    <Textarea autoFit for="textarea-auto-fit-1" label="Message">
      <textarea
        id="textarea-auto-fit-1"
        placeholder="Write a message"
      ></textarea>
    </Textarea>
  )
}

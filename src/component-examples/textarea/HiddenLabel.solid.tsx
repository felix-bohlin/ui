/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function HiddenLabel() {
  return (
    <Textarea for="textarea-hidden-label-1" hideLabel label="Reply">
      <textarea
        id="textarea-hidden-label-1"
        placeholder="Write a reply..."
      ></textarea>
    </Textarea>
  )
}

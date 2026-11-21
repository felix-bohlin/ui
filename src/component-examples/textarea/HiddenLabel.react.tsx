import { Textarea } from "opui-css/react"

export default function HiddenLabel() {
  return (
    <Textarea hideLabel htmlFor="textarea-hidden-label-1" label="Reply">
      <textarea
        id="textarea-hidden-label-1"
        placeholder="Write a reply..."
      ></textarea>
    </Textarea>
  )
}

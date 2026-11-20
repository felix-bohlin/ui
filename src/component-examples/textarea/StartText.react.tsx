import { Textarea } from "opui-css/react"

export default function StartText() {
  return (
    <Textarea
      htmlFor="textarea-start-text-1"
      label="Bio"
      startText="Shown on your public profile"
    >
      <textarea
        aria-describedby="textarea-start-text-1-start-text"
        id="textarea-start-text-1"
      ></textarea>
    </Textarea>
  )
}

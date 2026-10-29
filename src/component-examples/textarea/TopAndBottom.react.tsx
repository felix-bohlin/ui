import { Textarea } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <Textarea
        label="Code"
        placeholder="console.log('Hello, world!')"
        top="script.js"
      />

      <Textarea
        label="Comment"
        placeholder="Write a comment..."
        bottom="0 / 280"
      />
    </>
  )
}

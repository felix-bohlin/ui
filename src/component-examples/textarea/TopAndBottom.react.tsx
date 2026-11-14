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
        bottom="Markdown supported"
        characterCount
        label="Comment"
        maxLength={280}
        placeholder="Write a comment..."
      />
    </>
  )
}

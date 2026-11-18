/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

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
        maxlength={280}
        placeholder="Write a comment..."
      />
    </>
  )
}

import { Textarea } from "opui-css/react"

export default function TopAndBottom() {
  return (
    <>
      <Textarea
        htmlFor="textarea-top-and-bottom-1"
        label="Code"
        top="script.js"
      >
        <textarea
          aria-describedby="textarea-top-and-bottom-1-top"
          id="textarea-top-and-bottom-1"
          placeholder="console.log('Hello, world!')"
        ></textarea>
      </Textarea>

      <Textarea
        bottom="Markdown supported"
        characterCount
        htmlFor="textarea-top-and-bottom-2"
        label="Comment"
      >
        <textarea
          aria-describedby="textarea-top-and-bottom-2-bottom textarea-top-and-bottom-2-end-text"
          id="textarea-top-and-bottom-2"
          maxLength={280}
          placeholder="Write a comment..."
        ></textarea>
      </Textarea>
    </>
  )
}

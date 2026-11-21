/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function EndText() {
  return (
    <>
      <Textarea
        endText="Visible to everyone on the team."
        for="textarea-end-text-1"
        label="Description"
      >
        <textarea
          aria-describedby="textarea-end-text-1-end-text"
          id="textarea-end-text-1"
          placeholder="What is this project about?"
        ></textarea>
      </Textarea>
      <Textarea
        endText="Only you can see these."
        for="textarea-end-text-2"
        label="Private notes"
        variant="filled"
      >
        <textarea
          aria-describedby="textarea-end-text-2-end-text"
          id="textarea-end-text-2"
          placeholder="Add a note..."
        ></textarea>
      </Textarea>
    </>
  )
}

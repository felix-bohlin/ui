/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Rows() {
  return (
    <>
      <Textarea for="textarea-rows-1" label="Reply">
        <textarea
          id="textarea-rows-1"
          placeholder="Write a reply"
          rows="1"
        ></textarea>
      </Textarea>
      <Textarea for="textarea-rows-2" label="Review">
        <textarea
          id="textarea-rows-2"
          placeholder="Write a review"
          rows="6"
        ></textarea>
      </Textarea>
    </>
  )
}

/** @jsxImportSource @solidjs/web */
import { Textarea } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <Textarea for="textarea-variants-1" label="Outlined">
        <textarea
          id="textarea-variants-1"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea for="textarea-variants-2" label="Filled" variant="filled">
        <textarea
          id="textarea-variants-2"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
    </>
  )
}

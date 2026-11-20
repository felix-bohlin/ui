import { Textarea } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <Textarea htmlFor="textarea-variants-1" label="Outlined">
        <textarea
          id="textarea-variants-1"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea htmlFor="textarea-variants-2" label="Filled" variant="filled">
        <textarea
          id="textarea-variants-2"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
    </>
  )
}

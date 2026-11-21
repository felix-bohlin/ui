import { Textarea } from "opui-css/react"

export default function Sizes() {
  return (
    <>
      <Textarea htmlFor="textarea-sizes-1" label="X-small" size="x-small">
        <textarea
          id="textarea-sizes-1"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea htmlFor="textarea-sizes-2" label="Small" size="small">
        <textarea
          id="textarea-sizes-2"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea htmlFor="textarea-sizes-3" label="Medium">
        <textarea
          id="textarea-sizes-3"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
      <Textarea htmlFor="textarea-sizes-4" label="Large" size="large">
        <textarea
          id="textarea-sizes-4"
          placeholder="Write a message"
        ></textarea>
      </Textarea>
    </>
  )
}

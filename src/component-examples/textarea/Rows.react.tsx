import { Field } from "opui-css/react"

export default function Rows() {
  return (
    <>
      <Field htmlFor="textarea-rows-1" label="Reply">
        <textarea
          id="textarea-rows-1"
          placeholder="Write a reply"
          rows={1}
        ></textarea>
      </Field>
      <Field htmlFor="textarea-rows-2" label="Review">
        <textarea
          id="textarea-rows-2"
          placeholder="Write a review"
          rows={6}
        ></textarea>
      </Field>
    </>
  )
}

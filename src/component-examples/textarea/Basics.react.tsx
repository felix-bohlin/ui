import { Field } from "opui-css/react"

export default function Basics() {
  return (
    <Field htmlFor="textarea-basics-1" label="Message">
      <textarea id="textarea-basics-1" name="message"></textarea>
    </Field>
  )
}

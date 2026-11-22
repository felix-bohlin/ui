/** @jsxImportSource @solidjs/web */
import { Field } from "opui-css/solid"

export default function Basics() {
  return (
    <Field for="textarea-basics-1" label="Message">
      <textarea id="textarea-basics-1" name="message"></textarea>
    </Field>
  )
}

import { Field, SelectButton } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Field htmlFor="field-basics-1" label="Band name">
        <input id="field-basics-1" name="band" />
      </Field>
      <Field htmlFor="field-basics-2" label="Instrument">
        <select id="field-basics-2" name="instrument">
          <SelectButton />
          <option value="">Pick an instrument</option>
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field htmlFor="field-basics-3" label="Influences">
        <textarea id="field-basics-3" name="influences"></textarea>
      </Field>
    </>
  )
}

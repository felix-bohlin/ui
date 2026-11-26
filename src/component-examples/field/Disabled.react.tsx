import { Field, SelectButton } from "opui-css/react"

export default function Disabled() {
  return (
    <>
      <Field htmlFor="field-disabled-1" label="Band name">
        <input
          disabled
          id="field-disabled-1"
          name="band"
          defaultValue="The Low Ends"
        />
      </Field>
      <Field htmlFor="field-disabled-2" label="Instrument">
        <select disabled id="field-disabled-2" name="instrument">
          <SelectButton />
          <option>Bass</option>
          <option>Drums</option>
          <option>Guitar</option>
        </select>
      </Field>
      <Field htmlFor="field-disabled-3" label="Influences">
        <textarea
          disabled
          id="field-disabled-3"
          name="influences"
          defaultValue="Funk and soul"
        ></textarea>
      </Field>
      <Field htmlFor="field-disabled-4" label="Member since">
        <input
          id="field-disabled-4"
          name="member-since"
          readOnly
          value="2019"
        />
      </Field>
    </>
  )
}

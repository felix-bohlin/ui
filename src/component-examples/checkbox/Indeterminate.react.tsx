import {
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
  SelectAll,
} from "opui-css/react"

export default function Indeterminate() {
  return (
    <SelectAll>
      <Fieldset>
        <FieldLegend>
          <Checkbox data-select-all="">Select all</Checkbox>
        </FieldLegend>
        <FieldGroup name="indeterminate-children">
          <Checkbox defaultChecked>Apples</Checkbox>
          <Checkbox>Bananas</Checkbox>
          <Checkbox>Cherries</Checkbox>
        </FieldGroup>
      </Fieldset>
    </SelectAll>
  )
}

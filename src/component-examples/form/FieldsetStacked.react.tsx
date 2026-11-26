import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/react"

export default function FieldsetStacked() {
  return (
    <Fieldset aria-describedby="form-fieldset-stacked-1-description">
      <FieldLegend>Favorite pet</FieldLegend>
      <FieldDescription id="form-fieldset-stacked-1-description">
        Please select your favorite type of pet.
      </FieldDescription>
      <FieldGroup>
        <Radio name="pet" value="cat">
          Cat
        </Radio>
        <Radio name="pet" value="dog">
          Dog
        </Radio>
        <Radio name="pet" value="hamster">
          Hamster
        </Radio>
      </FieldGroup>
    </Fieldset>
  )
}

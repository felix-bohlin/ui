import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Textarea,
  TextField,
} from "opui-css/solid"

export default function Example() {
  return (
    <FieldSet>
      <FieldLegend>Pet info</FieldLegend>
      <FieldDescription>We must know your pet's information.</FieldDescription>
      <FieldGroup name="bio">
        <TextField label="Name" name="name" />
        <Textarea required label="Life story" />
      </FieldGroup>
    </FieldSet>
  )
}

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Textarea,
  TextField,
} from "opui-css/react"

export default function FieldsetRequired() {
  return (
    <Fieldset>
      <FieldLegend>Pet info</FieldLegend>
      <FieldDescription>We must know your pet's information.</FieldDescription>
      <FieldGroup>
        <TextField label="Name" name="name" />
        <Textarea label="Life story" name="story" required />
      </FieldGroup>
    </Fieldset>
  )
}

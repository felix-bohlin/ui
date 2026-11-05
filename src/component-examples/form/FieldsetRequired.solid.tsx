/** @jsxImportSource @solidjs/web */
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Textarea,
  TextField,
} from "opui-css/solid"

export default function FieldsetRequired() {
  return (
    <Fieldset>
      <FieldLegend>Delivery</FieldLegend>
      <FieldDescription>Where should we send your order?</FieldDescription>
      <FieldGroup>
        <TextField label="Recipient" name="recipient" />
        <Textarea label="Address" name="address" required />
      </FieldGroup>
    </Fieldset>
  )
}

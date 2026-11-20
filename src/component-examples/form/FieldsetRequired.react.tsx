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
    <Fieldset aria-describedby="form-fieldset-required-1-description">
      <FieldLegend>Delivery</FieldLegend>
      <FieldDescription id="form-fieldset-required-1-description">
        Where should we send your order?
      </FieldDescription>
      <FieldGroup>
        <TextField htmlFor="form-fieldset-required-2" label="Recipient">
          <input id="form-fieldset-required-2" name="recipient" />
        </TextField>
        <Textarea htmlFor="form-fieldset-required-3" label="Address">
          <textarea
            id="form-fieldset-required-3"
            name="address"
            required
          ></textarea>
        </Textarea>
      </FieldGroup>
    </Fieldset>
  )
}

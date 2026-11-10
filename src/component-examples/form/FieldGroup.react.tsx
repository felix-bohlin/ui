import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Radio,
} from "opui-css/react"

export default function FieldGroupExample() {
  return (
    <Form>
      <Fieldset aria-describedby="form-field-group-1-description">
        <FieldLegend>Plan</FieldLegend>
        <FieldDescription id="form-field-group-1-description">
          You can change your plan at any time.
        </FieldDescription>
        <FieldGroup name="plan">
          <Radio value="starter">Starter</Radio>
          <Radio value="team">Team</Radio>
          <Radio value="business">Business</Radio>
        </FieldGroup>
      </Fieldset>
      <Fieldset aria-describedby="form-field-group-2-description">
        <FieldLegend>Add-ons</FieldLegend>
        <FieldDescription id="form-field-group-2-description">
          Billed monthly with your plan.
        </FieldDescription>
        <FieldGroup name="add-ons">
          <Checkbox
            endText="Daily snapshots, kept for 30 days."
            value="backups"
          >
            Backups
          </Checkbox>
          <Checkbox
            endText="Encrypt your files with your own keys."
            value="encryption"
          >
            Encryption
          </Checkbox>
          <Checkbox
            endText="Sign in with your company account."
            value="single-sign-on"
          >
            Single sign-on
          </Checkbox>
        </FieldGroup>
      </Fieldset>
    </Form>
  )
}

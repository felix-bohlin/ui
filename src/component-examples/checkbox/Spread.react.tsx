import {
  Checkbox,
  CheckboxEndText,
  CheckboxInput,
  CheckboxLabel,
} from "opui-css/react"

export default function Spread() {
  return (
    <>
      <Checkbox spread>
        <CheckboxInput name="checkbox-spread" />
        <CheckboxLabel>Accept Terms & Conditions</CheckboxLabel>
        <CheckboxEndText>
          I have read and agree to the privacy policy.
        </CheckboxEndText>
      </Checkbox>

      <Checkbox spread>
        <CheckboxInput name="checkbox-spread" required />
        <CheckboxLabel>Required</CheckboxLabel>
        <CheckboxEndText>You must accept this to continue.</CheckboxEndText>
      </Checkbox>

      <Checkbox spread>
        <CheckboxInput name="checkbox-spread" disabled />
        <CheckboxLabel>Disabled</CheckboxLabel>
        <CheckboxEndText>This checkbox is disabled.</CheckboxEndText>
      </Checkbox>

      <Checkbox spread error>
        <CheckboxInput name="checkbox-spread" />
        <CheckboxLabel>Invalid Checkbox</CheckboxLabel>
        <CheckboxEndText>There is an error with this checkbox.</CheckboxEndText>
      </Checkbox>
    </>
  )
}

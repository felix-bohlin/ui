import {
  Checkbox,
  CheckboxEndText,
  CheckboxInput,
  CheckboxLabel,
} from "opui-css/react"

export default function SupportingText() {
  return (
    <>
      <Checkbox>
        <CheckboxInput name="checkbox-supporting-text" />
        <CheckboxLabel>Default</CheckboxLabel>
        <CheckboxEndText>Supporting text</CheckboxEndText>
      </Checkbox>
      <Checkbox stack>
        <CheckboxInput name="checkbox-supporting-text" />
        <CheckboxLabel>Stack</CheckboxLabel>
        <CheckboxEndText>Supporting text</CheckboxEndText>
      </Checkbox>
    </>
  )
}

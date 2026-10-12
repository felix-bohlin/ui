import { Checkbox, CheckboxInput, CheckboxLabel } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Checkbox>
        <CheckboxInput defaultChecked name="checkbox-visible-label" />
        <CheckboxLabel>Choice A</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput disabled name="checkbox-visible-label" />
        <CheckboxLabel>Disabled</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput defaultChecked disabled name="checkbox-visible-label" />
        <CheckboxLabel>Checked and disabled</CheckboxLabel>
      </Checkbox>
      <Checkbox>
        <CheckboxInput name="checkbox-visible-label" />
        <CheckboxLabel>
          Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
          semiotics artisan synth stumptown gastropub cornhole{" "}
          <a className="ui-link" href="#visible-label">
            privacy policy ipsum
          </a>
        </CheckboxLabel>
      </Checkbox>
    </>
  )
}

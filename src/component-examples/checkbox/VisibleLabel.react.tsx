import { Checkbox } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-visible-label">
        Choice A
      </Checkbox>
      <Checkbox disabled name="checkbox-visible-label">
        Disabled
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-visible-label">
        Checked and disabled
      </Checkbox>
      <Checkbox name="checkbox-visible-label">
        Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
        semiotics artisan synth stumptown gastropub cornhole{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy ipsum
        </a>
      </Checkbox>
    </>
  )
}

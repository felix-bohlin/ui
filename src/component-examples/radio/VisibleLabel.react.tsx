import { Radio } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Radio name="radio-visible-label" value="a" defaultChecked>
        Choice A
      </Radio>
      <Radio name="radio-visible-label" value="b" disabled>
        Disabled
      </Radio>
      <Radio name="radio-visible-label" value="c">
        Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
        semiotics artisan synth stumptown gastropub cornhole{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy ipsum
        </a>
      </Radio>
    </>
  )
}

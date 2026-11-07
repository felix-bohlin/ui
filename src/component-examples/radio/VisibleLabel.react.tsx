import { Radio } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Radio defaultChecked name="radio-visible-label" value="monthly">
        Monthly newsletter
      </Radio>
      <Radio disabled name="radio-visible-label" value="weekly">
        Weekly digest
      </Radio>
      <Radio name="radio-visible-label" value="updates">
        Product updates only, a few times a year when we release new features.
        You can unsubscribe at any time, as described in our{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy
        </a>
        .
      </Radio>
    </>
  )
}

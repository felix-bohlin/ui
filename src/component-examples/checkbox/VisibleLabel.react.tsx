import { Checkbox } from "opui-css/react"

export default function VisibleLabel() {
  return (
    <>
      <Checkbox defaultChecked name="checkbox-visible-label">
        Remember me
      </Checkbox>
      <Checkbox disabled name="checkbox-visible-label">
        Sync over mobile data
      </Checkbox>
      <Checkbox defaultChecked disabled name="checkbox-visible-label">
        Sync over Wi-Fi
      </Checkbox>
      <Checkbox name="checkbox-visible-label">
        Send me occasional emails about new features, tips and offers. I can
        unsubscribe at any time and have read the{" "}
        <a className="ui-link" href="#visible-label">
          privacy policy
        </a>
      </Checkbox>
    </>
  )
}

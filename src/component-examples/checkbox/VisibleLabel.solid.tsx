/** @jsxImportSource @solidjs/web */
import { Checkbox } from "opui-css/solid"

export default function VisibleLabel() {
  return (
    <>
      <Checkbox checked name="checkbox-visible-label">
        Remember me
      </Checkbox>
      <Checkbox disabled name="checkbox-visible-label">
        Sync over mobile data
      </Checkbox>
      <Checkbox checked disabled name="checkbox-visible-label">
        Sync over Wi-Fi
      </Checkbox>
      <Checkbox name="checkbox-visible-label">
        Send me occasional emails about new features, tips and offers. I can
        unsubscribe at any time and have read the{" "}
        <a class="ui-link" href="#visible-label">
          privacy policy
        </a>
      </Checkbox>
    </>
  )
}

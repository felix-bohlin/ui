/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Switch,
} from "opui-css/solid"

export default function FieldGroupBinding() {
  const [notifications, setNotifications] = createSignal(["email"])

  function reset() {
    setNotifications(["email"])
  }

  function toggle(event: Event & { currentTarget: HTMLInputElement }) {
    const { checked, value } = event.currentTarget
    setNotifications((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Notifications</FieldLegend>
        <FieldGroup name="switch-binding">
          <Switch
            checked={notifications().includes("email")}
            onChange={toggle}
            value="email"
          >
            Email
          </Switch>
          <Switch
            checked={notifications().includes("push")}
            onChange={toggle}
            value="push"
          >
            Push
          </Switch>
          <Switch
            checked={notifications().includes("sms")}
            onChange={toggle}
            value="sms"
          >
            SMS
          </Switch>
        </FieldGroup>
      </Fieldset>
      <p class="switch-binding-text">
        Selected: {notifications().join(", ") || "none"}
      </p>
      <Button class="switch-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}

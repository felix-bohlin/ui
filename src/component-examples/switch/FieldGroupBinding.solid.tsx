/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Switch,
} from "opui-css/solid"

const channels = ["email", "push", "sms"]

export default function FieldGroupBinding() {
  const [notifications, setNotifications] = createSignal(["email"])
  const summary = () =>
    channels
      .filter((channel) => notifications().includes(channel))
      .join(", ") || "none"

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
        <FieldGroup>
          <Switch
            checked={notifications().includes("email")}
            name="switch-binding"
            onChange={toggle}
            value="email"
          >
            Email
          </Switch>
          <Switch
            checked={notifications().includes("push")}
            name="switch-binding"
            onChange={toggle}
            value="push"
          >
            Push
          </Switch>
          <Switch
            checked={notifications().includes("sms")}
            name="switch-binding"
            onChange={toggle}
            value="sms"
          >
            SMS
          </Switch>
        </FieldGroup>
      </Fieldset>
      <p class="switch-binding-text">Selected: {summary()}</p>
      <Button class="switch-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}

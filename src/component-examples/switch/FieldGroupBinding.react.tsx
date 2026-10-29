"use client"

import { type ChangeEvent, useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Switch,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [notifications, setNotifications] = useState(["email"])

  function reset() {
    setNotifications(["email"])
  }

  function toggle(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
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
            checked={notifications.includes("email")}
            onChange={toggle}
            value="email"
          >
            Email
          </Switch>
          <Switch
            checked={notifications.includes("push")}
            onChange={toggle}
            value="push"
          >
            Push
          </Switch>
          <Switch
            checked={notifications.includes("sms")}
            onChange={toggle}
            value="sms"
          >
            SMS
          </Switch>
        </FieldGroup>
      </Fieldset>
      <p className="switch-binding-text">
        Selected: {notifications.join(", ") || "none"}
      </p>
      <Button className="switch-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}

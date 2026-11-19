"use client"

import {
  Button,
  Callout,
  CalloutContent,
  CalloutIcon,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  OneTimeCode,
  Radio,
  Select,
  Switch,
  TextField,
} from "opui-css/react"
import { verifyCode } from "reference-shared"
import { useState, type FormEvent } from "react"

const success = (text: string) => (
  <Callout severity="success">
    <CalloutIcon />
    <CalloutContent>
      <p>{text}</p>
    </CalloutContent>
  </Callout>
)

export default function Settings() {
  const [status, setStatus] = useState("")
  const [codeState, setCodeState] = useState<"idle" | "error" | "verified">(
    "idle",
  )

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("Settings saved.")
  }

  const verify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const code = String(new FormData(event.currentTarget).get("code"))
    setCodeState((await verifyCode(code)) ? "verified" : "error")
  }

  return (
    <>
      <div className="app-screen" data-screen="settings">
        <h1>Settings</h1>
        <Form aria-label="Settings" onSubmit={save}>
          <Fieldset>
            <FieldLegend>Account</FieldLegend>
            <FieldGroup>
              <TextField
                defaultValue="Sam Rivera"
                label="Display name"
                name="name"
              />
              <TextField
                defaultValue="sam@example.com"
                label="Email"
                name="email"
                required
                type="email"
              />
              <Select
                defaultValue="en"
                items={[
                  { label: "English", value: "en" },
                  { label: "Svenska", value: "sv" },
                  { label: "Deutsch", value: "de" },
                ]}
                label="Language"
                name="language"
              />
            </FieldGroup>
          </Fieldset>
          <Fieldset>
            <FieldLegend>Who can see your posts</FieldLegend>
            <FieldGroup name="visibility">
              <Radio value="everyone">Everyone</Radio>
              <Radio defaultChecked value="friends">
                Friends
              </Radio>
              <Radio value="only-me">Only me</Radio>
            </FieldGroup>
          </Fieldset>
          <Fieldset>
            <FieldLegend>Notifications</FieldLegend>
            <FieldGroup>
              <Switch defaultChecked name="email-notifications">
                Email notifications
              </Switch>
              <Switch name="push-notifications">Push notifications</Switch>
            </FieldGroup>
          </Fieldset>
          <div id="settings-status" role="status">
            {status && success(status)}
          </div>
          <FieldGroup>
            <Button type="submit" variant="filled">
              Save
            </Button>
          </FieldGroup>
        </Form>

        <section aria-labelledby="two-factor-title" className="app-screen">
          <h2 id="two-factor-title">Two-factor sign-in</h2>
          <Form aria-label="Two-factor sign-in" onSubmit={verify}>
            <OneTimeCode
              endText={
                codeState === "error"
                  ? "That code didn't work. Try again."
                  : undefined
              }
              error={codeState === "error"}
              label="Code from your app"
              name="code"
              required
            />
            <div role="status">
              {codeState === "verified" && success("Two-factor sign-in is on.")}
            </div>
            <FieldGroup>
              <Button type="submit" variant="outlined">
                Verify
              </Button>
            </FieldGroup>
          </Form>
        </section>

        <section aria-labelledby="danger-title" className="app-screen">
          <h2 id="danger-title">Danger zone</h2>
          <div>
            <Button
              color="critical"
              command="show-modal"
              commandfor="delete-account"
              variant="outlined"
            >
              Delete account
            </Button>
          </div>
        </section>
      </div>

      <Dialog id="delete-account">
        <DialogHeader>
          <DialogTitle>Delete your account?</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>This removes your posts and photos.</p>
        </DialogContent>
        <DialogFooter>
          <Button command="close" commandfor="delete-account">
            Cancel
          </Button>
          <Button
            color="critical"
            command="close"
            commandfor="delete-account"
            onClick={() =>
              setStatus("Account deleted (not really, this is a test app).")
            }
            variant="filled"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

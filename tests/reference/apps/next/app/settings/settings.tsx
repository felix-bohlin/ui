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
  Field,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  OneTimeCode,
  Radio,
  SelectButton,
  Switch,
} from "opui-css/react"
import { verifyCode } from "reference-shared"
import { useState, type FormEvent } from "react"

function Success({ text }: { text: string }) {
  return (
    <Callout severity="success">
      <CalloutIcon />
      <CalloutContent>
        <p>{text}</p>
      </CalloutContent>
    </Callout>
  )
}

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
              <Field htmlFor="settings-display-name" label="Display name">
                <input
                  defaultValue="Sam Rivera"
                  id="settings-display-name"
                  name="name"
                />
              </Field>
              <Field htmlFor="settings-email" label="Email">
                <input
                  defaultValue="sam@example.com"
                  id="settings-email"
                  name="email"
                  required
                  type="email"
                />
              </Field>
              <Field htmlFor="settings-language" label="Language">
                <select
                  defaultValue="en"
                  id="settings-language"
                  name="language"
                >
                  <SelectButton />
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                  <option value="sv">Svenska</option>
                </select>
              </Field>
            </FieldGroup>
          </Fieldset>
          <Fieldset>
            <FieldLegend>Who can see your posts</FieldLegend>
            <FieldGroup>
              <Radio name="visibility" value="everyone">
                Everyone
              </Radio>
              <Radio defaultChecked name="visibility" value="friends">
                Friends
              </Radio>
              <Radio name="visibility" value="only-me">
                Only me
              </Radio>
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
            {status && <Success text={status} />}
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
              htmlFor="settings-code"
              label="Code from your app"
            >
              <input
                aria-describedby={
                  codeState === "error" ? "settings-code-end-text" : undefined
                }
                aria-invalid={codeState === "error" ? "true" : undefined}
                autoComplete="one-time-code"
                id="settings-code"
                inputMode="numeric"
                maxLength={6}
                name="code"
                pattern="[0-9]{6}"
                required
              />
            </OneTimeCode>
            <div role="status">
              {codeState === "verified" && (
                <Success text="Two-factor sign-in is on." />
              )}
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

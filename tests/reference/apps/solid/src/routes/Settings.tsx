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
} from "opui-css/solid"
import { verifyCode } from "reference-shared"
import { createSignal, Show } from "solid-js"
import { useTitle } from "../lib/title"

export default function Settings() {
  useTitle(() => "Settings")
  const [status, setStatus] = createSignal("")
  const [code, setCode] = createSignal("")
  const [codeState, setCodeState] = createSignal<"idle" | "error" | "verified">(
    "idle",
  )

  const save = (event: SubmitEvent) => {
    event.preventDefault()
    setStatus("Settings saved.")
  }

  const verify = async (event: SubmitEvent) => {
    event.preventDefault()
    setCodeState((await verifyCode(code())) ? "verified" : "error")
  }

  return (
    <>
      <div class="app-screen" data-screen="settings">
        <h1>Settings</h1>
        <Form aria-label="Settings" onSubmit={save}>
          <Fieldset>
            <FieldLegend>Account</FieldLegend>
            <FieldGroup>
              <Field for="settings-display-name" label="Display name">
                <input
                  defaultValue="Sam Rivera"
                  id="settings-display-name"
                  name="name"
                />
              </Field>
              <Field for="settings-email" label="Email">
                <input
                  defaultValue="sam@example.com"
                  id="settings-email"
                  name="email"
                  required
                  type="email"
                />
              </Field>
              <Field for="settings-language" label="Language">
                <select id="settings-language" name="language">
                  <SelectButton />
                  <option value="de">Deutsch</option>
                  <option selected value="en">
                    English
                  </option>
                  <option value="sv">Svenska</option>
                </select>
              </Field>
            </FieldGroup>
          </Fieldset>
          <Fieldset>
            <FieldLegend>Who can see your posts</FieldLegend>
            <FieldGroup name="visibility">
              <Radio value="everyone">Everyone</Radio>
              <Radio checked value="friends">
                Friends
              </Radio>
              <Radio value="only-me">Only me</Radio>
            </FieldGroup>
          </Fieldset>
          <Fieldset>
            <FieldLegend>Notifications</FieldLegend>
            <FieldGroup>
              <Switch checked name="email-notifications">
                Email notifications
              </Switch>
              <Switch name="push-notifications">Push notifications</Switch>
            </FieldGroup>
          </Fieldset>
          <div id="settings-status" role="status">
            <Show when={status()}>
              <Callout severity="success">
                <CalloutIcon />
                <CalloutContent>
                  <p>{status()}</p>
                </CalloutContent>
              </Callout>
            </Show>
          </div>
          <FieldGroup>
            <Button type="submit" variant="filled">
              Save
            </Button>
          </FieldGroup>
        </Form>

        <section aria-labelledby="two-factor-title" class="app-screen">
          <h2 id="two-factor-title">Two-factor sign-in</h2>
          <Form aria-label="Two-factor sign-in" onSubmit={verify}>
            <OneTimeCode
              endText={
                codeState() === "error"
                  ? "That code didn't work. Try again."
                  : undefined
              }
              for="settings-code"
              label="Code from your app"
            >
              <input
                aria-describedby={
                  codeState() === "error" ? "settings-code-end-text" : undefined
                }
                aria-invalid={codeState() === "error" ? "true" : undefined}
                autocomplete="one-time-code"
                id="settings-code"
                inputmode="numeric"
                maxlength={6}
                name="code"
                onInput={(event) => setCode(event.currentTarget.value)}
                pattern="[0-9]{6}"
                required
                value={code()}
              />
            </OneTimeCode>
            <div role="status">
              <Show when={codeState() === "verified"}>
                <Callout severity="success">
                  <CalloutIcon />
                  <CalloutContent>
                    <p>Two-factor sign-in is on.</p>
                  </CalloutContent>
                </Callout>
              </Show>
            </div>
            <FieldGroup>
              <Button type="submit" variant="outlined">
                Verify
              </Button>
            </FieldGroup>
          </Form>
        </section>

        <section aria-labelledby="danger-title" class="app-screen">
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

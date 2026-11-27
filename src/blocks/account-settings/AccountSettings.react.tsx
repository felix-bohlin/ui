import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  SelectButton,
  Switch,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"

export default function AccountSettings() {
  return (
    <>
      <div
        className="account-settings ui-layout-container ui-layout-column ui-gap-large"
        style={{ "--_max-inline-size": "48rem" }}
      >
        <hgroup className="ui-hgroup">
          <h1 className="ui-h3">Account settings</h1>
          <p>
            Tweak your profile, your password and how Bassbook looks for you.
          </p>
        </hgroup>
        <Tabs
          name="account-settings-tabs"
          style={{ "--_panel-gap": "var(--ui-space-6)" }}
          variant="line"
        >
          <TabsItem defaultChecked id="account-settings-tab-profile">
            <TabsLabel>Profile</TabsLabel>
            <TabsPanel>
              <Form action="#">
                <Fieldset>
                  <FieldLegend>Photo</FieldLegend>
                  <div className="ui-layout-row acct-photo">
                    <Avatar aria-label="Adam Groove" role="img" shape="rounded">
                      AG
                    </Avatar>
                    <div className="ui-layout-row ui-gap-small">
                      <Button size="small" type="button" variant="outlined">
                        Upload new pic
                      </Button>
                      <Button size="small" type="button">
                        Remove
                      </Button>
                    </div>
                    <p className="ui-caption">
                      JPG or PNG, at least 256 × 256 px. Bass in frame
                      encouraged!
                    </p>
                  </div>
                </Fieldset>
                <Fieldset>
                  <FieldLegend>Personal details</FieldLegend>
                  <FieldGroup>
                    <div
                      className="ui-layout-grid"
                      style={{ "--_min-inline-size": "18rem" }}
                    >
                      <Field
                        htmlFor="account-settings-first-name"
                        label="First name"
                      >
                        <input
                          autoComplete="given-name"
                          id="account-settings-first-name"
                          name="first-name"
                          required
                          type="text"
                          defaultValue="Adam"
                        />
                      </Field>
                      <Field
                        htmlFor="account-settings-last-name"
                        label="Last name"
                      >
                        <input
                          autoComplete="family-name"
                          id="account-settings-last-name"
                          name="last-name"
                          required
                          type="text"
                          defaultValue="Groove"
                        />
                      </Field>
                    </div>
                    <Field
                      endText={
                        <>
                          <span className="ui-p ui-success">Verified</span>,
                          used for sign-in and wall scribble alerts
                        </>
                      }
                      htmlFor="account-settings-email"
                      label="Email"
                    >
                      <input
                        aria-describedby="account-settings-email-end-text"
                        autoComplete="email"
                        id="account-settings-email"
                        name="email"
                        required
                        type="email"
                        defaultValue="adam@bassmail.example"
                      />
                    </Field>
                    <Field
                      htmlFor="account-settings-username"
                      label="Username"
                      start="bassbook.example/"
                    >
                      <input
                        aria-describedby="account-settings-username-start"
                        autoComplete="username"
                        id="account-settings-username"
                        name="username"
                        type="text"
                        defaultValue="percygroove"
                      />
                    </Field>
                    <Field
                      bottom="84 / 160"
                      htmlFor="account-settings-bio"
                      label="Bio"
                      startText="Shown on your profile for the whole world to admire"
                    >
                      <textarea
                        aria-describedby="account-settings-bio-start-text account-settings-bio-bottom"
                        id="account-settings-bio"
                        name="bio"
                        rows={3}
                        defaultValue="Fretless bassist in a garage band. Into flatwounds, drop D and very long root notes."
                      ></textarea>
                    </Field>
                  </FieldGroup>
                </Fieldset>
                <FieldGroup className="acct-actions">
                  <Button type="reset">Cancel</Button>
                  <Button type="submit" variant="filled">
                    Save my profile
                  </Button>
                </FieldGroup>
              </Form>
            </TabsPanel>
          </TabsItem>
          <TabsItem id="account-settings-tab-password">
            <TabsLabel>Password</TabsLabel>
            <TabsPanel>
              <Form action="#">
                <Fieldset>
                  <FieldLegend>Change password</FieldLegend>
                  <FieldDescription>
                    Last changed on 12 June 2026. Wow, so fresh!
                  </FieldDescription>
                  <FieldGroup>
                    <Field
                      htmlFor="account-settings-current-password"
                      label="Current password"
                    >
                      <input
                        autoComplete="current-password"
                        id="account-settings-current-password"
                        name="current-password"
                        required
                        type="password"
                      />
                    </Field>
                    <Field
                      endText='At least 12 characters. "slap-that-low-B" works great.'
                      htmlFor="account-settings-new-password"
                      label="New password"
                    >
                      <input
                        aria-describedby="account-settings-new-password-end-text"
                        autoComplete="new-password"
                        id="account-settings-new-password"
                        minLength={12}
                        name="new-password"
                        required
                        type="password"
                      />
                    </Field>
                    <Field
                      htmlFor="account-settings-confirm-password"
                      label="Confirm new password"
                    >
                      <input
                        autoComplete="new-password"
                        id="account-settings-confirm-password"
                        name="confirm-password"
                        required
                        type="password"
                      />
                    </Field>
                  </FieldGroup>
                </Fieldset>
                <Fieldset>
                  <FieldLegend>Sign-in security</FieldLegend>
                  <FieldGroup>
                    <Switch
                      defaultChecked
                      endText="Ask for a code so nobody sneaks onto your wall."
                      label="Two-factor authentication"
                      name="two-factor"
                      spread
                    />
                    <Switch
                      defaultChecked
                      endText="Email me when a new computer signs in."
                      label="Sign-in alerts"
                      name="sign-in-alerts"
                      spread
                    />
                  </FieldGroup>
                </Fieldset>
                <FieldGroup className="acct-actions">
                  <Button type="submit" variant="filled">
                    Update password
                  </Button>
                </FieldGroup>
              </Form>
            </TabsPanel>
          </TabsItem>
          <TabsItem id="account-settings-tab-preferences">
            <TabsLabel>Preferences</TabsLabel>
            <TabsPanel>
              <Form action="#">
                <Fieldset>
                  <FieldLegend>Theme</FieldLegend>
                  <ToggleGroup aria-label="Theme" name="account-settings-theme">
                    <ToggleButton label="Light" value="light" />
                    <ToggleButton label="Dark" value="dark" />
                    <ToggleButton
                      defaultChecked
                      label="System"
                      value="system"
                    />
                  </ToggleGroup>
                </Fieldset>
                <Fieldset>
                  <FieldLegend>Region</FieldLegend>
                  <div
                    className="ui-layout-grid"
                    style={{ "--_min-inline-size": "18rem" }}
                  >
                    <Field htmlFor="account-settings-language" label="Language">
                      <select
                        id="account-settings-language"
                        name="language"
                        defaultValue="en"
                      >
                        <SelectButton />
                        <option value="da">Dansk</option>
                        <option value="de">Deutsch</option>
                        <option value="en">English</option>
                        <option value="nb">Norsk</option>
                        <option value="sv">Svenska</option>
                      </select>
                    </Field>
                    <Field
                      htmlFor="account-settings-timezone"
                      label="Time zone"
                    >
                      <select
                        id="account-settings-timezone"
                        name="timezone"
                        defaultValue="stockholm"
                      >
                        <SelectButton />
                        <option value="london">London (GMT+1)</option>
                        <option value="stockholm">Stockholm (GMT+2)</option>
                        <option value="helsinki">Helsinki (GMT+3)</option>
                      </select>
                    </Field>
                  </div>
                </Fieldset>
                <Fieldset>
                  <FieldLegend>Accessibility</FieldLegend>
                  <FieldGroup>
                    <Switch label="Reduce motion" name="reduce-motion" spread />
                    <Switch
                      defaultChecked
                      label="Always underline links"
                      name="underline-links"
                      spread
                    />
                  </FieldGroup>
                </Fieldset>
                <FieldGroup className="acct-actions">
                  <Button type="submit" variant="filled">
                    Save my prefs
                  </Button>
                </FieldGroup>
              </Form>
            </TabsPanel>
          </TabsItem>
        </Tabs>
        <Card
          aria-labelledby="account-settings-danger-heading"
          as="section"
          className="acct-danger"
          variant="outlined"
        >
          <hgroup>
            <h2 className="ui-h5" id="account-settings-danger-heading">
              Danger zone
            </h2>
          </hgroup>
          <CardContent className="ui-layout-row ui-spread">
            <p>
              Deleting your account removes your profile, wall and bass photos
              for good. Save your favourite pics first! We'll miss you :(
            </p>
            <Button
              color="critical"
              command="show-modal"
              commandfor="account-settings-delete-dialog"
              type="button"
              variant="outlined"
            >
              Delete account
            </Button>
          </CardContent>
        </Card>
        <Dialog
          aria-describedby="account-settings-delete-description"
          id="account-settings-delete-dialog"
          role="alertdialog"
        >
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <p id="account-settings-delete-description">
              This deletes adam@bassmail.example, your wall and every photo of
              your gear. You can't undo this.
            </p>
          </DialogContent>
          <DialogFooter>
            <Button
              command="close"
              commandfor="account-settings-delete-dialog"
              type="button"
            >
              Cancel
            </Button>
            <Button
              color="critical"
              command="close"
              commandfor="account-settings-delete-dialog"
              type="button"
              variant="filled"
            >
              Delete account
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <style>{`
        .account-settings {
          container-type: inline-size;

          .acct-photo {
            .ui-avatar {
              font-size: var(--ui-font-size-600);
              inline-size: 5rem;
            }

            p {
              flex-basis: 100%;

              @container (inline-size >= 40rem) {
                flex-basis: auto;
              }
            }
          }

          .acct-actions {
            justify-content: end;
          }

          .acct-danger {
            --_outlined-border-color: var(--ui-critical-text);

            p {
              flex: 1 1 18rem;
            }
          }
        }
      `}</style>
    </>
  )
}

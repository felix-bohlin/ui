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
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  Select,
  Switch,
  Tabs,
  TabsItem,
  TabsLabel,
  TabsPanel,
  TextField,
  Textarea,
  ToggleButton,
  ToggleGroup,
} from "opui-css/react"

export default function AccountSettings() {
  return (
    <>
      <div
        className="account-settings ui-layout-container ui-layout-column ui-large"
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
          style={{ "--_panel-gap": "var(--ui-space-5)" }}
          variant="line"
        >
          <TabsItem defaultChecked id="account-settings-tab-profile">
            <TabsLabel>Profile</TabsLabel>
            <TabsPanel>
              <Form action="#">
                <Fieldset>
                  <FieldLegend>Photo</FieldLegend>
                  <div className="ui-layout-row acct-photo">
                    <Avatar
                      aria-label="Percy Groove"
                      role="img"
                      shape="rounded"
                    >
                      PG
                    </Avatar>
                    <div className="ui-layout-row ui-small">
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
                      <TextField
                        autoComplete="given-name"
                        defaultValue="Percy"
                        id="account-settings-first-name"
                        label="First name"
                        name="first-name"
                        required
                        type="text"
                      />
                      <TextField
                        autoComplete="family-name"
                        defaultValue="Groove"
                        id="account-settings-last-name"
                        label="Last name"
                        name="last-name"
                        required
                        type="text"
                      />
                    </div>
                    <TextField
                      autoComplete="email"
                      defaultValue="percy@lowend.example"
                      endText={
                        <>
                          <span className="ui-p ui-success">Verified</span>,
                          used for sign-in and wall scribble alerts
                        </>
                      }
                      id="account-settings-email"
                      label="Email"
                      name="email"
                      required
                      type="email"
                    />
                    <TextField
                      autoComplete="username"
                      defaultValue="percygroove"
                      id="account-settings-username"
                      label="Username"
                      name="username"
                      start="bassbook.example/"
                      type="text"
                    />
                    <Textarea
                      bottom="84 / 160"
                      defaultValue="Fretless bassist in a garage band. Into flatwounds, drop D and very long root notes."
                      id="account-settings-bio"
                      label="Bio"
                      name="bio"
                      rows={3}
                      startText="Shown on your profile for the whole world to admire"
                    />
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
                    <TextField
                      autoComplete="current-password"
                      id="account-settings-current-password"
                      label="Current password"
                      name="current-password"
                      required
                      type="password"
                    />
                    <TextField
                      autoComplete="new-password"
                      endText='At least 12 characters. "slap-that-low-B" works great.'
                      id="account-settings-new-password"
                      label="New password"
                      minLength={12}
                      name="new-password"
                      required
                      type="password"
                    />
                    <TextField
                      autoComplete="new-password"
                      id="account-settings-confirm-password"
                      label="Confirm new password"
                      name="confirm-password"
                      required
                      type="password"
                    />
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
                    <Select
                      id="account-settings-language"
                      items={[
                        { label: "Dansk", value: "da" },
                        { label: "Deutsch", value: "de" },
                        { label: "English", selected: true, value: "en" },
                        { label: "Norsk", value: "nb" },
                        { label: "Svenska", value: "sv" },
                      ]}
                      label="Language"
                      name="language"
                    />
                    <Select
                      id="account-settings-timezone"
                      items={[
                        { label: "London (GMT+1)", value: "london" },
                        {
                          label: "Stockholm (GMT+2)",
                          selected: true,
                          value: "stockholm",
                        },
                        { label: "Helsinki (GMT+3)", value: "helsinki" },
                      ]}
                      label="Time zone"
                      name="timezone"
                    />
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
              This deletes percy@lowend.example, your wall and every photo of
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

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
  List,
  ListItem,
  PasswordToggle,
  Progress,
  RadioInput,
} from "opui-css/react"

export default function SignUp() {
  return (
    <>
      <div
        className="sign-up ui-layout-container"
        style={{ "--_max-inline-size": "66rem" }}
      >
        <div
          className="ui-layout-columns sign-up-layout"
          style={{ "--_columns": "7fr 5fr", "--_gap": "var(--ui-space-6)" }}
        >
          <Card density="spacious" variant="outlined">
            <hgroup>
              <h1 className="ui-h4">Join Bassbook!</h1>
              <p>
                Finally, a place where people actually listen to the bassist.
              </p>
            </hgroup>
            <CardContent>
              <Form action="#">
                <FieldGroup>
                  <FieldGroup orientation="horizontal">
                    <Field htmlFor="sign-up-first-name" label="First name">
                      <input
                        autoComplete="given-name"
                        id="sign-up-first-name"
                        name="first-name"
                        placeholder="Rory"
                        required
                        type="text"
                      />
                    </Field>
                    <Field htmlFor="sign-up-last-name" label="Last name">
                      <input
                        autoComplete="family-name"
                        id="sign-up-last-name"
                        name="last-name"
                        placeholder="Rootnote"
                        required
                        type="text"
                      />
                    </Field>
                  </FieldGroup>
                  <Field htmlFor="sign-up-email" label="Email">
                    <input
                      autoComplete="email"
                      id="sign-up-email"
                      name="email"
                      placeholder="rory@lowend.example"
                      required
                      type="email"
                    />
                  </Field>
                  <Field
                    end={<PasswordToggle htmlFor="sign-up-password" />}
                    endText="At least 12 characters, with a number or a symbol. Go wild!"
                    htmlFor="sign-up-password"
                    label="Password"
                  >
                    <input
                      aria-describedby="sign-up-password-end-text"
                      autoComplete="new-password"
                      id="sign-up-password"
                      minLength={12}
                      name="password"
                      required
                      type="password"
                      defaultValue="four-strings-4ever"
                    />
                  </Field>
                  <div className="ui-layout-column ui-x-small">
                    <span
                      className="ui-layout-row ui-spread sign-up-strength-label"
                      id="sign-up-strength"
                    >
                      <span>Password strength</span>
                      <span className="ui-p ui-success sign-up-strong">
                        Strong
                      </span>
                    </span>
                    <Progress
                      aria-labelledby="sign-up-strength"
                      max="4"
                      value="3"
                    />
                  </div>
                </FieldGroup>
                <Fieldset>
                  <FieldLegend>Membership</FieldLegend>
                  <FieldDescription>
                    Switch whenever you like, no hard feelings!
                  </FieldDescription>
                  <List
                    bordered
                    className="sign-up-plans"
                    variant="transparent"
                  >
                    <ListItem
                      choice="radio"
                      description="A profile, a wall and all the sympathy you need."
                      end={
                        <>
                          <span className="ui-tabular-nums sign-up-price">
                            €0
                          </span>
                          <RadioInput
                            id="sign-up-plan-basic"
                            name="sign-up-plan"
                            value="basic"
                          />
                        </>
                      }
                      htmlFor="sign-up-plan-basic"
                      label="Basic"
                    />
                    <ListItem
                      choice="radio"
                      description="A shiny gold name and unlimited photos of your gear."
                      end={
                        <>
                          <span className="ui-tabular-nums sign-up-price">
                            €3 / month
                          </span>
                          <RadioInput
                            defaultChecked
                            id="sign-up-plan-gold"
                            name="sign-up-plan"
                            value="gold"
                          />
                        </>
                      }
                      htmlFor="sign-up-plan-gold"
                      label="Gold"
                    />
                    <ListItem
                      choice="radio"
                      description="Everything in Gold, and your posts are always 10% louder."
                      end={
                        <>
                          <span className="ui-tabular-nums sign-up-price">
                            €5 / month
                          </span>
                          <RadioInput
                            id="sign-up-plan-platinum"
                            name="sign-up-plan"
                            value="platinum"
                          />
                        </>
                      }
                      htmlFor="sign-up-plan-platinum"
                      label="Platinum"
                    />
                  </List>
                </Fieldset>
                <FieldGroup>
                  <Checkbox name="terms" required>
                    I agree to the{" "}
                    <a className="ui-link" href="#sign-up-terms">
                      Terms of Service
                    </a>{" "}
                    and the{" "}
                    <a className="ui-link" href="#sign-up-privacy">
                      Privacy Policy
                    </a>
                    .
                  </Checkbox>
                  <Checkbox name="updates">
                    Send me the Bassbook newsletter, about once a month. It has
                    tabs!
                  </Checkbox>
                  <Button
                    className="sign-up-submit"
                    type="submit"
                    variant="filled"
                  >
                    Sign me up!
                  </Button>
                </FieldGroup>
              </Form>
              <p className="sign-up-footer">
                Already a member?{" "}
                <a className="ui-link" href="#sign-up-sign-in">
                  Log in
                </a>
              </p>
            </CardContent>
          </Card>
          <aside
            aria-label="Why Bassbook"
            className="ui-layout-column ui-large sign-up-aside"
          >
            <hgroup className="ui-hgroup">
              <p className="ui-overline">Why bassists join</p>
              <h2 className="ui-h3">
                The only crowd that watches your fingers
              </h2>
            </hgroup>
            <List flush variant="transparent">
              <ListItem
                description="Bring your gear list, your tabs and your grudges."
                label="Set up in minutes"
                start={
                  <svg
                    data-icon="check-circle"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                }
              />
              <ListItem
                description="Every post gets read, even the ones about tone."
                label="People actually listen"
                start={
                  <svg
                    data-icon="check-circle"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                }
              />
              <ListItem
                description="Take all your stuff with you in one click."
                label="Cancel any time"
                start={
                  <svg
                    data-icon="check-circle"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"
                    ></path>
                  </svg>
                }
              />
            </List>
            <blockquote className="ui-blockquote">
              “My band still won't let me pick the songs, but here 300 people
              liked my pedalboard!”
              <footer>
                Percy Groove, <cite>bassist in Brad and the Brads</cite>
              </footer>
            </blockquote>
          </aside>
        </div>
      </div>
      <style>{`
        .sign-up {
          .sign-up-layout {
            align-items: center;
          }

          .sign-up-strength-label {
            font-size: var(--ui-font-size-caption);
          }

          .sign-up-strong {
            font-weight: var(--ui-font-weight-semibold);
          }

          .sign-up-plans .ui-end {
            gap: var(--ui-space-3);
          }

          .sign-up-price {
            white-space: nowrap;
          }

          .sign-up-submit {
            inline-size: 100%;
          }

          .sign-up-footer {
            text-align: center;
          }

          .sign-up-aside {
            padding-inline: var(--ui-space-2);
          }
        }
      `}</style>
    </>
  )
}

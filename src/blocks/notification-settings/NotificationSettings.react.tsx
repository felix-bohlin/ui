import {
  Button,
  Card,
  CardContent,
  FieldGroup,
  Radio,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextField,
} from "opui-css/react"

export default function NotificationSettings() {
  return (
    <>
      <form
        className="notification-settings ui-layout-container ui-layout-column ui-large"
        style={{ "--_max-inline-size": "56rem" }}
        action="#"
      >
        <div className="ui-layout-row ui-spread">
          <hgroup className="ui-hgroup">
            <h1 className="ui-h3">Notifications</h1>
            <p>Pick what gets a ping, and where. You're the boss!</p>
          </hgroup>
          <Switch
            label="Snooze all for 24 hours"
            name="notification-settings-pause"
          />
        </div>
        <Card
          aria-labelledby="notification-settings-channels-heading"
          as="section"
          variant="outlined"
        >
          <hgroup>
            <h2 className="ui-h5" id="notification-settings-channels-heading">
              Channels
            </h2>
            <p>
              SMS goes to 555 0123 4567.{" "}
              <a className="ui-link" href="#notification-settings-phone">
                Change number
              </a>
            </p>
          </hgroup>
          <CardContent>
            <Table flush>
              <TableHead>
                <TableRow>
                  <TableHeaderCell scope="col">Notification</TableHeaderCell>
                  <TableHeaderCell className="notif-channel" scope="col">
                    <svg
                      data-icon="mail"
                      aria-hidden="true"
                      className="ui-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
                      ></path>
                    </svg>
                    Email
                  </TableHeaderCell>
                  <TableHeaderCell className="notif-channel" scope="col">
                    <svg
                      data-icon="smartphone"
                      aria-hidden="true"
                      className="ui-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99M17 19H7V5h10z"
                      ></path>
                    </svg>
                    Push
                  </TableHeaderCell>
                  <TableHeaderCell className="notif-channel" scope="col">
                    <svg
                      data-icon="sms"
                      aria-hidden="true"
                      className="ui-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M9 11H7V9h2zm4 0h-2V9h2zm4 0h-2V9h2z"
                      ></path>
                    </svg>
                    SMS
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableHeaderCell
                    className="notif-group"
                    colSpan={4}
                    id="notification-settings-activity"
                    scope="colgroup"
                  >
                    Activity
                  </TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Mentions</span>
                    <span className="notif-desc ui-caption">
                      When someone @mentions you (finally!)
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Mentions by email"
                      name="notification-settings-mentions-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Mentions by push"
                      name="notification-settings-mentions-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Mentions by SMS"
                      name="notification-settings-mentions-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Replies</span>
                    <span className="notif-desc ui-caption">
                      Replies to posts you commented on
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Replies by email"
                      name="notification-settings-replies-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Replies by push"
                      name="notification-settings-replies-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Replies by SMS"
                      name="notification-settings-replies-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Wall scribbles</span>
                    <span className="notif-desc ui-caption">
                      When a friend writes on your wall
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Wall scribbles by email"
                      name="notification-settings-wall-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Wall scribbles by push"
                      name="notification-settings-wall-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Wall scribbles by SMS"
                      name="notification-settings-wall-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableHeaderCell
                    className="notif-group"
                    colSpan={4}
                    id="notification-settings-friends"
                    scope="colgroup"
                  >
                    Friends
                  </TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Friend requests</span>
                    <span className="notif-desc ui-caption">
                      When someone wants to be your bass buddy
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Friend requests by email"
                      name="notification-settings-requests-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Friend requests by push"
                      name="notification-settings-requests-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Friend requests by SMS"
                      name="notification-settings-requests-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Gig reminders</span>
                    <span className="notif-desc ui-caption">
                      The day before a gig (in case nobody told you)
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Gig reminders by email"
                      name="notification-settings-gig-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Gig reminders by push"
                      name="notification-settings-gig-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Gig reminders by SMS"
                      name="notification-settings-gig-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Weekly summary</span>
                    <span className="notif-desc ui-caption">
                      Every Monday at 08:00, with cocoa
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Weekly summary by email"
                      name="notification-settings-digest-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Weekly summary by push"
                      name="notification-settings-digest-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Weekly summary by SMS"
                      name="notification-settings-digest-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableHeaderCell
                    className="notif-group"
                    colSpan={4}
                    id="notification-settings-account"
                    scope="colgroup"
                  >
                    Account
                  </TableHeaderCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Security alerts</span>
                    <span className="notif-desc ui-caption">
                      New sign-ins and password changes. Email is always on.
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      disabled
                      hideLabel
                      label="Security alerts by email"
                      name="notification-settings-security-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Security alerts by push"
                      name="notification-settings-security-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Security alerts by SMS"
                      name="notification-settings-security-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className="notif-name">Bassbook Gold</span>
                    <span className="notif-desc ui-caption">
                      Receipts and renewal reminders
                    </span>
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      defaultChecked
                      hideLabel
                      label="Bassbook Gold by email"
                      name="notification-settings-gold-email"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Bassbook Gold by push"
                      name="notification-settings-gold-push"
                      size="small"
                    />
                  </TableCell>
                  <TableCell className="notif-cell">
                    <Switch
                      hideLabel
                      label="Bassbook Gold by SMS"
                      name="notification-settings-gold-sms"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="ui-layout-columns ui-large ui-breakpoint-small">
          <Card
            aria-labelledby="notification-settings-quiet-heading"
            as="section"
            variant="outlined"
          >
            <hgroup>
              <h2 className="ui-h5" id="notification-settings-quiet-heading">
                Quiet hours
              </h2>
              <p>
                Shhh! Push and SMS wait until morning. Security alerts don't.
              </p>
            </hgroup>
            <CardContent>
              <FieldGroup orientation="horizontal">
                <TextField
                  defaultValue="22:00"
                  id="notification-settings-quiet-from"
                  label="From"
                  name="quiet-from"
                  type="time"
                />
                <TextField
                  defaultValue="07:00"
                  id="notification-settings-quiet-to"
                  label="To"
                  name="quiet-to"
                  type="time"
                />
              </FieldGroup>
            </CardContent>
          </Card>
          <Card
            aria-labelledby="notification-settings-digest-heading"
            as="section"
            variant="outlined"
          >
            <hgroup>
              <h2 className="ui-h5" id="notification-settings-digest-heading">
                Email digest
              </h2>
              <p>Get one cosy email with all the news instead of a hundred.</p>
            </hgroup>
            <CardContent>
              <FieldGroup
                aria-labelledby="notification-settings-digest-heading"
                name="notification-settings-digest"
                orientation="horizontal"
                role="radiogroup"
              >
                <Radio label="Off" value="off" />
                <Radio defaultChecked label="Daily" value="daily" />
                <Radio label="Weekly" value="weekly" />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
        <div className="ui-layout-row ui-small ui-spread">
          <p>Changes apply to all your computers and phones.</p>
          <div className="ui-layout-row ui-small">
            <Button type="reset">Reset to defaults</Button>
            <Button type="submit" variant="filled">
              Save changes
            </Button>
          </div>
        </div>
      </form>
      <style>{`
        .notification-settings {
          container-type: inline-size;

          .notif-channel {
            inline-size: 3.5rem;
            text-align: center;

            svg {
              display: block;
              margin-inline: auto;
            }

            @container (inline-size >= 40rem) {
              inline-size: 5.5rem;
            }
          }

          .notif-group {
            font-size: var(--ui-font-size-caption);
          }

          .notif-name,
          .notif-desc {
            display: block;
          }

          .notif-name {
            font-weight: var(--ui-font-weight-medium);
          }

          .notif-desc {
            font-weight: var(--ui-font-weight-normal);
          }

          .notif-cell {
            text-align: center;

            .ui-switch {
              justify-content: center;
            }
          }
        }
      `}</style>
    </>
  )
}

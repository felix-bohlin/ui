import { Card, CardContent } from "opui-css/react"

export default function Sticky() {
  return (
    <div
      aria-label="Account settings"
      role="region"
      style={{ maxBlockSize: "16rem", overflow: "auto" }}
      tabIndex={0}
    >
      <div className="ui-layout-container">
        <div
          className="ui-layout-columns ui-breakpoint-small"
          style={{ "--_columns": "15rem 1fr" }}
        >
          <Card className="ui-sticky" variant="tonal">
            <CardContent>Account settings</CardContent>
          </Card>
          <div className="ui-layout-column">
            <Card variant="outlined">
              <CardContent>
                Billing: your plan, payment method and past invoices. A change
                to the plan applies from the next billing date.
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                Data export: a ZIP file of your projects, tasks and comments,
                with one CSV file per table, sent to your email address.
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                Notifications: which updates reach you by email, push or SMS,
                and whether they arrive at once or in one daily digest.
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                Profile: your name, photo and the email address people see when
                you share a project with them or mention them in a comment.
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                Security: your password, two-step verification and the devices
                signed in to your account, which you can sign out one by one.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

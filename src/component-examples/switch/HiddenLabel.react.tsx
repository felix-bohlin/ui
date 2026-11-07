import {
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "opui-css/react"

export default function HiddenLabel() {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <span className="ui-sr-only">On</span>
            </TableHeaderCell>
            <TableHeaderCell>Channel</TableHeaderCell>
            <TableHeaderCell>Schedule</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Switch
                defaultChecked
                hideLabel
                name="switch-hidden-label"
                value="email"
              >
                Email
              </Switch>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Daily</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Switch hideLabel name="switch-hidden-label" value="push">
                Push
              </Switch>
            </TableCell>
            <TableCell>Push</TableCell>
            <TableCell>Right away</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Switch hideLabel name="switch-hidden-label" value="sms">
                SMS
              </Switch>
            </TableCell>
            <TableCell>SMS</TableCell>
            <TableCell>Weekly</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p>
        Play{" "}
        <Switch
          defaultChecked
          hideLabel
          name="switch-hidden-label-sound"
          value="sounds"
        >
          Sounds
        </Switch>{" "}
        sounds and{" "}
        <Switch hideLabel name="switch-hidden-label-sound" value="haptics">
          Haptics
        </Switch>{" "}
        haptics.
      </p>
    </>
  )
}

import {
  Checkbox,
  SelectAll,
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
      <SelectAll>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                <Checkbox data-select-all="" hideLabel>
                  Select all tabs
                </Checkbox>
              </TableHeaderCell>
              <TableHeaderCell>File</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox
                  defaultChecked
                  hideLabel
                  name="checkbox-hidden-label"
                  value="invoice"
                >
                  Select Setlist.pdf
                </Checkbox>
              </TableCell>
              <TableCell>Setlist.pdf</TableCell>
              <TableCell>120 kB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox hideLabel name="checkbox-hidden-label" value="logo">
                  Select Band-logo.svg
                </Checkbox>
              </TableCell>
              <TableCell>Band-logo.svg</TableCell>
              <TableCell>8 kB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox hideLabel name="checkbox-hidden-label" value="notes">
                  Select Slap-tabs.md
                </Checkbox>
              </TableCell>
              <TableCell>Slap-tabs.md</TableCell>
              <TableCell>2 kB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SelectAll>

      <p>
        Notify me by{" "}
        <Checkbox
          defaultChecked
          name="checkbox-hidden-label-notify"
          value="email"
        >
          email
        </Checkbox>{" "}
        and{" "}
        <Checkbox name="checkbox-hidden-label-notify" value="sms">
          SMS
        </Checkbox>
        .
      </p>
    </>
  )
}

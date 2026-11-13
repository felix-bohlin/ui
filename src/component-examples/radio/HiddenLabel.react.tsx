import {
  Radio,
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
              <span className="ui-sr-only">Pick</span>
            </TableHeaderCell>
            <TableHeaderCell>Plan</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Radio hideLabel name="radio-hidden-label" value="basic">
                Pick Basic
              </Radio>
            </TableCell>
            <TableCell>Basic</TableCell>
            <TableCell>€0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Radio
                defaultChecked
                hideLabel
                name="radio-hidden-label"
                value="gold"
              >
                Pick Gold
              </Radio>
            </TableCell>
            <TableCell>Gold</TableCell>
            <TableCell>€3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Radio hideLabel name="radio-hidden-label" value="platinum">
                Pick Platinum
              </Radio>
            </TableCell>
            <TableCell>Platinum</TableCell>
            <TableCell>€5</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p>
        Ship to{" "}
        <Radio
          defaultChecked
          hideLabel
          name="radio-hidden-label-shipping"
          value="home"
        >
          Home
        </Radio>{" "}
        home or{" "}
        <Radio hideLabel name="radio-hidden-label-shipping" value="rehearsal">
          Rehearsal space
        </Radio>{" "}
        the rehearsal space.
      </p>
    </>
  )
}

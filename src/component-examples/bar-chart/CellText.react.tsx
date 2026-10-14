import { BarChart } from "opui-css/react"

export default function CellText() {
  return (
    <BarChart caption="Storage per team" max={112}>
      <thead>
        <tr>
          <th scope="col">Team</th>
          <th scope="col">Used</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Design</th>
          <td style={{ "--value": 48 }} tabIndex={0}>
            48 GB
          </td>
        </tr>
        <tr>
          <th scope="row">Engineering</th>
          <td style={{ "--value": 112 }} tabIndex={0}>
            112 GB
          </td>
        </tr>
        <tr>
          <th scope="row">Marketing</th>
          <td style={{ "--value": 31 }} tabIndex={0}>
            31 GB
          </td>
        </tr>
        <tr>
          <th scope="row">Sales</th>
          <td style={{ "--value": 22 }} tabIndex={0}>
            22 GB
          </td>
        </tr>
      </tbody>
    </BarChart>
  )
}

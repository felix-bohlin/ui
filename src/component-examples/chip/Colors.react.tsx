import { Chip } from "opui-css/react"

export default function Colors() {
  return (
    <>
      <Chip color="critical" label="Past due" />
      <Chip color="info" label="Processing" />
      <Chip color="neutral" label="Refunded" />
      <Chip color="success" label="Paid" />
      <Chip color="warning" label="Due 15 Oct" />
    </>
  )
}

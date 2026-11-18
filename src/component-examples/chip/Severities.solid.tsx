/** @jsxImportSource @solidjs/web */
import { Chip } from "opui-css/solid"

export default function Severities() {
  return (
    <>
      <Chip label="Past due" severity="critical" />
      <Chip label="Processing" severity="info" />
      <Chip label="Refunded" severity="neutral" />
      <Chip label="Paid" severity="success" />
      <Chip label="Due 15 Oct" severity="warning" />
    </>
  )
}

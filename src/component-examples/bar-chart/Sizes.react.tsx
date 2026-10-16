import { BarChart } from "opui-css/react"

const rows = [
  { label: "Mon", values: [4] },
  { label: "Tue", values: [7] },
  { label: "Wed", values: [5] },
  { label: "Thu", values: [9] },
  { label: "Fri", values: [3] },
]

export default function Sizes() {
  return (
    <>
      <BarChart
        caption="Small"
        label="Day"
        rows={rows}
        series={["Deploys"]}
        size="small"
      />
      <BarChart
        caption="Large"
        label="Day"
        rows={rows}
        series={["Deploys"]}
        size="large"
      />
    </>
  )
}

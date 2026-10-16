import { BarChart, type BarChartRow } from "opui-css/react"

const rows: BarChartRow[] = [
  { label: "Amsterdam", values: [84] },
  { label: "Frankfurt", values: [96] },
  { color: "warning", label: "London", values: [142] },
  { label: "Paris", values: [88] },
  { color: "critical", label: "Stockholm", values: [210] },
  { label: "Warsaw", values: [101] },
]

export default function Colors() {
  return (
    <BarChart
      caption="Response time by region (ms). London is over the 120 ms target, Stockholm over the 200 ms limit."
      label="Region"
      rows={rows}
      series={["Response time"]}
    />
  )
}

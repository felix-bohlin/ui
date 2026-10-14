<script lang="ts">
  import { BarChart, type BarChartRow } from "opui-css/svelte"

  const rows: BarChartRow[] = [
    { label: "Amsterdam", values: [84] },
    { label: "Frankfurt", values: [96] },
    { color: "warning", label: "London", values: [142] },
    { label: "Paris", values: [88] },
    { color: "critical", label: "Stockholm", values: [210] },
    { label: "Warsaw", values: [101] },
  ]
</script>

<BarChart
  caption="Response time by region (ms). London is over the 120 ms target, Stockholm over the 200 ms limit."
  label="Region"
  {rows}
  series={["Response time"]}
/>

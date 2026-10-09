<script lang="ts">
  import { BarChart, type BarChartRow } from "opui-css/svelte"

  const format = new Intl.NumberFormat("en", {
    signDisplay: "exceptZero",
  }).format

  const rows: BarChartRow[] = [
    { label: "Jan", values: [120] },
    { label: "Feb", values: [85] },
    { color: "critical", label: "Mar", values: [-40] },
    { label: "Apr", values: [210] },
    { label: "May", values: [160] },
    { color: "critical", label: "Jun", values: [-120] },
    { color: "critical", label: "Jul", values: [-65] },
    { label: "Aug", values: [95] },
    { label: "Sep", values: [240] },
    { label: "Oct", values: [310] },
  ]
</script>

<BarChart
  caption="Net new subscribers"
  {format}
  label="Month"
  {rows}
  series={["Net change"]}
/>

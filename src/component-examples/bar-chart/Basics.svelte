<script lang="ts">
  import { BarChart } from "opui-css/svelte"

  const rows = [
    { label: "Jan", values: [412] },
    { label: "Feb", values: [455] },
    { label: "Mar", values: [498] },
    { label: "Apr", values: [471] },
    { label: "May", values: [538] },
    { label: "Jun", values: [602] },
  ]
</script>

<BarChart caption="Orders per month" label="Month" {rows} series={["Orders"]} />

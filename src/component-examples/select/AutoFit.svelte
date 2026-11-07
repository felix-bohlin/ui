<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select
  autoFit
  items={[
    { label: "Citroën", value: "citroen" },
    { label: "Renault", value: "renault" },
    { label: "Volvo", value: "volvo" },
  ]}
  label="Car"
/>

<script lang="ts">
  import { Select } from "opui-css/svelte"
</script>

<Select disabled label="Plan">
  <option>Business</option>
  <option>Enterprise</option>
</Select>

<Select disabled label="Billing cycle" variant="filled">
  <option>Yearly</option>
  <option>Monthly</option>
</Select>

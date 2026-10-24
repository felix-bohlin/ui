<script lang="ts">
  import { Chip } from "opui-css/svelte"
</script>

<div class="example-row">
  <Chip aria-pressed="true" as="button" variant="outlined" label="All" />
  <Chip aria-pressed="false" as="button" variant="outlined" label="Open" />
  <Chip aria-pressed="false" as="button" variant="outlined" label="Closed" />
</div>
<div class="example-row">
  <Chip aria-pressed="true" as="button" label="Paid" />
  <Chip aria-pressed="false" as="button" label="Unpaid" />
</div>

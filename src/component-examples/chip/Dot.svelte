<script lang="ts">
  import { Chip } from "opui-css/svelte"
</script>

<div class="example-row">
  <Chip severity="critical" dot label="Past due" />
  <Chip severity="info" dot label="Processing" />
  <Chip severity="neutral" dot label="Refunded" />
  <Chip severity="success" dot label="Paid" />
  <Chip severity="warning" dot label="Due 15 Oct" />
</div>

<div class="example-row">
  <Chip
    severity="critical"
    dot
    label="Past due"
    size="small"
    variant="outlined"
  />
  <Chip
    severity="info"
    dot
    label="Processing"
    size="small"
    variant="outlined"
  />
  <Chip
    severity="neutral"
    dot
    label="Refunded"
    size="small"
    variant="outlined"
  />
  <Chip severity="success" dot label="Paid" size="small" variant="outlined" />
  <Chip
    severity="warning"
    dot
    label="Due 15 Oct"
    size="small"
    variant="outlined"
  />
</div>

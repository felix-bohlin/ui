<script lang="ts">
  import { NumberField } from "opui-css/svelte"
</script>

<NumberField
  id="number-field-sizes-1"
  label="x-small"
  size="x-small"
  value={1}
/>
<NumberField id="number-field-sizes-2" label="Small" size="small" value={1} />
<NumberField id="number-field-sizes-3" label="Medium" value={1} />
<NumberField id="number-field-sizes-4" label="Large" size="large" value={1} />

<script lang="ts">
  import { NumberField } from "opui-css/svelte"
</script>

<NumberField
  id="number-field-validation-1"
  label="Bandmates"
  min={1}
  required
/>
<NumberField
  endText="Only 4 sets of flatwounds left, whoops."
  error
  id="number-field-validation-2"
  label="Quantity"
  min={1}
  value={6}
/>

<script lang="ts">
  import { NumberStepper } from "opui-css/svelte"
</script>

<NumberStepper
  id="number-stepper-step-1"
  label="Opacity"
  max={1}
  min={0}
  step={0.1}
  value={0.5}
/>

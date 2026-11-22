<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"
</script>

<Field autoFit for="number-field-step-1" label="Opacity">
  <input
    id="number-field-step-1"
    max="1"
    min="0"
    step="0.1"
    type="number"
    value="0.5"
  />
  {#snippet start()}
    <StepButton command="--step-down" for="number-field-step-1" />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for="number-field-step-1" />
  {/snippet}
</Field>

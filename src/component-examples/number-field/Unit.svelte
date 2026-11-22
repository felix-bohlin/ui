<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"
</script>

<Field autoFit endText="kg" for="number-field-unit-1" label="Weight">
  <input
    aria-describedby="number-field-unit-1-end-text"
    id="number-field-unit-1"
    max="30"
    min="0.5"
    step="0.5"
    type="number"
    value="2.5"
  />
  {#snippet start()}
    <StepButton command="--step-down" for="number-field-unit-1" />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for="number-field-unit-1" />
  {/snippet}
</Field>

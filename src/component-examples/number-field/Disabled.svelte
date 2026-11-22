<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"
</script>

<Field autoFit for="number-field-disabled-1" label="Quantity">
  <input disabled id="number-field-disabled-1" type="number" value="1" />
  {#snippet start()}
    <StepButton command="--step-down" for="number-field-disabled-1" />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for="number-field-disabled-1" />
  {/snippet}
</Field>

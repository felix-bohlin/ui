<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"
</script>

<Field autoFit for="number-field-basics-1" label="Quantity">
  <input id="number-field-basics-1" max="10" min="1" type="number" value="1" />
  {#snippet start()}
    <StepButton command="--step-down" for="number-field-basics-1" />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for="number-field-basics-1" />
  {/snippet}
</Field>

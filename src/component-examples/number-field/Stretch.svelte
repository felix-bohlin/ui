<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"
</script>

<Field for="number-field-stretch-1" label="Quantity">
  <input id="number-field-stretch-1" max="10" min="1" type="number" value="1" />
  {#snippet start()}
    <StepButton command="--step-down" for="number-field-stretch-1" />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for="number-field-stretch-1" />
  {/snippet}
</Field>

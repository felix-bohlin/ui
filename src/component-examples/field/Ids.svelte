<script lang="ts">
  import { Field, StepButton } from "opui-css/svelte"

  const id = $props.id()
</script>

<Field autoFit endText="Up to 10 per order." for={id} label="Quantity">
  <input
    aria-describedby="{id}-end-text"
    {id}
    max="10"
    min="1"
    type="number"
    value="1"
  />
  {#snippet start()}
    <StepButton command="--step-down" for={id} />
  {/snippet}
  {#snippet end()}
    <StepButton command="--step-up" for={id} />
  {/snippet}
</Field>

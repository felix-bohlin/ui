<script lang="ts">
  import { Range } from "opui-css/svelte"

  let value = $state("21")
</script>

<Range
  aria-valuetext={`${value}°`}
  bind:value
  id="range-value-text-1"
  label="Temperature"
  max="30"
  min="10"
>
  {#snippet valueText(value)}<b>{value}°</b>{/snippet}
</Range>

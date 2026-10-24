<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range id="range-value-text-1" label="Temperature" max="30" min="10" value="21">
  {#snippet valueText(value)}<b>{value}°</b>{/snippet}
</Range>

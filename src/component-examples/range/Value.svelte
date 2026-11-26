<script lang="ts">
  import { Field } from "opui-css/svelte"

  let brightness = $state(80)
</script>

<Field for="range-value-1" label="Brightness">
  <input
    aria-valuetext={`${brightness}%`}
    id="range-value-1"
    type="range"
    bind:value={brightness}
    defaultValue="80"
  />
  {#snippet endText()}<output for="range-value-1">{brightness}%</output
    >{/snippet}
</Field>

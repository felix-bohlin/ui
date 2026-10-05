<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range spread>
  Spread Layout
  {#snippet startText()}Start text{/snippet}
  {#snippet endText()}End text{/snippet}
</Range>

<Range spread disabled>
  Disabled
  {#snippet startText()}Start text{/snippet}
  {#snippet endText()}End text{/snippet}
</Range>

<Range spread error endText="This value is incorrect.">
  Invalid Range
  {#snippet startText()}Start text{/snippet}
</Range>

<Range
  label="Tick marks with labels"
  list="labeled-markers-spread"
  spread
  options={[
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]}
/>

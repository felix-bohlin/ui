<script lang="ts">
  import { Range } from "opui-css/svelte"
</script>

<Range label="Spread Layout" spread>
  {#snippet startText()}Start text{/snippet}
  {#snippet endText()}End text{/snippet}
</Range>

<Range disabled label="Disabled" spread>
  {#snippet startText()}Start text{/snippet}
  {#snippet endText()}End text{/snippet}
</Range>

<Range endText="Pick a value below 50." error label="Invalid Range" spread>
  {#snippet startText()}Start text{/snippet}
</Range>

<Range
  items={[
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]}
  label="Tick marks with labels"
  spread
/>

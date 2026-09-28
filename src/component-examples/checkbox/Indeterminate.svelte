<script lang="ts">
  import { Checkbox } from "@opui/svelte"
  import { FieldGroup } from "@opui/svelte"
  import { FieldLegend } from "@opui/svelte"
  import { FieldSet } from "@opui/svelte"

  const items = ["Apples", "Bananas", "Cherries"]
  let checked = $state([true, false, false])

  const allChecked = $derived(checked.every(Boolean))
  const indeterminate = $derived(checked.some(Boolean) && !allChecked)
</script>

<FieldSet class="indeterminate-demo">
  <FieldLegend>
    <Checkbox
      bind:checked={
        () => allChecked, (value) => (checked = checked.map(() => value))
      }
      class="parent"
      {indeterminate}>Select all</Checkbox
    >
  </FieldLegend>
  <FieldGroup name="indeterminate-children-astro">
    {#each items as item, index (item)}
      <Checkbox bind:checked={checked[index]} class="child">{item}</Checkbox>
    {/each}
  </FieldGroup>
</FieldSet>

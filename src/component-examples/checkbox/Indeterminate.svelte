<script lang="ts">
  import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/svelte"

  const items = ["Apples", "Bananas", "Cherries"]
  let checked = $state([true, false, false])

  const allChecked = $derived(checked.every(Boolean))
  const someChecked = $derived(checked.some(Boolean))
  const indeterminate = $derived(someChecked && !allChecked)

  function toggleAll() {
    const next = !allChecked
    checked = checked.map(() => next)
  }
</script>

<FieldSet class="indeterminate-demo">
  <FieldLegend>
    <Checkbox
      class="parent"
      bind:checked={() => allChecked, toggleAll}
      {indeterminate}>Select all</Checkbox
    >
  </FieldLegend>
  <FieldGroup name="indeterminate-children">
    {#each items as item, index (item)}
      <Checkbox class="child" bind:checked={checked[index]}>{item}</Checkbox>
    {/each}
  </FieldGroup>
</FieldSet>

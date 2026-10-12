<script lang="ts">
  import {
    Checkbox,
    CheckboxInput,
    CheckboxLabel,
    FieldGroup,
    FieldLegend,
    FieldSet,
  } from "opui-css/svelte"

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
    <Checkbox class="parent">
      <CheckboxInput
        bind:checked={() => allChecked, toggleAll}
        {indeterminate}
      />
      <CheckboxLabel>Select all</CheckboxLabel>
    </Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children">
    {#each items as item, index (item)}
      <Checkbox class="child">
        <CheckboxInput bind:checked={checked[index]} />
        <CheckboxLabel>{item}</CheckboxLabel>
      </Checkbox>
    {/each}
  </FieldGroup>
</FieldSet>

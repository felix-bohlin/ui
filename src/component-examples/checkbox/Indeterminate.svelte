<script lang="ts">
  import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "@opui/svelte"
  const fruits = ["Apples", "Bananas", "Cherries"] as const
  let selection = $state([])
  let indeterminate = $derived(
    !!selection.length && fruits.length !== selection.length,
  )
  $effect(() => {
    console.log(selection, indeterminate)
  })
</script>

<FieldSet class="indeterminate-demo">
  {JSON.stringify(selection)}
  <FieldLegend>
    <Checkbox {indeterminate}>Select all</Checkbox>
  </FieldLegend>
  <FieldGroup name="indeterminate-children-svelte">
    {#each fruits as fruit}
      <input
        type="checkbox"
        name="selection"
        onchange={() => console.log("hi")}
        bind:group={selection}
        value={fruit}
      />
    {/each}
  </FieldGroup>
</FieldSet>
